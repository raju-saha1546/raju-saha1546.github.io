import React, { useState } from 'react';
import {
  Wrench,
  Sparkles,
  Cpu,
  Zap,
  ArrowLeftRight,
  TrendingUp,
  FileSpreadsheet,
  Database,
  BookOpen,
  Layers,
  Compass,
  Activity,
  GitBranch,
  Waves,
  Search,
  CheckCircle2
} from 'lucide-react';
import ResistorCalculator from './ResistorCalculator';
import OhmsLawCalculator from './OhmsLawCalculator';
import UnitConverter from './UnitConverter';
import ScientificPlotter from './ScientificPlotter';
import DataAnalysisTool from './DataAnalysisTool';
import PhysicalConstantsExplorer from './PhysicalConstantsExplorer';
import FormulaExplorer from './FormulaExplorer';
import ElectronicsSimulator from './ElectronicsSimulator';

// Simulations
import ProjectileSimulation from '../simulations/ProjectileSimulation';
import HarmonicOscillatorSimulation from '../simulations/HarmonicOscillatorSimulation';
import DoublePendulumSimulation from '../simulations/DoublePendulumSimulation';
import WaveInterferenceSimulation from '../simulations/WaveInterferenceSimulation';
import ElectricFieldSimulation from '../simulations/ElectricFieldSimulation';

interface ToolsPlatformProps {
  initialItemId?: string;
}

