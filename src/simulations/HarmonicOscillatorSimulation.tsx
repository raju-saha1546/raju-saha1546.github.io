import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Activity, Disc, Zap } from 'lucide-react';

export const HarmonicOscillatorSimulation: React.FC = () => {
  const animCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const phaseCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Mode: Spring-Mass or Simple Pendulum
  const [mode, setMode] = useState<'spring' | 'pendulum'>('pendulum');

  // Physical parameters
  const [lengthOrK, setLengthOrK] = useState<number>(1.2); // Length (m) or Spring Constant k (N/m)
  const [mass, setMass] = useState<number>(1.0); // kg
  const [damping, setDamping] = useState<number>(0.12); // damping coefficient gamma
  const [drivingAmp, setDrivingAmp] = useState<number>(0.0); // driving force amplitude
  const [drivingFreq, setDrivingFreq] = useState<number>(1.5); // driving angular frequency rad/s

  // State variables
  const [thetaOrX, setThetaOrX] = useState<number>(0.6); // rad or m
  const [omegaOrV, setOmegaOrV] = useState<number>(0.0); // rad/s or m/s
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [time, setTime] = useState<number>(0);

  // Phase space trajectory buffer (last 300 points)
  const [phaseHistory, setPhaseHistory] = useState<{ pos: number; vel: number }[]>([]);

  const g = 9.80665;

  // Natural frequency omega_0
  const omega0 = mode === 'pendulum' ? Math.sqrt(g / lengthOrK) : Math.sqrt(lengthOrK / mass);

  // Reset
  const resetSim = useCallback(() => {
    setThetaOrX(0.7);
    setOmegaOrV(0.0);
    setTime(0);
    setPhaseHistory([]);
  }, []);

  // Numerical integration (Euler-Cromer / RK2)
  useEffect(() => {
    if (!isPlaying) return;

    const dt = 0.02;
    const interval = setInterval(() => {
      setTime(t => t + dt);

      // Compute acceleration
      let acc = 0;
      if (mode === 'pendulum') {
        // d^2theta/dt^2 = - (g/L)*sin(theta) - gamma*omega + F0*cos(omega_d*t)
        const drive = drivingAmp * Math.cos(drivingFreq * time);
        acc = -(g / lengthOrK) * Math.sin(thetaOrX) - damping * omegaOrV + drive;
      } else {
        // d^2x/dt^2 = - (k/m)*x - gamma*v + F0*cos(omega_d*t)
        const drive = drivingAmp * Math.cos(drivingFreq * time);
        acc = -(lengthOrK / mass) * thetaOrX - damping * omegaOrV + drive;
      }

      const nextV = omegaOrV + acc * dt;
      const nextX = thetaOrX + nextV * dt;

      setOmegaOrV(nextV);
      setThetaOrX(nextX);

      setPhaseHistory(prev => {
        const updated = [...prev, { pos: nextX, vel: nextV }];
        if (updated.length > 350) updated.shift();
        return updated;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [isPlaying, mode, lengthOrK, mass, damping, drivingAmp, drivingFreq, thetaOrX, omegaOrV, time]);

  // Render physical animation canvas
  useEffect(() => {
    const canvas = animCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;

    ctx.fillStyle = '#060911';
    ctx.fillRect(0, 0, w, h);

    // Subtle background grid
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.07)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= w; x += 25) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y <= h; y += 25) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    if (mode === 'pendulum') {
      // Pivot at top center
      const pivotX = w / 2;
      const pivotY = 40;
      const rodPixelLength = Math.min(h * 0.65, 180);

      const bobX = pivotX + rodPixelLength * Math.sin(thetaOrX);
      const bobY = pivotY + rodPixelLength * Math.cos(thetaOrX);

      // Pivot base
      ctx.fillStyle = '#475569';
      ctx.fillRect(pivotX - 30, pivotY - 8, 60, 8);
      ctx.fillStyle = '#94a3b8';
      ctx.beginPath();
      ctx.arc(pivotX, pivotY, 5, 0, Math.PI * 2);
      ctx.fill();

      // String / Rod
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(pivotX, pivotY);
      ctx.lineTo(bobX, bobY);
      ctx.stroke();

      // Bob glow
      ctx.fillStyle = 'rgba(6, 182, 212, 0.3)';
      ctx.beginPath();
      ctx.arc(bobX, bobY, 18, 0, Math.PI * 2);
      ctx.fill();

      // Bob solid
      ctx.fillStyle = '#06b6d4';
      ctx.beginPath();
      ctx.arc(bobX, bobY, 12, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Spring-mass horizontal
      const centerY = h / 2;
      const wallX = 30;
      const restX = w / 2;
      const massX = restX + thetaOrX * 70;

      // Wall
      ctx.fillStyle = '#475569';
      ctx.fillRect(wallX - 10, centerY - 40, 10, 80);

      // Spring zigzag
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(wallX, centerY);
      const coils = 14;
      const springW = massX - wallX;
      for (let i = 0; i <= coils; i++) {
        const x = wallX + (i / coils) * springW;
        const offset = i === 0 || i === coils ? 0 : (i % 2 === 0 ? -12 : 12);
        ctx.lineTo(x, centerY + offset);
      }
      ctx.stroke();

      // Mass block
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(massX, centerY - 20, 40, 40);
      ctx.strokeStyle = '#38bdf8';
      ctx.strokeRect(massX, centerY - 20, 40, 40);
    }
  }, [mode, thetaOrX, lengthOrK]);

  // Render phase space diagram (x vs v) or (theta vs omega)
  useEffect(() => {
    const canvas = phaseCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;

    ctx.fillStyle = '#060911';
    ctx.fillRect(0, 0, w, h);

    // Axes
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, h);
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();

    // Axis labels
    ctx.fillStyle = '#64748b';
    ctx.font = '9px Fira Code';
    ctx.fillText('Pos (x / θ)', w - 60, h / 2 - 6);
    ctx.fillText('Vel (v / ω)', w / 2 + 6, 14);

    if (phaseHistory.length > 1) {
      const scalePos = 50;
      const scaleVel = 30;

      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1.6;
      ctx.beginPath();

      phaseHistory.forEach((pt, i) => {
        const sx = w / 2 + pt.pos * scalePos;
        const sy = h / 2 - pt.vel * scaleVel;
        if (i === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      });
      ctx.stroke();

      // Current state head
      const last = phaseHistory[phaseHistory.length - 1];
      ctx.fillStyle = '#34d399';
      ctx.beginPath();
      ctx.arc(w / 2 + last.pos * scalePos, h / 2 - last.vel * scaleVel, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [phaseHistory]);

  return (
    <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-5 md:p-8 backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h3 className="text-xl font-bold font-display text-slate-100 flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            Harmonic Oscillator & Phase Space Dynamics
          </h3>
          <p className="text-xs text-slate-400 mt-1">Damped and driven oscillation trajectories with phase portrait (position vs velocity) visualization</p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Mode switch */}
          <div className="flex rounded-lg border border-slate-700 bg-slate-800/80 p-1 text-xs font-semibold">
            <button
              onClick={() => { setMode('pendulum'); resetSim(); }}
              className={`px-2.5 py-1 rounded transition ${mode === 'pendulum' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-300'}`}
            >
              Simple Pendulum
            </button>
            <button
              onClick={() => { setMode('spring'); resetSim(); }}
              className={`px-2.5 py-1 rounded transition ${mode === 'spring' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-300'}`}
            >
              Spring-Mass
            </button>
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${isPlaying ? 'bg-amber-500 text-slate-950' : 'bg-cyan-500 text-slate-950'}`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isPlaying ? 'Pause' : 'Resume'}
          </button>
          <button
            onClick={resetSim}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Dual Stage: Physical motion canvas & Phase space portrait */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 my-6">
        {/* Physical motion canvas */}
        <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-[#060911] relative overflow-hidden">
          <canvas ref={animCanvasRef} className="w-full h-64 sm:h-72 block" />
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-slate-900/90 border border-slate-700 text-[11px] font-mono text-cyan-300">
            {mode === 'pendulum' ? `Angle θ: ${(thetaOrX * 180 / Math.PI).toFixed(1)}°` : `Displacement x: ${thetaOrX.toFixed(2)} m`}
          </div>
        </div>

        {/* Phase Space Portrait */}
        <div className="lg:col-span-5 rounded-xl border border-slate-800 bg-[#060911] relative overflow-hidden flex flex-col justify-between p-3">
          <div className="flex justify-between items-center text-xs text-slate-400 font-mono px-2 pt-1">
            <span>Phase Space Portrait</span>
            <span className="text-emerald-400 font-semibold">x vs v orbit</span>
          </div>
          <canvas ref={phaseCanvasRef} className="w-full h-52 block my-1" />
          <div className="text-[10px] text-slate-500 font-mono text-center">
            {damping > 0 ? 'Damped spiral toward stable equilibrium attractor' : 'Conservative closed elliptical orbit'}
          </div>
        </div>
      </div>

      {/* Numerical Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 text-xs font-mono">
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
          <span className="text-[10px] uppercase text-slate-500 block">Natural Frequency (ω₀)</span>
          <span className="text-sm font-bold text-cyan-400">{omega0.toFixed(3)} rad/s</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
          <span className="text-[10px] uppercase text-slate-500 block">Period (T₀)</span>
          <span className="text-sm font-bold text-slate-200">{(2 * Math.PI / omega0).toFixed(3)} s</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
          <span className="text-[10px] uppercase text-slate-500 block">Damping Ratio (γ)</span>
          <span className="text-sm font-bold text-amber-400">{damping.toFixed(3)}</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
          <span className="text-[10px] uppercase text-slate-500 block">Quality Factor (Q)</span>
          <span className="text-sm font-bold text-emerald-400">{damping > 0 ? (omega0 / (2 * damping)).toFixed(1) : '∞'}</span>
        </div>
      </div>

      {/* Parameter Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-800 text-xs">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-slate-300 font-semibold">{mode === 'pendulum' ? 'Pendulum Length (L)' : 'Spring Constant (k)'}:</span>
            <span className="font-mono text-cyan-400 font-bold">{lengthOrK} {mode === 'pendulum' ? 'm' : 'N/m'}</span>
          </div>
          <input
            type="range"
            min={mode === 'pendulum' ? 0.3 : 2}
            max={mode === 'pendulum' ? 3.0 : 50}
            step="0.1"
            value={lengthOrK}
            onChange={e => setLengthOrK(Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-slate-300 font-semibold">Viscous Damping (γ):</span>
            <span className="font-mono text-cyan-400 font-bold">{damping}</span>
          </div>
          <input
            type="range"
            min="0"
            max="0.8"
            step="0.01"
            value={damping}
            onChange={e => setDamping(Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-slate-300 font-semibold">Driving Force Amplitude (F₀):</span>
            <span className="font-mono text-cyan-400 font-bold">{drivingAmp}</span>
          </div>
          <input
            type="range"
            min="0"
            max="2.0"
            step="0.05"
            value={drivingAmp}
            onChange={e => setDrivingAmp(Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default HarmonicOscillatorSimulation;
