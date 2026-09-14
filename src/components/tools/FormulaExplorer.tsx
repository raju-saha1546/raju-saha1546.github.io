import React, { useState, useMemo } from 'react';
import { BookOpen, Search, ChevronRight, Calculator } from 'lucide-react';
import { FORMULAS_DATA } from '../../data/formulas';
import MathView from '../common/MathView';

interface FormulaExplorerProps {
  onOpenTool?: (toolId: string) => void;
}

export const FormulaExplorer: React.FC<FormulaExplorerProps> = ({ onOpenTool }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedFormulaId, setSelectedFormulaId] = useState<string>(FORMULAS_DATA[0].id);

  const categories = ['All', 'Mechanics', 'Electricity & Magnetism', 'Quantum Physics', 'Electronics', 'Thermodynamics'];

  const filtered = useMemo(() => {
    return FORMULAS_DATA.filter(f => {
      const matchCat = selectedCategory === 'All' || f.category.includes(selectedCategory);
      const matchSearch =
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [searchTerm, selectedCategory]);

  const activeFormula = useMemo(() => {
    return FORMULAS_DATA.find(f => f.id === selectedFormulaId) || FORMULAS_DATA[0];
  }, [selectedFormulaId]);

  return (
    <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-5 md:p-8 backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h3 className="text-xl font-bold font-display text-slate-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            Physics Formula Explorer & Derivations
          </h3>
          <p className="text-xs text-slate-400 mt-1">Mathematical formulations with variable definitions, algebraic rearrangements, and worked laboratory examples</p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 font-medium"
            placeholder="Search formula (e.g. Ohm, Newton, de Broglie)..."
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto py-3 border-b border-slate-800/80 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/60'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Two-column layout: Formula list & Detailed View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6">
        {/* Left list */}
        <div className="lg:col-span-4 space-y-2 max-h-[500px] overflow-y-auto pr-1">
          {filtered.map(f => (
            <button
              key={f.id}
              onClick={() => setSelectedFormulaId(f.id)}
              className={`w-full text-left p-3 rounded-xl border transition-all ${selectedFormulaId === f.id ? 'bg-cyan-950/40 border-cyan-500 text-cyan-200 shadow-sm' : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60'}`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-xs truncate">{f.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">{f.category}</span>
              </div>
              <div className="font-mono text-xs text-cyan-300/90 truncate">
                <MathView math={f.latex} />
              </div>
            </button>
          ))}
        </div>

        {/* Right detail view */}
        <div className="lg:col-span-8 rounded-xl border border-slate-800 bg-slate-950/80 p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-cyan-400 font-mono font-semibold">{activeFormula.category}</span>
              <h4 className="text-lg font-bold font-display text-slate-100">{activeFormula.name}</h4>
            </div>

            {activeFormula.relatedToolId && onOpenTool && (
              <button
                onClick={() => onOpenTool(activeFormula.relatedToolId!)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 text-xs font-bold hover:bg-cyan-400 transition shadow-sm"
              >
                <Calculator className="w-3.5 h-3.5" />
                Launch Tool
              </button>
            )}
          </div>

          {/* Primary Formula Display */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center">
            <MathView math={activeFormula.latex} display className="text-lg text-cyan-300" />
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">{activeFormula.description}</p>

          {/* Variables table */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Variables & SI Units</h5>
            <div className="overflow-x-auto rounded-lg border border-slate-800">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-900 text-slate-400 font-mono border-b border-slate-800">
                  <tr>
                    <th className="px-3 py-2">Symbol</th>
                    <th className="px-3 py-2">Quantity Name</th>
                    <th className="px-3 py-2">SI Unit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono">
                  {activeFormula.variables.map((v, i) => (
                    <tr key={i} className="hover:bg-slate-900/40">
                      <td className="px-3 py-2 text-cyan-300 font-bold">{v.symbol}</td>
                      <td className="px-3 py-2 text-slate-200">{v.name}</td>
                      <td className="px-3 py-2 text-slate-400">{v.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Algebraic Rearrangements */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Algebraic Rearrangements</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeFormula.rearrangements.map((r, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block mb-1">{r.target}:</span>
                  <MathView math={r.latex} className="text-xs text-slate-200" />
                </div>
              ))}
            </div>
          </div>

          {/* Worked Example */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-2">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-amber-400">Worked Problem Example</h5>
            <p className="text-xs text-slate-200 italic">{activeFormula.workedExample.problem}</p>
            <div className="font-mono text-xs text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
              <div><span className="text-slate-500">Given:</span> {activeFormula.workedExample.given}</div>
              <div><span className="text-slate-500">Calculation:</span> {activeFormula.workedExample.solution}</div>
              <div className="text-cyan-400 font-bold pt-1 border-t border-slate-800 mt-1">
                <span className="text-slate-500 font-normal">Result:</span> {activeFormula.workedExample.result}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormulaExplorer;