export const ToolsPlatform: React.FC<ToolsPlatformProps> = ({ initialItemId = 'resistor' }) => {
  const [activeItem, setActiveItem] = useState<string>(initialItemId);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = [
    'All',
    'Electronics',
    'Mechanics',
    'Waves & Optics',
    'Data Analysis',
    'Utilities'
  ];

  const toolsAndSims = [
    // Calculators & Tools
    {
      id: 'resistor',
      type: 'tool',
      name: 'Resistor Color Code',
      category: 'Electronics',
      icon: Cpu,
      personalDesc: 'A small electronics tool I built for quickly decoding 4 and 5-band resistor color bands during breadboard wiring.'
    },
    {
      id: 'ohms-law',
      type: 'tool',
      name: "Ohm's Law & Power",
      category: 'Electronics',
      icon: Zap,
      personalDesc: 'A DC circuit solver I use to calculate voltages, current draws, and thermal power dissipation in prototype circuits.'
    },
    {
      id: 'circuit-sim',
      type: 'tool',
      name: 'DC Circuit Simulator',
      category: 'Electronics',
      icon: Layers,
      personalDesc: 'An interactive simulator for testing series, parallel, and voltage divider loops with virtual LEDs.'
    },
    {
      id: 'unit-converter',
      type: 'tool',
      name: 'Physical Unit Converter',
      category: 'Utilities',
      icon: ArrowLeftRight,
      personalDesc: 'A high-precision converter covering base SI units, energy conversions (eV to Joules), pressure, and magnetic flux.'
    },
    {
      id: 'plotter',
      type: 'tool',
      name: 'Scientific Function Plotter',
      category: 'Data Analysis',
      icon: TrendingUp,
      personalDesc: 'A browser-based grapher I built for plotting analytical equations, testing mathematical functions, and verifying roots.'
    },
    {
      id: 'data-analysis',
      type: 'tool',
      name: 'Curve Fitting & Regression',
      category: 'Data Analysis',
      icon: FileSpreadsheet,
      personalDesc: 'A least-squares regression tool for importing CSV laboratory data, calculating R², and visualizing residuals.'
    },
    {
      id: 'constants',
      type: 'tool',
      name: 'Physical Constants Database',
      category: 'Utilities',
      icon: Database,
      personalDesc: 'A quick-reference lookup for fundamental CODATA physical constants, standard uncertainties, and SI dimensions.'
    },
    {
      id: 'formulas',
      type: 'tool',
      name: 'Formula Reference Explorer',
      category: 'Utilities',
      icon: BookOpen,
      personalDesc: 'A curated reference of physics equations across mechanics, electromagnetism, and quantum physics with worked examples.'
    },

    // Simulations
    {
      id: 'projectile',
      type: 'simulation',
      name: 'Projectile Motion with Drag',
      category: 'Mechanics',
      icon: Compass,
      personalDesc: 'A numerical simulation solving 2D trajectory dynamics with quadratic atmospheric drag and planetary gravity models.'
    },
    {
      id: 'harmonic',
      type: 'simulation',
      name: 'Driven Harmonic Oscillator',
      category: 'Mechanics',
      icon: Activity,
      personalDesc: 'A real-time oscillator simulation with damping, periodic external forcing, resonance peaks, and phase-space portrait.'
    },
    {
      id: 'double-pendulum',
      type: 'simulation',
      name: 'Chaotic Double Pendulum',
      category: 'Mechanics',
      icon: GitBranch,
      personalDesc: 'A 4th-order Runge-Kutta numerical model demonstrating extreme sensitivity to initial conditions and deterministic chaos.'
    },
    {
      id: 'waves',
      type: 'simulation',
      name: 'Wave Superposition & Diffraction',
      category: 'Waves & Optics',
      icon: Waves,
      personalDesc: 'A wave optics simulator rendering Young double-slit interference fringes, single-slit diffraction, and wavelength spectra.'
    },
    {
      id: 'electric-field',
      type: 'simulation',
      name: 'Coulomb Electric Field Lines',
      category: 'Electronics',
      icon: Zap,
      personalDesc: 'An electrostatic field mapper calculating vector gradients and equipotential contours for arbitrary multi-pole charges.'
    }
  ];

  const filteredItems = toolsAndSims.filter(item => {
    const matchCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.personalDesc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  const activeMeta = toolsAndSims.find(t => t.id === activeItem) || toolsAndSims[0];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-6 md:p-8 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold mb-2">
              <Wrench className="w-4 h-4" />
              My Physics Lab
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-100">
              Personal Scientific Tools & Simulations
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-1.5 leading-relaxed">
              A collection of small tools and simulations I'm building to explore physics, analyze experiments, and make calculations easier.
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
              placeholder="Search tools & simulations..."
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-5 mt-5 border-t border-slate-800 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Selector Ribbon of Tools */}
      <div className="space-y-2">
        <div className="text-xs font-mono text-slate-400 uppercase tracking-wider px-1">
          Select Tool or Simulation ({filteredItems.length} available):
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {filteredItems.map(item => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isActive
                    ? 'bg-cyan-500/10 border-cyan-500/50 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    item.type === 'simulation' ? 'bg-indigo-950/60 text-indigo-300' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.type === 'simulation' ? 'Sim' : 'Tool'}
                  </span>
                </div>
                <div>
                  <div className={`text-xs font-semibold truncate ${isActive ? 'text-cyan-300' : 'text-slate-200'}`}>
                    {item.name}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">
                    {item.category}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tool Meta Box */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/90 flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-100 font-display">
              {activeMeta.name}
            </h3>
            <span className="text-xs font-mono text-cyan-400">
              • {activeMeta.category}
            </span>
          </div>
          <p className="text-xs text-slate-300 italic">
            "{activeMeta.personalDesc}"
          </p>
        </div>
      </div>

      {/* Active Tool Render Window */}
      <div className="min-h-[500px]">
        {activeItem === 'resistor' && <ResistorCalculator />}
        {activeItem === 'ohms-law' && <OhmsLawCalculator />}
        {activeItem === 'circuit-sim' && <ElectronicsSimulator />}
        {activeItem === 'unit-converter' && <UnitConverter />}
        {activeItem === 'plotter' && <ScientificPlotter />}
        {activeItem === 'data-analysis' && <DataAnalysisTool />}
        {activeItem === 'constants' && <PhysicalConstantsExplorer />}
        {activeItem === 'formulas' && <FormulaExplorer />}
        {activeItem === 'projectile' && <ProjectileSimulation />}
        {activeItem === 'harmonic' && <HarmonicOscillatorSimulation />}
        {activeItem === 'double-pendulum' && <DoublePendulumSimulation />}
        {activeItem === 'waves' && <WaveInterferenceSimulation />}
        {activeItem === 'electric-field' && <ElectricFieldSimulation />}
      </div>
    </div>
  );
};

export default ToolsPlatform;
