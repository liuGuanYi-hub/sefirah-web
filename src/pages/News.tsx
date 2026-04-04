import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ExternalLink, Clock, Tag, RefreshCw, AlertCircle, Flame } from 'lucide-react';

// API 配置（从环境变量读取，可在 .env 文件中配置）
const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY || '';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';

// ============================================================
// 数据源定义
// ============================================================
const RSS_FEEDS = [
  {
    name: 'CSDN 热榜',
    fetcher: fetchCSDNHotRank,
    category: '技术',
  },
  {
    name: 'Hacker News',
    fetcher: fetchHackerNews,
    category: '互联网',
  },
];

// ============================================================
// 新闻数据类型
// ============================================================
interface NewsItem {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  source: string;
  category: string;
  description?: string;
  hotScore?: number; // 热度值（CSDN 等平台提供）
}

// ============================================================
// 数据源 1：CSDN 全站热榜（真实 API）
// ============================================================
async function fetchCSDNHotRank(): Promise<NewsItem[]> {
  try {
    // 开发环境走 Vite 代理，生产环境走 CORS 代理
    const csdnPath = '/phoenix/web/blog/hot-rank?page=0&pageSize=25';
    const url = import.meta.env.DEV
      ? `/api/csdn${csdnPath}`
      : `https://corsproxy.io/?url=${encodeURIComponent('https://blog.csdn.net' + csdnPath)}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`CSDN API 响应异常: ${response.status}`);

    const json = await response.json();
    const list: any[] = json.data || [];

    return list.map((item: any, index: number) => {
      // period 格式类似 "2026-04-04-11"，取前10位作为日期
      const periodStr = item.period || '';
      const dateStr = periodStr.slice(0, 10); // "2026-04-04"
      const pubDate = dateStr
        ? new Date(dateStr + 'T00:00:00+08:00').toISOString()
        : new Date().toISOString();

      return {
        id: `csdn-${index}-${item.articleId || index}`,
        title: item.articleTitle || '无标题',
        link: item.articleDetailUrl || 'https://blog.csdn.net',
        pubDate,
        source: 'CSDN',
        category: '技术',
        description: item.nickName ? `作者: ${item.nickName}` : '',
        hotScore: Number(item.hotRankScore) || 0,
      };
    });
  } catch (error) {
    console.error('Error fetching CSDN hot rank:', error);
    return [];
  }
}

// ============================================================
// 数据源 2：Hacker News（官方 JSON API，真实数据）
// ============================================================
async function fetchHackerNews(): Promise<NewsItem[]> {
  try {
    const response = await fetch(
      'https://hacker-news.firebaseio.com/v0/topstories.json'
    );
    const ids: number[] = await response.json();

    const stories = await Promise.all(
      ids.slice(0, 15).map(async (id) => {
        try {
          const res = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json`
          );
          const data = await res.json();
          if (data && data.title) {
            return {
              id: `hn-${id}`,
              title: data.title,
              link: data.url || `https://news.ycombinator.com/item?id=${id}`,
              // 使用 HN 提供的真实发布时间戳
              pubDate: new Date(data.time * 1000).toISOString(),
              source: 'Hacker News',
              category: '互联网',
              description: data.text || '',
              hotScore: data.score || 0,
            };
          }
        } catch {
          // 忽略单条获取失败
        }
        return null;
      })
    );

    return stories.filter((n) => n !== null) as NewsItem[];
  } catch (error) {
    console.error('Error fetching Hacker News:', error);
    return [];
  }
}

// ============================================================
// 获取单个数据源
// ============================================================
async function fetchRSSFeed(
  feed: (typeof RSS_FEEDS)[0]
): Promise<NewsItem[]> {
  try {
    return await feed.fetcher();
  } catch (error) {
    console.error(`Error fetching ${feed.name}:`, error);
    return [];
  }
}

// ============================================================
// 聚合所有资讯
// ============================================================
async function fetchAllNews(): Promise<NewsItem[]> {
  const results = await Promise.allSettled(RSS_FEEDS.map(fetchRSSFeed));

  const allNews: NewsItem[] = [];
  results.forEach((result) => {
    if (result.status === 'fulfilled') {
      allNews.push(...result.value);
    }
  });

  // 按时间排序并去重
  const uniqueNews = Array.from(
    new Map(allNews.map((n) => [n.id, n])).values()
  );

  return uniqueNews
    .sort(
      (a, b) =>
        new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    )
    .slice(0, 40);
}

