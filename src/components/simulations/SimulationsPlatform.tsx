import React, { useState } from 'react';
import { Compass, Activity, GitBranch, Waves, Zap, Sparkles } from 'lucide-react';
import ProjectileSimulation from './ProjectileSimulation';
import HarmonicOscillatorSimulation from './HarmonicOscillatorSimulation';
import DoublePendulumSimulation from './DoublePendulumSimulation';
import WaveInterferenceSimulation from './WaveInterferenceSimulation';
import ElectricFieldSimulation from './ElectricFieldSimulation';

interface SimulationsPlatformProps {
  initialSimId?: string;
}

export const SimulationsPlatform: React.FC<SimulationsPlatformProps> = ({ initialSimId = 'projectile' }) => {
  const [activeSim, setActiveSim] = useState<string>(initialSimId);

  const simTabs = [
    { id: 'projectile', name: 'Projectile & Drag', icon: Compass, desc: '2D trajectories with quadratic air resistance and variable planetary gravity' },
    { id: 'harmonic', name: 'Harmonic Oscillator', icon: Activity, desc: 'Damped & driven oscillations with real-time phase space portrait' },
    { id: 'double-pendulum', name: 'Double Pendulum', icon: GitBranch, desc: 'Deterministic chaos & Lyapunov phase trajectory divergence' },
    { id: 'waves', name: 'Wave Interference', icon: Waves, desc: 'Young double slit wave superposition & chromatic laser diffraction' },
    { id: 'electric-field', name: 'Coulomb Electric Field', icon: Zap, desc: 'Multi-pole electrostatic vector grid & equipotential scalar mapping' }
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-6 md:p-8 backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold mb-2">
          <Sparkles className="w-4 h-4" />
          Interactive Physics Engine
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-100">
          Real-Time Numerical Simulations
        </h2>
        <p className="text-sm text-slate-400 max-w-2xl mt-1">
          Explore physical phenomena through direct interactive numerical modeling. Adjust physical constants, release initial conditions, and observe classical and modern dynamics in real time.
        </p>

        {/* Simulation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 mt-6 border-t border-slate-800 scrollbar-none">
          {simTabs.map(t => {
            const Icon = t.icon;
            const isActive = activeSim === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveSim(t.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${isActive ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700/60'}`}
              >
                <Icon className="w-3.5 h-3.5" />
                {t.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Simulation Viewport */}
      <div>
        {activeSim === 'projectile' && <ProjectileSimulation />}
        {activeSim === 'harmonic' && <HarmonicOscillatorSimulation />}
        {activeSim === 'double-pendulum' && <DoublePendulumSimulation />}
        {activeSim === 'waves' && <WaveInterferenceSimulation />}
        {activeSim === 'electric-field' && <ElectricFieldSimulation />}
      </div>
    </div>
  );
};

export default SimulationsPlatform;
