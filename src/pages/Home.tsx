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
      className="max-w-6xl mx-auto space-y-32"
    >

      {/* 1. 自我介绍板块 - 改造为横向响应式布局 */}
      <motion.section variants={fadeInUp} className="flex flex-col lg:flex-row gap-12 lg:items-center py-10" id="about">
        
        {/* 左侧/上方：头像 */}
        <div className="relative group w-32 h-32 lg:w-48 lg:h-48 shrink-0">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
          <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img src={myAvatar} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* 右侧/下方：文字介绍 */}
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

      {/* 2. 项目展示 - 保持三列布局，但在宽屏下间距更大 */}
      <motion.div variants={fadeInUp} id="projects" className="py-10">
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