// ============================================================
// AI 总结（DeepSeek）
// ============================================================
async function generateAISummary(news: NewsItem[]): Promise<string> {
  if (!DEEPSEEK_API_KEY) {
    return generateMockSummary(news);
  }

  try {
    const newsText = news
      .slice(0, 10)
      .map(
        (n) =>
          `[${n.category}] ${n.title} (${n.source}, ${new Date(n.pubDate).toLocaleString('zh-CN')})`
      )
      .join('\n');

    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content:
              '你是一个技术资讯摘要助手。请用简洁的中文，按类别总结技术新闻，使用 emoji 图标让内容更生动。输出格式参考：\n\n🤖 AI 领域动态\n- 新闻标题 1\n- 新闻标题 2\n\n💻 前端开发动态\n- 新闻标题 1\n\n📊 数据概览：今日共 X 条资讯，AI 相关 X 条，前端相关 X 条...',
          },
          {
            role: 'user',
            content: `请总结以下技术资讯：\n\n${newsText}`,
          },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content || '生成总结失败';
  } catch (error) {
    console.error('AI Summary error:', error);
    return generateMockSummary(news);
  }
}

// Mock 总结生成（无 API 时备用）
function generateMockSummary(news: NewsItem[]): string {
  const categoryCount: Record<string, number> = {};
  news.forEach((n) => {
    categoryCount[n.category] = (categoryCount[n.category] || 0) + 1;
  });

  const categoryNews: Record<string, NewsItem[]> = {};
  news.forEach((n) => {
    if (!categoryNews[n.category]) categoryNews[n.category] = [];
    categoryNews[n.category].push(n);
  });

  let summary = '📰 今日技术前沿摘要：\n\n';

  const categoryEmoji: Record<string, string> = {
    技术: '🔧',
    互联网: '🌐',
  };

  Object.entries(categoryNews).forEach(([cat, items]) => {
    const emoji = categoryEmoji[cat] || '📌';
    summary += `${emoji} ${cat}动态\n`;
    items.slice(0, 3).forEach((item) => {
      summary += `- ${item.title}\n`;
    });
    summary += '\n';
  });

  summary += `📊 数据概览：今日共 ${news.length} 条资讯\n`;
  Object.entries(categoryCount).forEach(([cat, count]) => {
    summary += `  - ${cat}: ${count}条\n`;
  });

  return summary;
}

// ============================================================
// 格式化时间 - 显示资讯的真实发布日期
// ============================================================
function formatTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return '刚刚';
  if (minutes < 60) return `${minutes}分钟前`;
  if (hours < 24) return `${hours}小时前`;
  if (days < 2) return '昨天';
  if (days < 7) return `${days}天前`;

  // 超过 7 天显示具体日期
  return date.toLocaleDateString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
  });
}

// 格式化热度
function formatHot(score: number): string {
  if (score >= 10000) return `${(score / 10000).toFixed(1)}w`;
  if (score >= 1000) return `${(score / 1000).toFixed(1)}k`;
  return String(score);
}

// ============================================================
// 分类配置
// ============================================================
const categories = ['全部', '技术', '互联网'];

const categoryTheme: Record<string, string> = {
  技术: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  互联网: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  全部: '',
};

