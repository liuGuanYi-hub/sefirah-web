import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // <-- 引入无缝跳转引擎

// 把 id 改成更有语义化的英文 slug，这样 URL 会非常优雅
const notesList = [
  { id: 'novel-power-systems', date: '03-20', title: '复杂网文架构拆解：严密力量体系与非线性叙事' },
  { id: 'openclaw-agent-setup', date: '03-12', title: 'OpenClaw Agent 踩坑实录：多源知识检索落地' },
  { id: 'plague-absurdism', date: '03-05', title: '荒诞与韧性：重读《鼠疫》初探' },
  { id: 'limbus-company-guide', date: '02-28', title: '《边狱公司》高难配队机制与行动轴拆解' },
  { id: 'vite-tailwind-setup', date: '02-15', title: '从零梳理 Vite + Tailwind V4 的极简配置流' },
];

export default function Notes() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-zinc-100 mb-4 tracking-tight">思考</h1>
        <p className="text-zinc-500">知识图谱与碎片化思考。文章不设终点，随认知持续迭代。</p>
      </div>

      <div className="mb-8 flex items-center gap-4">
        <span className="text-xl font-bold text-zinc-100 font-mono">2026</span>
        <div className="h-px bg-white/[0.08] flex-1"></div>
      </div>

      <div className="space-y-1">
        {notesList.map((note) => (
          // 使用 Link 组件替换原来的 div，to 属性动态绑定文章对应的路由
          <Link 
            key={note.id} 
            to={`/post/${note.id}`} 
            className="group block py-3 px-2 -mx-2 rounded-lg hover:bg-white/[0.03] transition-colors cursor-pointer"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <span className="text-sm font-mono text-zinc-500 shrink-0">{note.date}</span>
              <h3 className="text-base text-zinc-300 group-hover:text-emerald-400 transition-colors">
                {note.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
