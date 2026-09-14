import React, { useState, useMemo } from 'react';
import { Database, Search, Copy, Check } from 'lucide-react';
import { PHYSICAL_CONSTANTS } from '../../data/constants';
import MathView from '../common/MathView';

export const PhysicalConstantsExplorer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', 'Fundamental', 'Electromagnetic', 'Atomic & Nuclear', 'Thermodynamics'];

  const filtered = useMemo(() => {
    return PHYSICAL_CONSTANTS.filter(c => {
      const matchCat = selectedCategory === 'All' || c.category === selectedCategory;
      const matchSearch =
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [searchTerm, selectedCategory]);

  const handleCopy = (val: string, id: string) => {
    navigator.clipboard.writeText(val);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-5 md:p-8 backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h3 className="text-xl font-bold font-display text-slate-100 flex items-center gap-2">
            <Database className="w-5 h-5 text-cyan-400" />
            Physical Constants Database
          </h3>
          <p className="text-xs text-slate-400 mt-1">Authoritative CODATA fundamental constants with SI units, uncertainties, and LaTeX symbols</p>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 font-medium"
            placeholder="Search constant (e.g. Planck, c, ε₀, mass)..."
          />
        </div>
      </div>

      {/* Categories */}
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

      {/* Constants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-slate-800 bg-slate-950/70 hover:border-slate-700 transition flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h4 className="font-semibold text-slate-200 text-sm">{item.name}</h4>
                  <span className="inline-block mt-0.5 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-cyan-400 font-mono">
                    {item.category}
                  </span>
                </div>
                <div className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-cyan-300 font-mono text-xs font-bold">
                  <MathView math={item.latexSymbol} />
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed my-2">{item.description}</p>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 block">Value in SI Units:</span>
                <span className="font-mono text-sm font-bold text-slate-100">
                  {item.value} <span className="text-cyan-400 text-xs font-normal">{item.unit}</span>
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Uncertainty: {item.uncertainty}</span>
              </div>

              <button
                onClick={() => handleCopy(`${item.value} ${item.unit}`, `${idx}`)}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-cyan-300 transition"
                title="Copy value"
              >
                {copiedId === `${idx}` ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-500 text-sm">
          No physical constants found matching "{searchTerm}".
        </div>
      )}
    </div>
  );
};

export default PhysicalConstantsExplorer;
