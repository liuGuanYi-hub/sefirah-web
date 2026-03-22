import ProjectCard from './ProjectCard';
import { projectData } from '../data/projects';

export default function ProjectGrid() {
    return (
        <section className="max-w-6xl mx-auto px-6 py-20">
            <div className="mb-12">
                <h2 className="text-2xl font-mono text-white mb-3 flex items-center gap-3">
                    <span className="text-emerald-500 font-bold">~</span>
                    /projects
                    <span className="w-2 h-5 bg-emerald-500 animate-pulse ml-1"></span>
                </h2>
                <p className="text-gray-500">近期的一些技术探索与工程实践。</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectData.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </section>
    );
}