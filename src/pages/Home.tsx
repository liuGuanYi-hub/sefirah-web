import { Clock } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import ProjectGrid from '../components/ProjectGrid';

// 【核心魔法】导入透明背景的专属头像
import myAvatar from '../assets/avatar.jpg';

// 假设我们把动态数据提炼成一个数组，后续你可以改成自动读取文件的逻辑
const moments = [
  {
    id: 'v1-launch',
    date: '2026-03-22 23:59:59',
    content: '🚀 **Project Sefirah V1.0 正式上线！！！** \n\n老老早老早之前就想搞的一个东西，终于在今晚看到了雏形。React + Vite + Tailwind V4 的极简构建流，加上 Innei 风的空灵排版与粒子飘零。看着 Vercel 变成绿色的那一刻，一切都值了。',
    isMilestone: true
  },
  {
    id: 'first-step',
    date: '2026-03-20',
    content: '重构了思考列表的自动化排序引擎，搬运了几篇 CSDN 的硬核文章（Nginx 镜像站搭建、C 盘排雷）。文学总结部分写了对《雾都孤儿》与《鼠疫》的对比笔记，技术与人文的交织，才是我想呈现的样子。',
    isMilestone: false
  }
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.8, type: 'spring', bounce: 0.3 } 
  }
};

export default function Home() {
  // 按时间倒序排列动态
  const sortedMoments = [...moments].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <motion.div 
      initial="hidden" animate="visible" exit={{ opacity: 0 }}
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      className="max-w-6xl mx-auto space-y-32 pb-20" 
    >
      
      {/* 1. 自我介绍板块 - 宽屏响应式布局 */}
      <motion.section variants={fadeInUp} className="flex flex-col lg:flex-row gap-12 lg:items-center py-10" id="about">
        
        {/* 左侧：专属头像（带磨砂边框和 Hover 缩放） */}
        <div className="relative group w-32 h-32 lg:w-48 lg:h-48 shrink-0">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
          <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img src={myAvatar} alt="ZZD's Avatar" className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
          </div>
        </div>

        {/* 右侧：文字介绍 */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-7xl font-extrabold text-zinc-100 tracking-tighter">
            你好，我是 <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">ZZD</span>。
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400/90 leading-relaxed max-w-3xl font-light">
            来自汕头潮阳，目前是韩山师范学院的一名大三学生。
            <br />
            热衷于 <span className="text-emerald-400/80 font-medium">React + Vite</span> 与 <span className="text-emerald-400/80 font-medium">Spring Boot</span> 全栈开发。
            在代码的逻辑世界里构建秩序，在文学的荒诞岁月中寻找锚点。
          </p>
        </div>
      </motion.section>

      {/* 2. 项目展示 - 带 Hover Spotlight 微光卡片 */}
      <motion.div variants={fadeInUp} id="projects">
        <ProjectGrid />
      </motion.div>

      {/* 3. 时光碎片 - 动态渲染列表 */}
      <motion.section variants={fadeInUp} className="space-y-12" id="moments">
        <h2 className="text-2xl md:text-3xl font-bold text-zinc-100 flex items-center gap-3 tracking-tighter">
          <Clock className="text-emerald-500" size={28} />
          时光碎片 <span className="text-emerald-500">.</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedMoments.map((moment) => (
            <div 
              key={moment.id}
              className={`group relative p-6 rounded-3xl transition-all duration-500 hover:-translate-y-2 transform overflow-hidden shadow-2xl shadow-black/30 border
                ${moment.isMilestone 
                  ? 'bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40' 
                  : 'bg-white/[0.01] border-white/[0.03] hover:border-white/10'}`}
            >
              {/* 微光特效 */}
              <div className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 opacity-0 bg-[radial-gradient(400px_circle_at_var(--mouse-x)_var(--mouse-y),#10b98115,#transparent)]" />
              
              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-500 group-hover:text-emerald-400 transition-colors">
                    {moment.date.split(' ')[0]}
                  </span>
                  {moment.isMilestone && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-[10px] text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">Milestone</span>
                  )}
                </div>
                <p className="text-sm md:text-base text-zinc-300 leading-relaxed whitespace-pre-wrap">
                  {moment.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}