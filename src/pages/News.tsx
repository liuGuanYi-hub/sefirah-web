import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  ExternalLink,
  Flame,
  RefreshCw,
  Sparkles,
  Tag,
} from 'lucide-react';
import { newsData, type NewsItem } from '../data/news';

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

function formatHot(score: number): string {
  if (score >= 10000) return `${(score / 10000).toFixed(1)}w`;
  if (score >= 1000) return `${(score / 1000).toFixed(1)}k`;
  return String(score);
}

function generateStaticSummary(news: NewsItem[]): string {
  const featured = news.filter((item) => item.featured);
  const categoryCount = news.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  const lines = [
    '本页现在是一个纯前端的编辑精选栏目。',
    '',
    featured.length > 0 ? '本期重点' : '本期观察',
    ...(featured.length > 0
      ? featured.slice(0, 2).map((item) => `- ${item.title}`)
      : news.slice(0, 2).map((item) => `- ${item.title}`)),
    '',
    `收录 ${news.length} 条内容，强调技术趋势、工程判断和互联网观察。`,
    ...Object.entries(categoryCount).map(([category, count]) => `- ${category}: ${count} 条`),
  ];

  return lines.join('\n');
}

const categories = ['全部', '技术', '互联网', '工程'] as const;

const categoryTheme: Record<string, string> = {
  技术: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  互联网: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  工程: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  全部: '',
};

export default function News() {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [lastUpdated, setLastUpdated] = useState(() => new Date());

  const sortedNews = useMemo(
    () =>
      [...newsData].sort(
        (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
      ),
    []
  );

  const filteredNews = useMemo(
    () =>
      activeCategory === '全部'
        ? sortedNews
        : sortedNews.filter((news) => news.category === activeCategory),
    [activeCategory, sortedNews]
  );

  const summary = useMemo(() => generateStaticSummary(sortedNews), [sortedNews]);

  const refreshFeed = () => {
    setLastUpdated(new Date());
  };

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
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">
          <h1 className="text-3xl font-bold text-zinc-100 tracking-tighter flex items-center gap-3">
            <Sparkles className="text-emerald-500" size={28} />
            资讯聚合
          </h1>

          <div className="flex items-center justify-between lg:justify-end gap-3 w-full lg:w-auto">
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
              onClick={refreshFeed}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800/50 text-zinc-400 text-xs lg:text-sm hover:text-emerald-400 hover:border-emerald-500/30 border border-zinc-700 transition-all disabled:opacity-50"
            >
              <RefreshCw size={14} />
              刷新时间
            </button>
          </div>
        </div>

        <p className="text-zinc-500 font-light leading-relaxed">
          不是实时热榜，而是更适合个人站长期维护的精选资讯与短评专栏。
        </p>
      </div>

      {/* 主布局：左侧资讯流 + 右侧 AI 助手 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* 左侧：资讯流列表 */}
        <div className="lg:col-span-2">
          {/* 分类过滤器 */}
          <div className="flex flex-wrap gap-2 lg:gap-3 mb-6 lg:mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 lg:px-4 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all duration-300 border ${
                  activeCategory === cat
                    ? 'bg-zinc-100 text-zinc-900 border-zinc-100 shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                    : 'bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:border-zinc-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 资讯列表 */}
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
                className="group block p-3.5 lg:p-4 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900/60 hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-3 lg:gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      {news.featured && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                          Featured
                        </span>
                      )}
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] border ${categoryTheme[news.category]}`}
                      >
                        {news.category}
                      </span>
                    </div>

                    <h3 className="text-zinc-200 font-medium group-hover:text-emerald-400 transition-colors leading-snug mb-2 line-clamp-2">
                      {news.title}
                    </h3>

                    <p className="text-sm text-zinc-500 leading-relaxed mb-3 line-clamp-2">
                      {news.description}
                    </p>

                    <div className="mb-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-3">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-400/80 mb-2">
                        Editor Note
                      </p>
                      <p className="text-sm text-zinc-300 leading-relaxed">
                        {news.editorNote}
                      </p>
                    </div>

                    <p className="text-xs text-zinc-500 leading-relaxed mb-3">
                      {news.whyItMatters}
                    </p>

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
                      {news.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-zinc-600">
                          #{tag}
                        </span>
                      ))}
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

          {filteredNews.length === 0 && (
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
            className="sticky top-20 lg:top-24"
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
                    编辑摘要
                  </h2>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800/50 text-zinc-500 border border-zinc-700">
                  Static
                </span>
              </div>

              {/* 静态摘要内容 */}
              <div className="relative z-10">
                <div className="prose prose-sm prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap text-xs text-zinc-300 font-light leading-relaxed bg-transparent border-0 p-0 overflow-visible">
                    {summary}
                  </pre>
                </div>

                {/* 标签云 */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-1 text-xs text-zinc-500 mb-2">
                    <Tag size={12} />
                    <span>热门标签</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(
                      new Set(sortedNews.flatMap((item) => item.tags))
                    )
                      .slice(0, 8)
                      .map((tag) => (
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

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-xs text-zinc-500"
            >
              <p className="mb-2">这页现在完全由本地数据驱动，适合静态部署，也更像你的个人判断栏。</p>
              <code className="block bg-zinc-950 p-2 rounded text-zinc-400">
                src/data/news.ts
              </code>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
