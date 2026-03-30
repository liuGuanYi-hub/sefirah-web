import {Terminal, BrainCircuit, BotMessageSquare, Github, Utensils, Wallet, Activity} from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

// 项目数据保持不变
const projects = [
  // 【最硬核】：新增 senseNode 项目
  {
    icon: Activity, // 换成波形监控图标
    title: 'senseNode',
    description: '轻量级设备在线监测与预警系统。从 0 到 1 独立主导后端架构，设计多级预警机制与多维健康度评估算法，为复杂数据可视化大屏提供低延迟的数据支撑。',
    tech: ['Vue', 'Spring Boot', 'REST API'], // 真实的后端与接口技术栈
    color: 'cyan', // 青色非常适合“监测、数据”的科技感，保留！
    github: 'https://github.com/liuGuanYi-hub/senseNode',
  },
  // 【新增】：moneyNote 财务应用
  {
    icon: Wallet,
    title: 'moneyNote',
    description: '前后端分离的个人财务管理应用。实现了多维度账单分类汇总与状态流转，利用 RESTful API 保证了高频交互下的数据强一致性。',
    tech: ['React', 'Spring Boot', 'MySQL'],
    color: 'amber', // 专属琥珀金配色
    github: 'https://github.com/liuGuanYi-hub/moneyNote',
  },
  {
    icon: BrainCircuit,
    title: 'OpenClaw Agent 知识库',
    description: '基于 OpenClaw 工具链搭建的个人智能助手。探索大语言模型在多源知识检索与自动化流中的落地。',
    tech: ['AI Agent', 'OpenClaw', 'LLM'],
    color: 'emerald',
    github: 'https://github.com/liuGuanYi-hub/openclaw-agent',
  },
  {
    icon: BotMessageSquare,
    title: 'QuickQuiz 题库系统',
    description: '前后端分离的本地题库管理平台。处理了复杂组件的状态共享，并优化了 MySQL 的查询效率。',
    tech: ['React', 'Vite', 'Spring Boot', 'MySQL'],
    color: 'emerald',
    github: 'https://github.com/liuGuanYi-hub/quickquiz',
  },
  {
    icon: Utensils,
    title: 'What2Eat 餐饮推荐引擎',
    description: '解决日常“吃什么”痛点的全栈应用。设计了合理的数据表结构，并实现了流畅的接口数据交互。',
    tech: ['Vue', 'Java', 'MySQL'],
    color: 'emerald',
    github: 'https://github.com/liuGuanYi-hub/what2eat',
  },
];

const techColorMap: Record<string, string> = {
  React: 'text-sky-400 bg-sky-950/50 border-sky-900',
  Vite: 'text-yellow-400 bg-yellow-950/50 border-yellow-900',
  'Spring Boot': 'text-emerald-400 bg-emerald-950/50 border-emerald-900',
  MySQL: 'text-blue-400 bg-blue-950/50 border-blue-900',
  'AI Agent': 'text-emerald-400 bg-emerald-950/50 border-emerald-900',
  OpenClaw: 'text-cyan-400 bg-cyan-950/50 border-cyan-900',
  LLM: 'text-teal-400 bg-teal-950/50 border-teal-900',
  Vue: 'text-emerald-400 bg-emerald-950/50 border-emerald-900',
  Java: 'text-red-400 bg-red-950/50 border-red-900',
};

// 水波纹浮现动画保持不变
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { 
      duration: 0.8, 
      type: 'spring', 
      bounce: 0.3 
    } 
  }
};

export default function ProjectGrid() {
  return (
    <div className="space-y-12">
      {/* 标题部分保持不变 */}
      <motion.div variants={fadeInUp} className="space-y-3">
        <h2 className="text-2xl md:text-3xl font-bold text-zinc-100 flex items-center gap-3 tracking-tighter">
          <Terminal className="text-emerald-500" size={28} />
          /projects <span className="text-emerald-500">.</span>
        </h2>
        <p className="text-lg text-zinc-500/90 font-light max-w-2xl leading-relaxed">
          近期的项目实践与工程探索。所有的代码都来源于对构建“优雅且有用”系统的执着。
        </p>
      </motion.div>

      {/* 项目卡片 Grid */}
      <motion.div 
        initial="hidden" animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {projects.map((project) => (
          // 【核心改造】：外层容器
          <motion.div
            key={project.title}
            variants={fadeInUp}
            className="relative group p-6 rounded-3xl bg-white/[0.01] border border-white/[0.03] hover:border-emerald-500/20 transition-all duration-500 hover:-translate-y-2 transform cursor-pointer overflow-hidden shadow-2xl shadow-black/30"
          >
            {/* 【最核心】：Innei 同款卡片 Hover 发光特效 (Spotlight) */}
            <div className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 opacity-0 bg-[radial-gradient(400px_circle_at_var(--mouse-x)_var(--mouse-y),#10b98125,#transparent)]" />
            
            {/* 卡片内容：需要加上 relative z-10 以免被光晕遮挡 */}
            <div className="relative z-10 space-y-6 flex flex-col h-full">
              {/* 图标和 GitHub 链接 */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500/10 to-cyan-500/10 flex items-center justify-center border border-white/[0.05]">
                  <project.icon className="text-emerald-400" size={24} />
                </div>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" className="p-2 text-zinc-600 hover:text-emerald-400 hover:bg-emerald-950/50 rounded-lg transition-colors">
                    <Github size={18} />
                  </a>
                )}
              </div>

              {/* 标题和描述 */}
              <div className="flex-grow space-y-2">
                <h3 className="text-lg md:text-xl font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors tracking-tight">
                  {project.title}
                </h3>
                <p className="text-sm md:text-base text-zinc-400/90 leading-relaxed font-light">
                  {project.description}
                </p>
              </div>

              {/* 技术栈标签 */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.03]">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className={`px-3 py-1 text-xs font-mono rounded-full border ${techColorMap[tech] || 'text-zinc-400 bg-zinc-950 border-zinc-900'}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}