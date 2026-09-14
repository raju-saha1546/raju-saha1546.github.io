import React, { useState } from 'react';
import {
  Wrench,
  Cpu,
  Zap,
  ArrowLeftRight,
  TrendingUp,
  FileSpreadsheet,
  Database,
  BookOpen,
  Layers,
  ChevronRight
} from 'lucide-react';
import ResistorCalculator from './ResistorCalculator';
import OhmsLawCalculator from './OhmsLawCalculator';
import UnitConverter from './UnitConverter';
import ScientificPlotter from './ScientificPlotter';
import DataAnalysisTool from './DataAnalysisTool';
import PhysicalConstantsExplorer from './PhysicalConstantsExplorer';
import FormulaExplorer from './FormulaExplorer';
import ElectronicsSimulator from './ElectronicsSimulator';

interface LabDashboardProps {
  initialToolId?: string;
}

export const LabDashboard: React.FC<LabDashboardProps> = ({ initialToolId = 'resistor' }) => {
  const [activeTool, setActiveTool] = useState<string>(initialToolId);

  const toolsList = [
    { id: 'resistor', name: 'Resistor Color Code', category: 'Electronics', icon: Cpu, desc: 'Decode 4 & 5-band color codes and nominal values' },
    { id: 'ohms-law', name: "Ohm's Law & Power", category: 'Circuits', icon: Zap, desc: 'DC network voltage, current, resistance & power dissipation' },
    { id: 'unit-converter', name: 'Unit Converter', category: 'General', icon: ArrowLeftRight, desc: 'High-precision scientific SI and derived physical units' },
    { id: 'plotter', name: 'Function Plotter', category: 'Analysis', icon: TrendingUp, desc: 'Graph analytical equations with coordinate crosshairs' },
    { id: 'data-analysis', name: 'Curve Fitting', category: 'Analysis', icon: FileSpreadsheet, desc: 'Least-squares non-linear regression & CSV data upload' },
    { id: 'constants', name: 'Physical Constants', category: 'Reference', icon: Database, desc: 'CODATA fundamental physical constants database' },
    { id: 'formulas', name: 'Formula Explorer', category: 'Reference', icon: BookOpen, desc: 'Equations, variable breakdowns & step-by-step examples' },
    { id: 'circuit-sim', name: 'DC Circuit Simulator', category: 'Circuits', icon: Layers, desc: 'Series, parallel, and voltage divider loops with LED output' }
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-6 md:p-8 backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold mb-2">
          <Wrench className="w-4 h-4" />
          Interactive Scientific Suite
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-100">
          Physics Laboratory & Computation Tools
        </h2>
        <p className="text-sm text-slate-400 max-w-2xl mt-1">
          A collection of high-precision calculators, analytical plotters, experimental curve fitters, and electronic circuit solvers built for physics undergraduates and researchers.
        </p>

        {/* Quick Tool Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 mt-6 border-t border-slate-800 scrollbar-none">
          {toolsList.map(t => {
            const Icon = t.icon;
            const isActive = activeTool === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTool(t.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${isActive ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700/60'}`}
              >
                <Icon className="w-3.5 h-3.5" />
                {t.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tool Viewport */}
      <div>
        {activeTool === 'resistor' && <ResistorCalculator />}
        {activeTool === 'ohms-law' && <OhmsLawCalculator />}
        {activeTool === 'unit-converter' && <UnitConverter />}
        {activeTool === 'plotter' && <ScientificPlotter />}
        {activeTool === 'data-analysis' && <DataAnalysisTool />}
        {activeTool === 'constants' && <PhysicalConstantsExplorer />}
        {activeTool === 'formulas' && <FormulaExplorer onOpenTool={id => setActiveTool(id)} />}
        {activeTool === 'circuit-sim' && <ElectronicsSimulator />}
      </div>
    </div>
  );
};

export default LabDashboard;
