import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const notesList = [
  { id: 'oliver-twist-and-the-plague-reflection', date: '2026-03-22', title: '苦难、荒诞与秩序的重建：重读《雾都孤儿》与《鼠疫》' },
  { id: 'openclaw-agent-troubleshooting', date: '2026-03-11', title: 'OpenClaw Agent 踩坑实录：从多源错误到多源知识检索的落地' },
  { id: 'capability-access-manager-db-wal', date: '2026-03-09 23:21:49', title: '记一次 C 盘 18G 异常占用的排查：CapabilityAccessManager.db-wal 究竟是个什么鬼？' },
  { id: 'github-mirror-nginx', date: '2026-03-09', title: '国内访问 GitHub 总是 Timeout？教你用 Nginx + CDN 强力破局' },
  { id: 'novel-power-systems', date: '2026-03-20', title: '复杂网文架构拆解：严密力量体系与非线性叙事' },
  { id: 'plague-absurdism', date: '2026-03-05', title: '荒诞与韧性：重读《鼠疫》初探' },
  { id: 'limbus-company-guide', date: '2026-02-28', title: '《边狱公司》高难配队机制与行动轴拆解' },
  { id: 'vite-tailwind-setup', date: '2026-02-15', title: '从零梳理 Vite + Tailwind V4 的极简配置流' },
];

export default function Notes() {
  // 核心引擎：按时间倒序排列
  const sortedNotes = [...notesList].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      <div className="mb-16">
        <h1 className="text-3xl font-bold text-zinc-100 mb-4 tracking-tighter">思考</h1>
        <p className="text-zinc-500 font-light leading-relaxed max-w-xl">
          知识图谱与碎片化思考。文章不设终点，随认知持续迭代。
        </p>
      </div>

      <div className="relative">
        {/* 【核心装饰】：左侧贯穿全场的时间轴竖线 */}
        <div className="absolute left-[3.25rem] top-2 bottom-2 w-px bg-white/[0.05] hidden sm:block" />

        <div className="space-y-12">
          {/* 这里我们可以手动按年份分组，或者简单的列表显示 */}
          <div className="space-y-2">
            {sortedNotes.map((note) => (
              <Link 
                key={note.id} 
                to={`/post/${note.id}`} 
                className="group relative flex flex-col sm:flex-row sm:items-center gap-4 py-4 px-4 -mx-4 rounded-2xl hover:bg-white/[0.02] transition-all duration-300"
              >
                {/* 日期部分：作为时间轴的节点 */}
                <div className="relative flex items-center gap-6 shrink-0">
                  <span className="text-xs font-mono text-zinc-500 w-12 text-right">
                    {/* // 【抗脆弱更新】：兼容带有时分秒戳的高精度时间，截取前面的日期进行切片 */}
                    {note.date.split(' ')[0].split('-').slice(1).join('-')}
                  </span>
                  
                  {/* 时间轴上的小圆点 */}
                  <div className="hidden sm:block w-2 h-2 rounded-full bg-zinc-800 border border-zinc-700 group-hover:border-emerald-500/50 group-hover:bg-emerald-500 transition-all duration-500 z-10" />
                </div>

                {/* 标题部分 */}
                <h3 className="text-base text-zinc-300 group-hover:text-emerald-400 transition-colors leading-snug">
                  {note.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
