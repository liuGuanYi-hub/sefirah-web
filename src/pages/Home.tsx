import { Clock } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import ProjectGrid from '../components/ProjectGrid';

// 【核心魔法】告诉 Vite：去 assets 目录下读取我的头像图片
import myAvatar from '../assets/avatar.jpg';

// 2. 显式声明 fadeInUp 的类型为 Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
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

export default function Home() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -20 }}
      // 这里也可以顺手加个类型，虽然通常 TS 能自动推断
      variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      className="space-y-24"
    >

      {/* 1. 自我介绍板块 */}
      <motion.section variants={fadeInUp} className="space-y-6" id="about">

        {/* 头像区域：保留磨砂边框和缩放动画 */}
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-500/10 to-cyan-500/10 flex items-center justify-center border border-white/[0.08] mb-10 overflow-hidden shadow-xl shadow-black/20">
          <img
            src={myAvatar}
            alt="ZZD's Avatar"
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-zinc-100 tracking-tight">
          你好，我是 <span className="text-emerald-400">ZZD</span>。
        </h1>
        <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">
          来自汕头潮阳，目前是韩山师范学院的一名大三学生。
          <br />
          热衷于 React + Vite 与 Spring Boot 全栈开发，对 AI Agent 的底层逻辑充满好奇。喜欢用优雅的代码构建复杂的系统，也喜欢在经典文学中寻找思想的锚点。
        </p>
      </motion.section>

      {/* 2. 项目展览馆 */}
      <motion.div variants={fadeInUp}>
        <ProjectGrid />
      </motion.div>

      {/* 3. 时光碎片 */}
      <motion.section variants={fadeInUp} className="space-y-8" id="moments">
        <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-3">
          <Clock className="text-emerald-500" size={24} />
          时光碎片
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors hover:-translate-y-1 transform duration-300">
            <span className="text-xs font-mono text-zinc-500 mb-2 block">2026-03-22</span>
            <p className="text-sm text-zinc-300 leading-relaxed">最近在宿舍折腾全栈项目的重构，顺便坚持自重健身。晚上偶尔在《边狱公司》里研究下机制，硬核放松。</p>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors hover:-translate-y-1 transform duration-300">
            <span className="text-xs font-mono text-zinc-500 mb-2 block">2026-03-16</span>
            <p className="text-sm text-zinc-300 leading-relaxed">终于翻开了《雾都孤儿》，也刚读了《鼠疫》。当封闭的秩序面临失控，人物群像的刻画真的让人震撼。</p>
          </div>
        </div>
      </motion.section>

    </motion.div>
  );
}