import React, { useState, useMemo } from 'react';
import { ClipboardList, Calendar, CheckCircle2, AlertTriangle, Lightbulb, Compass, Search } from 'lucide-react';
import { LAB_EXPERIMENTS } from '../../data/labNotebook';
import MathView from '../common/MathView';

export const LabNotebookViewer: React.FC = () => {
  const [selectedExpId, setSelectedExpId] = useState<string>(LAB_EXPERIMENTS[0].id);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filtered = useMemo(() => {
    return LAB_EXPERIMENTS.filter(e =>
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.experiment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const activeExp = useMemo(() => {
    return LAB_EXPERIMENTS.find(e => e.id === selectedExpId) || LAB_EXPERIMENTS[0];
  }, [selectedExpId]);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-6 md:p-8 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold mb-2">
              <ClipboardList className="w-4 h-4" />
              Laboratory Notebook & Experimental Logs
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-100">
              Empirical Physics & Instrumentation Logs
            </h2>
            <p className="text-sm text-slate-400 max-w-2xl mt-1">
              Rigorous laboratory records documenting real experimental measurements, circuit prototypes, systematic uncertainty budgets, and least-squares regression analyses.
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
              placeholder="Search experiments..."
            />
          </div>
        </div>
      </div>

      {/* Main Journal Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Experiment Selection Cards */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">
            Laboratory Logs ({filtered.length})
          </div>

          <div className="space-y-3">
            {filtered.map(exp => (
              <button
                key={exp.id}
                onClick={() => setSelectedExpId(exp.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${selectedExpId === exp.id ? 'bg-cyan-950/40 border-cyan-500 text-cyan-100 shadow-md' : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/90'}`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                  <span className="text-cyan-400 font-semibold">{exp.category}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {exp.date}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-100 leading-snug">{exp.title}</h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{exp.experiment}</p>

                <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800/80">
                  <span>R² Quality: <span className="text-emerald-400 font-bold">{exp.rSquared}</span></span>
                  <span>{exp.dataPoints.length} Points</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Detailed Laboratory Report */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-700/50 bg-slate-900/80 p-6 md:p-10 backdrop-blur-md space-y-8">
          {/* Header & Question */}
          <div className="border-b border-slate-800 pb-6 space-y-3">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
              <span className="px-2.5 py-1 rounded-md bg-cyan-950 border border-cyan-500/30 text-cyan-300 font-semibold">
                {activeExp.category}
              </span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {activeExp.date}</span>
              <span className="text-emerald-400 font-bold">R² = {activeExp.rSquared}</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold font-display text-slate-100 leading-tight">
              {activeExp.title}
            </h1>

            <div className="text-xs font-mono text-cyan-400">
              Sub-Investigation: <span className="text-slate-200">{activeExp.experiment}</span>
            </div>
          </div>

          {/* Research Question & Hypothesis Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                Research Question
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">{activeExp.question}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5" />
                Hypothesis
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">{activeExp.hypothesis}</p>
            </div>
          </div>

          {/* Theory & Mathematical Framework */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase font-mono tracking-wider text-slate-200">
              1. Theoretical Framework & Governing Equations
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{activeExp.theory}</p>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-center">
              <MathView math={activeExp.fitEquation} display className="text-sm text-cyan-300" />
            </div>
          </div>

          {/* Setup & Apparatus */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase font-mono tracking-wider text-slate-200">
              2. Experimental Setup & Instrumentation
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              {activeExp.setup}
            </p>
          </div>

          {/* Data Table & Regression Results */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase font-mono tracking-wider text-slate-200">
              3. Empirical Data Points & Regression Parameters
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Tabular data */}
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-950 text-slate-400 font-mono border-b border-slate-800">
                    <tr>
                      <th className="px-3 py-2">{activeExp.xLabel}</th>
                      <th className="px-3 py-2">{activeExp.yLabel}</th>
                      <th className="px-3 py-2">Uncertainty</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-mono">
                    {activeExp.dataPoints.map((pt, i) => (
                      <tr key={i} className="hover:bg-slate-900/50">
                        <td className="px-3 py-2 text-cyan-300">{pt.x}</td>
                        <td className="px-3 py-2 text-slate-200">{pt.y}</td>
                        <td className="px-3 py-2 text-slate-400">±{pt.uncertaintyY}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Fit Results Parameters */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[11px] font-mono uppercase text-slate-400 block mb-2 font-semibold">
                    Least-Squares Fit Metrics
                  </span>
                  <div className="space-y-2">
                    {activeExp.fitResults.map((param, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 flex justify-between items-center text-xs font-mono">
                        <span className="text-slate-400">{param.parameter}:</span>
                        <span className="text-cyan-300 font-bold">
                          {param.value} <span className="text-slate-500 font-normal text-[10px]">({param.error})</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-300">Goodness of Fit (R²):</span>
                  <span className="text-emerald-400 font-bold text-sm">{activeExp.rSquared}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Uncertainty Analysis */}
          <div className="space-y-2 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              Uncertainty & Error Propagation Analysis
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">{activeExp.uncertaintyAnalysis}</p>
          </div>

          {/* Conclusion */}
          <div className="space-y-2 p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Empirical Conclusion
            </span>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">{activeExp.conclusion}</p>
            {activeExp.notes && (
              <p className="text-[11px] text-slate-400 italic pt-1 border-t border-slate-800 mt-2">
                Note: {activeExp.notes}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabNotebookViewer;
