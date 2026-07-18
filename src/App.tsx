import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

// 引入粒子背景组件
import ParticlesBackground from './components/ParticlesBackground';

// 引入页面组件
import Home from './pages/Home';
import Notes from './pages/Notes';
import Post from './pages/Post';
import News from './pages/News';

// 导航栏组件
function Navbar() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) => 
    `transition-colors ${isActive ? 'text-[#3f765d] font-semibold' : 'text-[#718078] hover:text-[#3f765d]'}`;

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-[#f7f5ee]/85 backdrop-blur-xl border-b border-[#dfe6dd]">
      <div className="site-nav-inner max-w-6xl mx-auto px-4 lg:px-8 min-h-16 py-3 lg:h-16 lg:py-0 flex items-center justify-between gap-3">
        <NavLink to="/" className="flex items-center gap-2 text-lg font-semibold text-[#304238] hover:text-[#3f765d] transition-colors cursor-pointer">
          <Leaf size={18} className="text-[#4f8f72]" />
          <span>Sefirah<span className="text-[#4f8f72]">.</span></span>
        </NavLink>
        <div className="site-nav-links flex flex-wrap justify-end gap-x-3 gap-y-1 lg:gap-6 text-xs lg:text-sm font-medium">
          <NavLink to="/" className={navLinkClass}>主页</NavLink>
          <NavLink to="/notes" className={navLinkClass}>思考</NavLink>
          <NavLink to="/news" className={navLinkClass}>资讯</NavLink>
          <a href="https://blog.csdn.net/arqiu8?spm=1000.2115.3001.5343" target="_blank" rel="noreferrer" className="text-[#718078] hover:text-[#3f765d] transition-colors">CSDN</a>
          <a href="https://github.com/liuGuanYi-hub" target="_blank" rel="noreferrer" className="text-[#718078] hover:text-[#3f765d] transition-colors">GitHub</a>
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
      <div className="min-h-screen relative text-[#506158] font-sans overflow-hidden">
        
        {/* 【最核心】Innei 同款背景微光光晕 (Spotlight) */}
        <div className="fixed -top-32 -left-32 w-96 h-96 bg-[#b9d9c3]/25 blur-[130px] rounded-full pointer-events-none z-0" />
        <div className="fixed top-1/2 -right-32 w-80 h-80 bg-[#e8dcbb]/25 blur-[110px] rounded-full pointer-events-none z-0" />
        
        {/* 全局导航栏 (中层) */}
        <Navbar />
        
        {/* 3. main 标签限定了下方内容的宽度和顶部的边距 (最上层) */}
        <main className="site-main max-w-6xl mx-auto px-4 lg:px-8 pt-28 lg:pt-40 pb-12 lg:pb-20 relative z-10">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/news" element={<News />} />
              <Route path="/post/:id" element={<Post />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </BrowserRouter>
  );
}
