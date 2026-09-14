import React, { useState, useMemo } from 'react';
import { FolderGit2, Search, ArrowRight } from 'lucide-react';
import { PROJECTS_DATA } from '../data/projects';
import { Project } from '../types';
import MathView from '../components/MathView';
import ProjectDetailModal from '../components/ProjectDetailModal';

interface ProjectsShowcaseProps {
  onNavigateToTools?: (toolId?: string) => void;
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({ onNavigateToTools }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = ['All', 'Computational Physics', 'Electronics', 'Laboratory Physics', 'Scientific Software'];

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter(p => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchSearch =
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-6 md:p-8 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold mb-2">
              <FolderGit2 className="w-4 h-4" />
              Scientific Portfolio & Showcase
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-100">
              Physics, Computing & Electronics Projects
            </h2>
            <p className="text-sm text-slate-400 max-w-2xl mt-1">
              End-to-end scientific software, numerical differential equation solvers, hardware laboratory instrumentation, and physical simulations developed during undergraduate physics studies.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 font-medium"
              placeholder="Search projects by name, tag..."
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-5 mt-5 border-t border-slate-800 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/60'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <div
            key={project.id}
            onClick={() => setActiveProject(project)}
            className="group rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-cyan-500/50 hover:bg-slate-900/90 transition-all duration-300 p-6 flex flex-col justify-between cursor-pointer shadow-lg hover:shadow-cyan-500/5"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-3">
                <span className="text-cyan-400 font-semibold">{project.category}</span>
                <span className="text-slate-500">{project.year}</span>
              </div>

              <h3 className="text-base font-bold font-display text-slate-100 group-hover:text-cyan-300 transition line-clamp-2 mb-2">
                {project.title}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                {project.shortDescription}
              </p>

              {/* Mathematical Equation Teaser */}
              {project.keyFormulas && project.keyFormulas[0] && (
                <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 mb-4 flex justify-center text-xs text-cyan-300/80 truncate">
                  <MathView math={project.keyFormulas[0]} />
                </div>
              )}
            </div>

            <div>
              {/* Metrics Pills */}
              {project.metrics && (
                <div className="grid grid-cols-2 gap-2 mb-4 pt-3 border-t border-slate-800/80">
                  {project.metrics.slice(0, 2).map((m, i) => (
                    <div key={i} className="text-[11px] font-mono">
                      <span className="text-slate-500 block truncate">{m.label}</span>
                      <span className="text-slate-200 font-bold">{m.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60">
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="text-[10px] px-1.5 py-0.5 text-slate-500">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:translate-x-0.5 transition-transform">
                <span>View Full Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Reusable Project Detail Modal */}
      <ProjectDetailModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onNavigateToTools={onNavigateToTools}
      />
    </div>
  );
};

export default ProjectsShowcase;
