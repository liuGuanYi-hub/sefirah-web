import { Sprout, Leaf, TreeDeciduous, ArrowRight } from 'lucide-react';
import { notesData } from '../data/notes';

// 状态对应的图标和颜色配置
const statusConfig = {
  Seedling: { icon: Sprout, color: 'text-emerald-500', bg: 'bg-emerald-500/10', label: '幼苗' },
  Incubating: { icon: Leaf, color: 'text-cyan-400', bg: 'bg-cyan-400/10', label: '培育' },
  Evergreen: { icon: TreeDeciduous, color: 'text-emerald-300', bg: 'bg-emerald-300/10', label: '常青' },
};

export default function DigitalGarden() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 border-t border-gray-900/50">
      <div className="mb-12">
        <h2 className="text-2xl font-mono text-white mb-3 flex items-center gap-3">
          <span className="text-emerald-500 font-bold">~</span>
          /notes
          <span className="text-gray-600 text-sm ml-2 font-sans"># 数字花园</span>
        </h2>
        <p className="text-gray-500">知识图谱与碎片化思考。文章不设终点，随认知持续迭代。</p>
      </div>

      <div className="flex flex-col gap-4">
        {notesData.map((note) => {
          const StatusIcon = statusConfig[note.status].icon;
          
          return (
            <div 
              key={note.id} 
              className="group flex flex-col md:flex-row md:items-center justify-between p-5 rounded-xl border border-transparent hover:border-gray-800 hover:bg-[#0a0a0a] transition-all duration-300 cursor-pointer"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono ${statusConfig[note.status].bg} ${statusConfig[note.status].color}`}>
                    <StatusIcon size={12} />
                    {statusConfig[note.status].label}
                  </span>
                  <span className="text-gray-600 text-xs font-mono">{note.date}</span>
                  <span className="text-gray-700 text-xs px-2 py-0.5 border border-gray-800 rounded-full">
                    {note.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-200 group-hover:text-emerald-400 transition-colors">
                  {note.title}
                </h3>
                <p className="text-gray-500 text-sm mt-2 line-clamp-2 md:line-clamp-1 max-w-3xl">
                  {note.excerpt}
                </p>
              </div>
              
              <div className="hidden md:flex items-center justify-end w-12 text-gray-700 group-hover:text-emerald-500 transition-colors transform group-hover:translate-x-1">
                <ArrowRight size={20} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
