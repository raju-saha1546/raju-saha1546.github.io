import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, Wrench, Sparkles, BookOpen, ClipboardList, FolderGit2, ArrowRight } from 'lucide-react';
import { NOTES_DATA } from '../data/notes';
import { PROJECTS_DATA } from '../data/projects';
import { LAB_EXPERIMENTS } from '../data/labNotebook';
import { FORMULAS_DATA } from '../data/formulas';
import { useTheme } from '../context/ThemeContext';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string, subId?: string) => void;
}

interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Tools' | 'Simulations' | 'Notes' | 'Experiments' | 'Projects' | 'Formulas';
  tab: string;
  subId?: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // All searchable items
  const allItems: SearchItem[] = useMemo(() => {
    const list: SearchItem[] = [
      // Tools
      { id: 't1', title: 'Resistor Color Code Calculator', subtitle: 'Decode 4-band and 5-band nominal values and tolerances', category: 'Tools', tab: 'tools', subId: 'resistor' },
      { id: 't2', title: "Ohm's Law & DC Power Solver", subtitle: 'DC voltage drops, current flow, and thermal dissipation', category: 'Tools', tab: 'tools', subId: 'ohms-law' },
      { id: 't3', title: 'Scientific Unit Converter', subtitle: 'SI unit conversions with scientific notation parsing', category: 'Tools', tab: 'tools', subId: 'unit-converter' },
      { id: 't4', title: 'Scientific Function Plotter', subtitle: 'Multi-curve graphing with analytical coordinates inspection', category: 'Tools', tab: 'tools', subId: 'plotter' },
      { id: 't5', title: 'Experimental Data Analysis & Curve Fitting', subtitle: 'Non-linear least squares regression & CSV data upload', category: 'Tools', tab: 'tools', subId: 'data-analysis' },
      { id: 't6', title: 'Physical Constants Database', subtitle: 'CODATA fundamental physical constants with uncertainties', category: 'Tools', tab: 'tools', subId: 'constants' },
      { id: 't7', title: 'Physics Formula Explorer', subtitle: 'Equations, variable breakdowns and worked examples', category: 'Tools', tab: 'tools', subId: 'formulas' },
      { id: 't8', title: 'Educational DC Circuit Simulator', subtitle: 'Series, parallel, and voltage divider loops with live LED', category: 'Tools', tab: 'tools', subId: 'circuit-sim' },

      // Simulations
      { id: 's1', title: 'Ballistic Projectile & Aerodynamic Drag', subtitle: '2D kinematics with quadratic air resistance and planetary gravity', category: 'Simulations', tab: 'tools', subId: 'projectile' },
      { id: 's2', title: 'Harmonic Oscillator & Phase Space Dynamics', subtitle: 'Damped & driven oscillations with phase orbit portraits', category: 'Simulations', tab: 'tools', subId: 'harmonic' },
      { id: 's3', title: 'Double Pendulum & Deterministic Chaos', subtitle: 'Lagrangian dynamics with twin Lyapunov divergence', category: 'Simulations', tab: 'tools', subId: 'double-pendulum' },
      { id: 's4', title: 'Double-Slit Wave Interference & Diffraction', subtitle: 'Coherent optical wave superposition and chromatic laser diffraction', category: 'Simulations', tab: 'tools', subId: 'waves' },
      { id: 's5', title: 'Coulomb Electric Field & Potential Manifold', subtitle: 'Multi-pole electrostatic vectors and scalar potential fields', category: 'Simulations', tab: 'tools', subId: 'electric-field' },

      // Core Sections
      { id: 'sec-about', title: 'About Raju (Academic Profile)', subtitle: 'Personal philosophy, background, and approach to physics', category: 'Notes', tab: 'about' },
      { id: 'sec-journey', title: 'My Physics Journey (Timeline)', subtitle: 'Milestones, coursework, and laboratory reflections', category: 'Notes', tab: 'journey' },
      { id: 'sec-contact', title: 'Contact & Inquiries', subtitle: 'Academic communication channels and collaboration', category: 'Notes', tab: 'contact' }
    ];

    // Add Notes
    NOTES_DATA.forEach(n => {
      list.push({
        id: `note-${n.id}`,
        title: n.title,
        subtitle: n.summary,
        category: 'Notes',
        tab: 'notes',
        subId: n.id
      });
    });

    // Add Experiments
    LAB_EXPERIMENTS.forEach(exp => {
      list.push({
        id: `exp-${exp.id}`,
        title: exp.title,
        subtitle: `${exp.question.slice(0, 75)}...`,
        category: 'Experiments',
        tab: 'lab',
        subId: exp.id
      });
    });

    // Add Projects
    PROJECTS_DATA.forEach(p => {
      list.push({
        id: `proj-${p.id}`,
        title: p.title,
        subtitle: p.shortDescription,
        category: 'Projects',
        tab: 'projects',
        subId: p.id
      });
    });

    // Add Formulas
    FORMULAS_DATA.forEach(f => {
      list.push({
        id: `formula-${f.id}`,
        title: `${f.name} (${f.latex})`,
        subtitle: f.description,
        category: 'Formulas',
        tab: 'tools',
        subId: 'formulas'
      });
    });

    return list;
  }, []);

  // Filter items
  const filteredItems = useMemo(() => {
    if (!query.trim()) return allItems.slice(0, 8);
    const q = query.toLowerCase();
    return allItems
      .filter(
        item =>
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      )
      .slice(0, 10);
  }, [allItems, query]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = filteredItems[selectedIndex];
        if (selected) {
          onNavigate(selected.tab, selected.subId);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, filteredItems, selectedIndex, onNavigate]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 backdrop-blur-md ${
        isDark ? 'bg-slate-950/80' : 'bg-slate-900/40'
      }`}
    >
      <div
        className={`relative w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden animate-in fade-in duration-150 ${
          isDark
            ? 'border-slate-700/80 bg-slate-900 text-slate-100'
            : 'border-slate-300 bg-white text-slate-800'
        }`}
      >
        {/* Search Input Bar */}
        <div
          className={`flex items-center px-4 border-b ${
            isDark ? 'border-slate-800 bg-slate-950/70' : 'border-slate-200 bg-slate-50'
          }`}
        >
          <Search className={`w-5 h-5 mr-3 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search tools, simulations, notes, derivations, projects..."
            className={`w-full py-4 bg-transparent text-sm focus:outline-none font-medium ${
              isDark
                ? 'text-slate-100 placeholder:text-slate-500'
                : 'text-slate-900 placeholder:text-slate-400'
            }`}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className={`p-1 cursor-pointer ${
                isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd
            className={`ml-2 font-mono text-[10px] px-2 py-0.5 rounded border ${
              isDark
                ? 'bg-slate-800 text-slate-400 border-slate-700'
                : 'bg-slate-200 text-slate-600 border-slate-300'
            }`}
          >
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div
          className={`max-h-96 overflow-y-auto p-2 divide-y ${
            isDark ? 'divide-slate-800/40' : 'divide-slate-100'
          }`}
        >
          {filteredItems.map((item, index) => {
            const isSelected = index === selectedIndex;
            return (
              <div
                key={item.id}
                onClick={() => {
                  onNavigate(item.tab, item.subId);
                  onClose();
                }}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`p-3 rounded-xl cursor-pointer flex items-center justify-between transition-all ${
                  isSelected
                    ? isDark
                      ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-200'
                      : 'bg-cyan-50 border border-cyan-200 text-cyan-900'
                    : isDark
                    ? 'text-slate-300 hover:bg-slate-800/50'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded shrink-0 ${
                      isDark
                        ? 'bg-slate-800 text-cyan-400'
                        : 'bg-slate-100 text-cyan-700 border border-slate-200'
                    }`}
                  >
                    {item.category}
                  </span>
                  <div className="truncate">
                    <h4
                      className={`text-xs font-bold truncate ${
                        isDark ? 'text-slate-100' : 'text-slate-900'
                      }`}
                    >
                      {item.title}
                    </h4>
                    <p
                      className={`text-[11px] truncate mt-0.5 ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <ArrowRight
                  className={`w-3.5 h-3.5 shrink-0 ml-2 transition-transform ${
                    isSelected
                      ? isDark
                        ? 'translate-x-1 text-cyan-400'
                        : 'translate-x-1 text-cyan-600'
                      : isDark
                      ? 'text-slate-600'
                      : 'text-slate-400'
                  }`}
                />
              </div>
            );
          })}

          {filteredItems.length === 0 && (
            <div
              className={`py-12 text-center text-xs ${
                isDark ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              No results found for "{query}". Try searching for{' '}
              <span className={isDark ? 'text-cyan-400' : 'text-cyan-600 font-semibold'}>Planck</span>,{' '}
              <span className={isDark ? 'text-cyan-400' : 'text-cyan-600 font-semibold'}>Resistor</span>,{' '}
              <span className={isDark ? 'text-cyan-400' : 'text-cyan-600 font-semibold'}>Chaos</span>, or{' '}
              <span className={isDark ? 'text-cyan-400' : 'text-cyan-600 font-semibold'}>Ohm</span>.
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div
          className={`px-4 py-2.5 border-t flex items-center justify-between text-[11px] font-mono ${
            isDark
              ? 'border-slate-800 bg-slate-950/80 text-slate-500'
              : 'border-slate-200 bg-slate-50 text-slate-500'
          }`}
        >
          <span>
            Navigate:{' '}
            <kbd className={`px-1 py-0.5 rounded ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600'}`}>↑</kbd>{' '}
            <kbd className={`px-1 py-0.5 rounded ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600'}`}>↓</kbd>
          </span>
          <span>
            Select: <kbd className={`px-1 py-0.5 rounded ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600'}`}>ENTER</kbd>
          </span>
          <span>
            Close: <kbd className={`px-1 py-0.5 rounded ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600'}`}>ESC</kbd>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
