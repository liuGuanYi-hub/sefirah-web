import { ExternalLink } from 'lucide-react';
import type { Project } from '../data/projects';

export default function ProjectCard({ project }: { project: Project }) {
    return (
        <div className="group relative bg-[#0a0a0a] p-6 rounded-xl border border-gray-800 transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] flex flex-col h-full">
            <div className="flex items-center justify-between mb-5">
                <div className="p-2.5 rounded-lg bg-gray-900 border border-gray-800 text-emerald-400">
                    <project.icon size={22} strokeWidth={1.5} />
                </div>
                <ExternalLink size={18} className="text-gray-600 group-hover:text-emerald-400 transition-colors cursor-pointer" />
            </div>
            <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-100 group-hover:text-emerald-300 transition-colors mb-2 tracking-wide">
                    {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {project.description}
                </p>
            </div>
            <div className="mt-auto pt-4 border-t border-gray-800/50 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                    <span key={tech} className="font-mono text-[11px] px-2.5 py-1 rounded bg-gray-900 text-emerald-300 border border-gray-800 group-hover:border-emerald-900 transition-colors">
            {tech}
          </span>
                ))}
            </div>
        </div>
    );
}