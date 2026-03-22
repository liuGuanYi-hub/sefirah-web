import ProjectGrid from './components/ProjectGrid';
import DigitalGarden from './components/DigitalGarden';
import { Terminal } from 'lucide-react';

export default function App() {
    return (
        <div className="min-h-screen bg-[#030712] text-gray-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">

            {/* 极简导航栏 */}
            <nav className="border-b border-gray-800/50 bg-[#030712]/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-mono text-lg font-bold text-white tracking-tighter hover:text-emerald-400 transition-colors cursor-pointer">
                        <Terminal size={20} className="text-emerald-500" />
                        <span>Sefirah<span className="text-emerald-500">.</span></span>
                    </div>
                    <div className="flex gap-6 text-sm font-mono text-gray-400">
                        <a href="#" className="hover:text-emerald-400 transition-colors">/about</a>
                        <a href="#" className="text-emerald-400 transition-colors">/projects</a>
                        <a href="#" className="hover:text-emerald-400 transition-colors">/notes</a>
                    </div>
                </div>
            </nav>

            {/* 首屏介绍 (Hero Section) */}
            <header className="max-w-6xl mx-auto px-6 py-24 md:py-32">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                    Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">complex logic</span> <br />
                    with elegant code.
                </h1>
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
                    全栈开发者 / AI 代理探索者。热衷于底层逻辑的拆解与系统架构的设计。
                </p>
                <button className="font-mono text-sm bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-6 py-3 rounded-lg hover:bg-emerald-500 hover:text-gray-950 hover:border-emerald-500 transition-all duration-300">
                    $ ./view-resume.sh
                </button>
            </header>

            {/* 核心项目展示 */}
            <ProjectGrid />

            {/* 数字花园 (新增) */}
            <DigitalGarden />

            {/* 极简页脚 */}
            <footer className="border-t border-gray-900 mt-20 py-8 text-center text-gray-600 font-mono text-xs">
                © 2026 Project Sefirah. All rights reserved.
            </footer>
        </div>
    )
}