// ============================================================
// 页面组件
// ============================================================
export default function News() {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [aiSummary, setAiSummary] = useState<string>('正在加载最新资讯...');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // 获取资讯
  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const news = await fetchAllNews();
      setNewsList(news);

      // 生成 AI 总结
      const summary = await generateAISummary(news);
      setAiSummary(summary);
      setLastUpdated(new Date());
    } catch (err) {
      setError('获取资讯失败，请稍后重试');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // 过滤数据
  const filteredNews =
    activeCategory === '全部'
      ? newsList
      : newsList.filter((news) => news.category === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* 页面标题 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-zinc-100 mb-4 tracking-tighter flex items-center gap-3">
            <Sparkles className="text-emerald-500" size={28} />
            资讯聚合
          </h1>

          <div className="flex items-center gap-3">
            {lastUpdated && (
              <span className="text-xs text-zinc-500">
                更新于{' '}
                {lastUpdated.toLocaleTimeString('zh-CN', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            )}
            <button
              onClick={fetchNews}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800/50 text-zinc-400 text-sm hover:text-emerald-400 hover:border-emerald-500/30 border border-zinc-700 transition-all disabled:opacity-50"
            >
              <RefreshCw
                size={14}
                className={loading ? 'animate-spin' : ''}
              />
              {loading ? '更新中...' : '刷新'}
            </button>
          </div>
        </div>

        <p className="text-zinc-500 font-light leading-relaxed">
          实时聚合技术热榜与全球资讯。数据源：CSDN 全站热榜、Hacker News
        </p>
      </div>

      {/* 主布局：左侧资讯流 + 右侧 AI 助手 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧：资讯流列表 */}
        <div className="lg:col-span-2">
          {/* 分类过滤器 */}
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeCategory === cat
                    ? 'bg-zinc-100 text-zinc-900 border-zinc-100 shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                    : 'bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:border-zinc-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 错误提示 */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          {/* 资讯列表 */}
          {loading && newsList.length === 0 ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 animate-pulse"
                >
                  <div className="h-4 bg-zinc-800 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-zinc-800 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredNews.map((news, index) => (
                <motion.a
                  key={news.id}
                  href={news.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.3 }}
                  className="group block p-4 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900/60 hover:border-emerald-500/30 transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-zinc-200 font-medium group-hover:text-emerald-400 transition-colors leading-snug mb-2 line-clamp-2">
                        {news.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {formatTime(news.pubDate)}
                        </span>
                        <span>{news.source}</span>
                        {news.hotScore !== undefined && news.hotScore > 0 && (
                          <span className="flex items-center gap-1 text-red-400/70">
                            <Flame size={11} />
                            {formatHot(news.hotScore)}
                          </span>
                        )}
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] border ${categoryTheme[news.category]}`}
                        >
                          {news.category}
                        </span>
                      </div>
                    </div>
                    <ExternalLink
                      size={16}
                      className="text-zinc-600 group-hover:text-emerald-400 transition-colors shrink-0"
                    />
                  </div>
                </motion.a>
              ))}
            </div>
          )}

          {!loading && filteredNews.length === 0 && !error && (
            <div className="py-12 text-center text-zinc-500 font-light">
              暂无相关资讯
            </div>
          )}
        </div>

        {/* 右侧：AI 总结小助手（悬浮侧边栏） */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="sticky top-24"
          >
            <div className="relative p-5 rounded-2xl bg-gradient-to-b from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 backdrop-blur-sm">
              {/* 光晕装饰 */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/20 blur-[60px] rounded-full pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-500/20 blur-[60px] rounded-full pointer-events-none" />

              {/* 标题 */}
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-emerald-400" />
                  <h2 className="text-sm font-semibold text-zinc-100">
                    AI 总结助手
                  </h2>
                </div>
                {!DEEPSEEK_API_KEY && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800/50 text-zinc-500 border border-zinc-700">
                    Mock 模式
                  </span>
                )}
              </div>

              {/* AI 总结内容 */}
              <div className="relative z-10">
                {loading ? (
                  <div className="space-y-2 animate-pulse">
                    <div className="h-3 bg-zinc-700/50 rounded w-full"></div>
                    <div className="h-3 bg-zinc-700/50 rounded w-5/6"></div>
                    <div className="h-3 bg-zinc-700/50 rounded w-4/5"></div>
                    <div className="h-3 bg-zinc-700/50 rounded w-full"></div>
                  </div>
                ) : (
                  <div className="prose prose-sm prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap text-xs text-zinc-300 font-light leading-relaxed bg-transparent border-0 p-0 overflow-visible">
                      {aiSummary}
                    </pre>
                  </div>
                )}

                {/* 标签云 */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-1 text-xs text-zinc-500 mb-2">
                    <Tag size={12} />
                    <span>热门标签</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'CSDN',
                      'HackerNews',
                      'AI',
                      'Spring Boot',
                      'Python',
                      'LLM',
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-md text-[10px] bg-zinc-800/50 text-zinc-400 border border-zinc-700/50 hover:border-emerald-500/30 hover:text-emerald-400 transition-colors cursor-default"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* API 配置提示 */}
            {!DEEPSEEK_API_KEY && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-xs text-zinc-500"
              >
                <p className="mb-2">
                  💡 提示：配置 DeepSeek API Key 可启用真实 AI 总结
                </p>
                <code className="block bg-zinc-950 p-2 rounded text-zinc-400">
                  VITE_DEEPSEEK_API_KEY=your_api_key
                </code>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
