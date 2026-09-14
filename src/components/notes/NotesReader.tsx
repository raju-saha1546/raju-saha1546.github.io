import React, { useState, useMemo } from 'react';
import { BookOpen, Search, Clock, Calendar, Bookmark, ArrowRight, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { NOTES_DATA } from '../../data/notes';
import MathView from '../common/MathView';

interface NotesReaderProps {
  onOpenSimulation?: (simId: string) => void;
}

export const NotesReader: React.FC<NotesReaderProps> = ({ onOpenSimulation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeNoteId, setActiveNoteId] = useState<string>(NOTES_DATA[0].id);
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});

  const categories = [
    'All',
    'Quantum Mechanics',
    'Quantum Chemistry',
    'Classical Mechanics',
    'Electromagnetism',
    'Mathematical Physics',
    'Electronics',
    'Computational Physics'
  ];

  const filteredNotes = useMemo(() => {
    return NOTES_DATA.filter(n => {
      const matchCat = selectedCategory === 'All' || n.category === selectedCategory;
      const matchSearch =
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [searchTerm, selectedCategory]);

  const activeNote = useMemo(() => {
    return NOTES_DATA.find(n => n.id === activeNoteId) || NOTES_DATA[0];
  }, [activeNoteId]);

  const toggleStep = (stepKey: string) => {
    setExpandedSteps(prev => ({ ...prev, [stepKey]: !prev[stepKey] }));
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-6 md:p-8 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold mb-2">
              <BookOpen className="w-4 h-4" />
              Digital Physics Notebook
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-100">
              Theoretical Notes & Rigorous Derivations
            </h2>
            <p className="text-sm text-slate-400 max-w-2xl mt-1">
              Coursework notes, fundamental quantum postulates, classical electrodynamics, and mathematical derivations formatted with academic precision.
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
              placeholder="Search notes (e.g. Planck, Maxwell)..."
            />
          </div>
        </div>

        {/* Category Filter Chips */}
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

      {/* Main Two-Column Reader Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Table of Contents / Notes List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1 flex items-center justify-between">
            <span>Manuscripts ({filteredNotes.length})</span>
            <span className="font-mono text-cyan-400 text-[10px]">Academic Records</span>
          </div>

          <div className="space-y-2.5">
            {filteredNotes.map(n => (
              <button
                key={n.id}
                onClick={() => setActiveNoteId(n.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${activeNoteId === n.id ? 'bg-cyan-950/40 border-cyan-500 text-cyan-100 shadow-md' : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/90'}`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1.5">
                  <span className="text-cyan-400 font-semibold">{n.category}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{n.readTime}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-100 line-clamp-2 leading-snug">{n.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">{n.summary}</p>
                {n.keyEquation && (
                  <div className="mt-2.5 pt-2 border-t border-slate-800/80 font-mono text-xs text-cyan-300/80 truncate">
                    <MathView math={n.keyEquation} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right Manuscript Reader */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-700/50 bg-slate-900/80 p-6 md:p-10 backdrop-blur-md space-y-8">
          {/* Note Metadata Header */}
          <div className="border-b border-slate-800 pb-6 space-y-3">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
              <span className="px-2.5 py-1 rounded-md bg-cyan-950 border border-cyan-500/30 text-cyan-300 font-semibold">
                {activeNote.category}
              </span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {activeNote.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {activeNote.readTime}</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold font-display text-slate-100 leading-tight">
              {activeNote.title}
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed font-serif italic border-l-2 border-cyan-400 pl-4 py-1">
              {activeNote.summary}
            </p>

            {/* Key Equation Callout */}
            {activeNote.keyEquation && (
              <div className="p-4 rounded-xl bg-slate-950/90 border border-cyan-500/30 flex flex-col items-center justify-center my-4 shadow-inner">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 mb-2">Fundamental Equation</span>
                <MathView math={activeNote.keyEquation} display className="text-base sm:text-lg text-slate-100" />
              </div>
            )}
          </div>

          {/* Sections & Mathematical Derivations */}
          <div className="space-y-8">
            {activeNote.sections.map((sec, sIdx) => (
              <div key={sec.id} className="space-y-4">
                <h3 className="text-lg font-bold font-display text-slate-100 border-b border-slate-800/80 pb-2">
                  {sec.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {sec.content}
                </p>

                {sec.latex && (
                  <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex justify-center overflow-x-auto">
                    <MathView math={sec.latex} display className="text-cyan-300 text-sm" />
                  </div>
                )}

                {/* Derivation Steps Breakdown */}
                {sec.derivationSteps && sec.derivationSteps.length > 0 && (
                  <div className="mt-4 space-y-3 rounded-xl border border-slate-800/90 bg-slate-950/60 p-4">
                    <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block mb-2">
                      Mathematical Derivation Walkthrough
                    </span>

                    {sec.derivationSteps.map((step, stepIdx) => {
                      const stepKey = `${sec.id}-${stepIdx}`;
                      const isExpanded = expandedSteps[stepKey] !== false; // expanded by default

                      return (
                        <div key={stepIdx} className="rounded-lg border border-slate-800 bg-slate-900/80 p-3.5 space-y-2">
                          <div
                            onClick={() => toggleStep(stepKey)}
                            className="flex items-center justify-between cursor-pointer group"
                          >
                            <span className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 transition flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 flex items-center justify-center text-[10px] font-mono">
                                {stepIdx + 1}
                              </span>
                              {step.step}
                            </span>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-slate-400" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-slate-400" />
                            )}
                          </div>

                          {isExpanded && (
                            <div className="pt-2 border-t border-slate-800/70 space-y-2">
                              <p className="text-xs text-slate-300 leading-relaxed">{step.explanation}</p>
                              {step.latex && (
                                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-center">
                                  <MathView math={step.latex} display className="text-xs text-cyan-300" />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Academic References */}
          {activeNote.references && activeNote.references.length > 0 && (
            <div className="pt-6 border-t border-slate-800 space-y-3 text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider text-slate-300 font-mono block">
                References & Primary Literature
              </span>
              <ul className="list-disc list-inside space-y-1.5 leading-relaxed font-serif">
                {activeNote.references.map((ref, rIdx) => (
                  <li key={rIdx} className="text-slate-400">{ref}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesReader;
