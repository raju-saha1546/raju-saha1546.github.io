import React, { useState } from 'react';
import { Milestone, Calendar, Compass, BookOpen, Cpu, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { JOURNEY_MILESTONES, JourneyMilestone } from '../../data/personal';

interface JourneyPageProps {
  onNavigate?: (tab: string, subId?: string) => void;
}

export const JourneyPage: React.FC<JourneyPageProps> = ({ onNavigate }) => {
  const [filterType, setFilterType] = useState<string>('All');

  const types = ['All', 'Milestone', 'Experiment', 'Coursework'];

  const filtered = JOURNEY_MILESTONES.filter(m => filterType === 'All' || m.type === filterType);

  return (
    <div className="space-y-10">
      {/* Header Banner */}
      <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-6 md:p-8 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold mb-2">
              <Milestone className="w-4 h-4" />
              Academic & Experimental Roadmap
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-100">
              My Physics Journey
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-1.5 leading-relaxed">
              A chronological timeline documenting my progression through undergraduate physics, mathematical formulations, laboratory experiments, electronics projects, and computational simulations.
            </p>
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400">
            Status: <span className="text-cyan-300 font-semibold">Active & Continually Evolving</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 pt-6 mt-6 border-t border-slate-800">
          <span className="text-xs font-medium text-slate-400 mr-2">Filter:</span>
          {types.map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                filterType === t
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700/60'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Layout */}
      <div className="relative border-l border-slate-800 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
        {filtered.map((item, index) => (
          <div key={item.id} className="relative group">
            {/* Timeline Node Icon */}
            <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-6 h-6 rounded-full bg-slate-950 border-2 border-cyan-400/80 group-hover:border-cyan-300 group-hover:scale-110 transition-transform flex items-center justify-center shadow-md shadow-cyan-500/10">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            </div>

            {/* Timeline Content Card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 hover:border-slate-700 p-6 sm:p-7 backdrop-blur-sm transition-all space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-cyan-950/70 text-cyan-300 border border-cyan-500/30">
                    {item.period}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    • {item.type}
                  </span>
                </div>
              </div>

              <h2 className="text-lg sm:text-xl font-bold font-display text-slate-100 group-hover:text-cyan-200 transition">
                {item.title}
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                {item.description}
              </p>

              {/* Personal Reflection Block */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 space-y-2">
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  Personal Reflection
                </div>
                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "{item.reflection}"
                </p>
                <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2 text-xs font-medium text-slate-400">
                  <span className="text-cyan-400 font-mono">Key Takeaway:</span>
                  <span>{item.keyTakeaway}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Callout */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-950/50 p-6 text-center text-xs text-slate-400">
        <p>
          This journey represents real learning milestones and experiments. As coursework and laboratory investigations progress, new entries and reflections are added here.
        </p>
      </div>
    </div>
  );
};

export default JourneyPage;
