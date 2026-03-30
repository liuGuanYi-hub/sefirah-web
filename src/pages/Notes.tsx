import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// 1. 【核心魔法引擎】：利用 Vite 自动批量读取 posts 目录下所有的 .md 文件
const mdModules = import.meta.glob('../content/posts/*.md', { eager: true, query: '?raw' });

// 2. 自动解析 Markdown 的 Frontmatter，彻底告别手动配置数组！
const notesList = Object.entries(mdModules).map(([path, module]) => {
  const rawContent = typeof module === 'string' ? module : (module as any).default;
  const id = path.split('/').pop()?.replace('.md', ''); // 从文件名提取 id
  
  // 默认占位符
  let title = '未命名碎片';
  let date = '2026-01-01';
  let category = '随笔';

  // 正则提取顶部 --- 包裹的信息
  const match = rawContent.match(/^---\n([\s\S]*?)\n---/);
  if (match) {
    const frontmatter = match[1];
    const titleMatch = frontmatter.match(/title:\s*(.*)/);
    const dateMatch = frontmatter.match(/date:\s*(.*)/);
    const categoryMatch = frontmatter.match(/category:\s*(.*)/);
    
    if (titleMatch) title = titleMatch[1].trim();
    if (dateMatch) date = dateMatch[1].trim();
    if (categoryMatch) category = categoryMatch[1].trim();
  }

  return { id, title, date, category };
});

// 3. 分类主题映射 (保留了你完整的极客风配色)
const categoryTheme: Record<string, string> = {
  '技术': 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  '阅读': 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  '游戏': 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  '随笔': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
};

const categories = ['全部', '技术', '阅读', '游戏', '随笔'];

export default function Notes() {
  const [activeCategory, setActiveCategory] = useState('全部');

  // 排序并过滤数据 (完美兼容自动读取的数据)
  const filteredNotes = [...notesList]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .filter(note => activeCategory === '全部' || note.category === activeCategory);

  return (
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto pb-20"
      >
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-zinc-100 mb-4 tracking-tighter">思考</h1>
          <p className="text-zinc-500 font-light leading-relaxed max-w-xl">
            知识图谱与碎片化思考。文章不设终点，随认知持续迭代。
          </p>
        </div>

        {/* 分类过滤器 (Filter Bar) */}
        <div className="flex flex-wrap gap-3 mb-10">
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

        <div className="relative">
          {/* 左侧时间轴竖线 */}
          <div className="absolute left-[3.25rem] top-2 bottom-2 w-px bg-white/[0.05] hidden sm:block" />

          {/* 列表渲染区域 */}
          <motion.div layout className="space-y-2">
            <AnimatePresence mode="popLayout">
              {filteredNotes.map((note) => (
                  <motion.div
                      key={note.id || Math.random()} // 防止 id 为空时的报错
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.3 }}
                  >
                    <Link
                        to={`/post/${note.id}`}
                        className="group relative flex flex-col sm:flex-row sm:items-center gap-4 py-4 px-4 -mx-4 rounded-2xl hover:bg-white/[0.02] transition-all duration-300"
                    >
                      {/* 日期与时间轴节点 */}
                      <div className="relative flex items-center gap-6 shrink-0">
                    <span className="text-xs font-mono text-zinc-500 w-12 text-right">
                      {/* 完美保留了你的抗脆弱日期切割更新 */}
                      {note.date.split(' ')[0].split('-').slice(1).join('-')}
                    </span>
                        <div className="hidden sm:block w-2 h-2 rounded-full bg-zinc-800 border border-zinc-700 group-hover:border-emerald-500/50 group-hover:bg-emerald-500 transition-all duration-500 z-10" />
                      </div>

                      {/* 标题与分类标签 */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
                        <h3 className="text-base text-zinc-300 group-hover:text-emerald-400 transition-colors leading-snug flex-grow">
                          {note.title}
                        </h3>

                        {/* 分类小标签 */}
                        <span className={`shrink-0 px-2 py-0.5 rounded-md text-[10px] border ${categoryTheme[note.category] || 'text-zinc-400 bg-zinc-800/50 border-zinc-700'}`}>
                      {note.category}
                    </span>
                      </div>
                    </Link>
                  </motion.div>
              ))}
            </AnimatePresence>

            {filteredNotes.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="py-12 text-center text-zinc-500 font-light"
                >
                  这片区域还在开垦中...
                </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
  );
}