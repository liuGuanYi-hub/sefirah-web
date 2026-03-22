import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Terminal } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// 引入粒子背景组件
import ParticlesBackground from './components/ParticlesBackground';

// 引入刚才写好的页面
import Home from './pages/Home';
import Notes from './pages/Notes';
import Post from './pages/Post';

// 导航栏组件
function Navbar() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) => 
    `transition-colors ${isActive ? 'text-zinc-100 font-bold' : 'text-zinc-400 hover:text-zinc-100'}`;

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-[#0e0f11]/60 backdrop-blur-2xl border-b border-white/[0.03]">
      <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 font-mono text-lg font-bold text-zinc-100 hover:text-emerald-400 transition-colors cursor-pointer">
          <Terminal size={18} className="text-emerald-500" />
          <span>Sefirah<span className="text-emerald-500">.</span></span>
        </NavLink>
        <div className="flex gap-6 text-sm font-medium">
          <NavLink to="/" className={navLinkClass}>主页</NavLink>
          <NavLink to="/notes" className={navLinkClass}>思考</NavLink>
          <a href="https://blog.csdn.net/arqiu8?spm=1000.2115.3001.5343" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-zinc-100 transition-colors">CSDN</a>
          <a href="https://github.com/liuGuanYi-hub" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-zinc-100 transition-colors">GitHub</a>
        </div>
      </div>
    </nav>
  );
}

// 路由调度中心
export default function App() {
  return (
    <BrowserRouter>
      {/* 1. 注入粒子背景 (最底层) */}
      <ParticlesBackground />

      {/* 2. 全局背景颜色和光晕装饰 */}
      <div className="min-h-screen relative text-zinc-300 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 overflow-hidden">
        
        {/* 【最核心】Innei 同款背景微光光晕 (Spotlight) */}
        <div className="fixed -top-32 -left-32 w-96 h-96 bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none z-0" />
        <div className="fixed top-1/2 -right-32 w-80 h-80 bg-cyan-500/10 blur-[110px] rounded-full pointer-events-none z-0" />
        
        {/* 全局导航栏 (中层) */}
        <Navbar />
        
        {/* 3. main 标签限定了下方内容的宽度和顶部的边距 (最上层) */}
        <main className="max-w-6xl mx-auto px-8 pt-40 pb-20 relative z-10">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/post/:id" element={<Post />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </BrowserRouter>
  );
}