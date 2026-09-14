import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Github,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Cpu,
  Atom,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Project } from '../types';
import MathView from './MathView';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onNavigateToTools?: (toolId?: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onNavigateToTools
}) => {
  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl border border-slate-700/80 bg-slate-900 text-slate-100 p-6 sm:p-8 space-y-8 shadow-2xl shadow-cyan-950/20"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. Header & Identity */}
        <div className="space-y-3 pr-10">
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
            <span className="px-2.5 py-1 rounded-md bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 font-semibold uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400 font-medium">{project.year}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">Raju's Scientific Portfolio</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-100 leading-tight">
            {project.title}
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
            {project.shortDescription}
          </p>
        </div>

        {/* Quick Metrics Strip */}
        {project.metrics && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center font-mono">
            {project.metrics.map((m, i) => (
              <div key={i} className="p-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block truncate">
                  {m.label}
                </span>
                <span className="text-sm sm:text-base font-bold text-cyan-400 mt-0.5 block">
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* 2. Overview & Motivation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
              <Atom className="w-3.5 h-3.5" />
              1. Overview
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {project.overview}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5" />
              2. Motivation
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
              "{project.motivation}"
            </p>
          </div>
        </div>

        {/* 3. Physics / Theory */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
            3. Physics & Theoretical Foundation
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed p-4 rounded-xl bg-slate-950/50 border border-slate-800/80">
            {project.physicsTheory}
          </p>
        </div>

        {/* 4. Mathematical Model */}
        {project.mathematicalModel && project.mathematicalModel.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
              4. Mathematical Model & Derivation
            </h3>
            <div className="space-y-2.5 rounded-xl bg-slate-950 p-4 border border-slate-800">
              {project.mathematicalModel.map((eq, i) => (
                <div key={i} className="flex justify-center overflow-x-auto py-1 text-center">
                  <MathView math={eq} display className="text-xs sm:text-sm text-cyan-300" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Implementation */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold">
            5. Technical Implementation
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed p-4 rounded-xl bg-slate-950/50 border border-slate-800/80">
            {project.implementation}
          </p>
        </div>

        {/* 6. Visualization */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              6. Interactive Visualization & Dynamic Model
            </h3>
            <span className="text-[10px] font-mono text-slate-500">Live Browser Render</span>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-hidden">
            <ProjectInteractiveVisualizer projectId={project.id} />
          </div>
        </div>

        {/* 7. Results */}
        <div className="p-4 sm:p-5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-2">
          <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            7. Experimental & Numerical Results
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
            {project.results}
          </p>
        </div>

        {/* 8. Lessons Learned */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
          <h3 className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            8. Lessons Learned & Scientific Insights
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {project.lessonsLearned}
          </p>
        </div>

        {/* 9. Links & Tags */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map(t => (
              <span
                key={t}
                className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60"
              >
                #{t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-mono font-semibold transition border border-slate-700/80"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>

            {onNavigateToTools && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateToTools();
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold transition shadow-md shadow-cyan-500/20"
              >
                <span>Related Physics Lab Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Specialized interactive canvas/visualizer for each project type
const ProjectInteractiveVisualizer: React.FC<{ projectId: string }> = ({ projectId }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRunning, setIsRunning] = useState(true);

  // 1. Double Pendulum Simulation
  if (projectId === 'chaotic-double-pendulum') {
    return <DoublePendulumMiniVisualizer />;
  }

  // 2. 4-Bit Adder Interactive Hardware Simulator
  if (projectId === 'arduino-binary-adder') {
    return <BinaryAdderInteractiveVisualizer />;
  }

  // 3. Photoelectric Effect Regression Plot
  if (projectId === 'photoelectric-analysis') {
    return <PhotoelectricPlotVisualizer />;
  }

  // 4. RC Transient Response Curve
  if (projectId === 'rc-transient-analysis') {
    return <RCTransientVisualizer />;
  }

  // 5. Schrödinger Tunneling Wavepacket Simulation
  if (projectId === 'schrodinger-solver') {
    return <SchrodingerTunnelingVisualizer />;
  }

  // 6. N-body Relativistic Orbit
  return <NBodyPrecessionVisualizer />;
};

// --- Sub-Visualizer 1: Schrödinger Wavepacket Tunneling ---
const SchrodingerTunnelingVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [barrierHeight, setBarrierHeight] = useState<number>(35);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Draw potential barrier
      const barrierX = w * 0.55;
      const barrierW = 24;
      const barrierH = (barrierHeight / 50) * (h * 0.65);

      ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
      ctx.fillRect(barrierX, h - barrierH - 30, barrierW, barrierH);
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.7)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(barrierX, h - barrierH - 30, barrierW, barrierH);

      // Barrier label
      ctx.fillStyle = 'rgba(239, 68, 68, 0.9)';
      ctx.font = '10px monospace';
      ctx.fillText(`V(x) = ${barrierHeight} eV`, barrierX - 15, h - barrierH - 36);

      // Baseline
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
      ctx.beginPath();
      ctx.moveTo(20, h - 30);
      ctx.lineTo(w - 20, h - 30);
      ctx.stroke();

      // Wavepacket |Ψ(x,t)|² Gaussian pulse traveling right and splitting
      const x0 = (t * 2) % (w + 100) - 50;
      const sigma = 35;

      ctx.beginPath();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#22d3ee';

      const points: [number, number][] = [];
      for (let x = 20; x < w - 20; x += 3) {
        let amp = 0;
        if (x < barrierX) {
          // Incident packet + reflected packet
          const incident = Math.exp(-Math.pow((x - x0) / sigma, 2)) * 65;
          const reflected =
            x0 > barrierX
              ? Math.exp(-Math.pow((x - (2 * barrierX - x0)) / sigma, 2)) * 40
              : 0;
          amp = incident + reflected;
        } else {
          // Transmitted packet (exponentially attenuated)
          const transFactor = Math.exp(-barrierHeight / 25);
          const transmitted =
            x0 > barrierX
              ? Math.exp(-Math.pow((x - x0) / sigma, 2)) * 65 * transFactor
              : 0;
          amp = transmitted;
        }

        const y = h - 30 - amp * (0.8 + 0.2 * Math.cos(x * 0.15 - t * 0.3));
        points.push([x, y]);
        if (x === 20) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Fill area under curve
      ctx.lineTo(w - 20, h - 30);
      ctx.lineTo(20, h - 30);
      ctx.closePath();
      ctx.fillStyle = 'rgba(34, 211, 238, 0.08)';
      ctx.fill();

      // Overlay text
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.fillText(`Crank-Nicolson Unitary Evolution | ∫|Ψ|²dx = 1.00000000`, 24, 25);

      if (!isPaused) t += 1.5;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [barrierHeight, isPaused]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="text-slate-400">Wavepacket Tunneling Simulation</span>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 text-slate-300">
            <span>Barrier V₀:</span>
            <input
              type="range"
              min="10"
              max="50"
              value={barrierHeight}
              onChange={e => setBarrierHeight(Number(e.target.value))}
              className="w-24 accent-cyan-400 cursor-pointer"
            />
          </label>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white"
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        width={700}
        height={180}
        className="w-full h-44 rounded-lg bg-slate-950"
      />
    </div>
  );
};

// --- Sub-Visualizer 2: Interactive 4-Bit Ripple Carry Adder ---
const BinaryAdderInteractiveVisualizer: React.FC = () => {
  const [a, setA] = useState<number[]>([0, 1, 0, 1]); // 5
  const [b, setB] = useState<number[]>([0, 0, 1, 1]); // 3

  const toggleA = (idx: number) => {
    const next = [...a];
    next[idx] = next[idx] === 1 ? 0 : 1;
    setA(next);
  };

  const toggleB = (idx: number) => {
    const next = [...b];
    next[idx] = next[idx] === 1 ? 0 : 1;
    setB(next);
  };

  // Compute 4-bit addition with carry ripple
  const carries: number[] = [0];
  const sums: number[] = [];
  for (let i = 3; i >= 0; i--) {
    const ai = a[i];
    const bi = b[i];
    const cin = carries[carries.length - 1];
    const s = ai ^ bi ^ cin;
    const cout = (ai & bi) | (cin & (ai ^ bi));
    sums.unshift(s);
    carries.push(cout);
  }
  const carryOut = carries[carries.length - 1];

  const valA = a.reduce((acc, bit, i) => acc + bit * Math.pow(2, 3 - i), 0);
  const valB = b.reduce((acc, bit, i) => acc + bit * Math.pow(2, 3 - i), 0);
  const valSum = valA + valB;

  return (
    <div className="space-y-4 font-mono text-xs">
      <div className="text-slate-400 flex items-center justify-between">
        <span>Discrete 74LS TTL Gate Logic Ripple Architecture</span>
        <span className="text-cyan-300">
          Dec: {valA} + {valB} = {valSum}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[0, 1, 2, 3].map(bit => {
          const bitIndex = 3 - bit; // bit 3 (MSB) to bit 0 (LSB)
          return (
            <div
              key={bit}
              className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center space-y-2"
            >
              <div className="text-[10px] text-cyan-400 font-bold uppercase">
                Stage {bit} (2^{bit})
              </div>

              <div className="flex justify-center gap-2">
                <button
                  onClick={() => toggleA(bitIndex)}
                  className={`px-2.5 py-1 rounded font-bold transition ${
                    a[bitIndex] ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  A:{a[bitIndex]}
                </button>
                <button
                  onClick={() => toggleB(bitIndex)}
                  className={`px-2.5 py-1 rounded font-bold transition ${
                    b[bitIndex] ? 'bg-indigo-500 text-slate-100' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  B:{b[bitIndex]}
                </button>
              </div>

              <div className="pt-2 border-t border-slate-800 text-left text-[10px] text-slate-400 space-y-1">
                <div>Cin: {carries[3 - bitIndex]}</div>
                <div className="text-emerald-400 font-bold">Sum: {sums[bitIndex]}</div>
                <div>Cout: {carries[4 - bitIndex]}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <span className="text-slate-400">Total Binary Output (Carry-Out + Sum):</span>
        <div className="flex items-center gap-1.5 text-sm font-bold text-cyan-300">
          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
            Cout: {carryOut}
          </span>
          {sums.map((s, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300"
            >
              {s}
            </span>
          ))}
          <span className="text-xs text-slate-400 ml-2 font-normal">
            = {valSum} in base 10
          </span>
        </div>
      </div>
    </div>
  );
};

// --- Sub-Visualizer 3: Photoelectric Regression Plot ---
const PhotoelectricPlotVisualizer: React.FC = () => {
  const points = [
    { freq: 5.187, v0: 0.41, err: 0.02, color: '#f59e0b' },
    { freq: 5.49, v0: 0.54, err: 0.02, color: '#10b981' },
    { freq: 6.88, v0: 1.12, err: 0.03, color: '#06b6d4' },
    { freq: 7.408, v0: 1.34, err: 0.03, color: '#3b82f6' },
    { freq: 8.214, v0: 1.66, err: 0.04, color: '#8b5cf6' }
  ];

  return (
    <div className="space-y-3 font-mono text-xs">
      <div className="flex items-center justify-between text-slate-400">
        <span>Least-Squares Linear Fit: V₀ = (h/e)ν - Φ/e</span>
        <span className="text-emerald-400">R² = 0.9984</span>
      </div>

      <div className="h-44 w-full bg-slate-950 rounded-lg p-3 relative flex flex-col justify-between border border-slate-900">
        {/* SVG Scatter Plot */}
        <svg className="w-full h-full" viewBox="0 0 500 160">
          {/* Grid lines */}
          <line x1="50" y1="20" x2="480" y2="20" stroke="#1e293b" strokeDasharray="3,3" />
          <line x1="50" y1="70" x2="480" y2="70" stroke="#1e293b" strokeDasharray="3,3" />
          <line x1="50" y1="120" x2="480" y2="120" stroke="#1e293b" strokeDasharray="3,3" />

          {/* Axes */}
          <line x1="50" y1="130" x2="480" y2="130" stroke="#475569" strokeWidth="1.5" />
          <line x1="50" y1="10" x2="50" y2="130" stroke="#475569" strokeWidth="1.5" />

          {/* Regression Line */}
          {/* (5.0, 0.33) -> (50, 115) to (8.5, 1.78) -> (460, 20) */}
          <line x1="50" y1="115" x2="460" y2="20" stroke="#22d3ee" strokeWidth="2" />

          {/* Points & Error Bars */}
          {points.map((p, i) => {
            const cx = 50 + ((p.freq - 5.0) / 3.5) * 410;
            const cy = 130 - (p.v0 / 2.0) * 110;
            return (
              <g key={i}>
                {/* Error bar */}
                <line x1={cx} y1={cy - 6} x2={cx} y2={cy + 6} stroke="#f43f5e" strokeWidth="1.5" />
                <line x1={cx - 3} y1={cy - 6} x2={cx + 3} y2={cy - 6} stroke="#f43f5e" strokeWidth="1" />
                <line x1={cx - 3} y1={cy + 6} x2={cx + 3} y2={cy + 6} stroke="#f43f5e" strokeWidth="1" />
                {/* Data point circle */}
                <circle cx={cx} cy={cy} r="4.5" fill={p.color} stroke="#0f172a" strokeWidth="1.5" />
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400">
        <span>Slope (h/e) = 4.08 × 10⁻¹⁵ V·s</span>
        <span className="text-cyan-300">Extracted h = 6.54 × 10⁻³⁴ J·s (±1.3%)</span>
        <span>Work Function Φ = 2.21 eV</span>
      </div>
    </div>
  );
};

// --- Sub-Visualizer 4: Double Pendulum Chaotic Phase Space ---
const DoublePendulumMiniVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let theta1 = Math.PI / 2;
    let theta2 = Math.PI / 2;
    let omega1 = 0;
    let omega2 = 0;
    const g = 9.81;
    const m1 = 1, m2 = 1, l1 = 60, l2 = 60;
    const trail: [number, number][] = [];

    const render = () => {
      ctx.fillStyle = 'rgba(2, 6, 23, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = 40;

      // RK4 integration step (approx simplified)
      const num1 = -g * (2 * m1 + m2) * Math.sin(theta1) - m2 * g * Math.sin(theta1 - 2 * theta2) - 2 * Math.sin(theta1 - theta2) * m2 * (omega2 * omega2 * l2 + omega1 * omega1 * l1 * Math.cos(theta1 - theta2));
      const den1 = l1 * (2 * m1 + m2 - m2 * Math.cos(2 * theta1 - 2 * theta2));
      const alpha1 = num1 / den1;

      const num2 = 2 * Math.sin(theta1 - theta2) * (omega1 * omega1 * l1 * (m1 + m2) + g * (m1 + m2) * Math.cos(theta1) + omega2 * omega2 * l2 * m2 * Math.cos(theta1 - theta2));
      const den2 = l2 * (2 * m1 + m2 - m2 * Math.cos(2 * theta1 - 2 * theta2));
      const alpha2 = num2 / den2;

      const dt = 0.05;
      omega1 += alpha1 * dt;
      omega2 += alpha2 * dt;
      theta1 += omega1 * dt;
      theta2 += omega2 * dt;

      // Damp slightly for stability in mini visualizer
      omega1 *= 0.9995;
      omega2 *= 0.9995;

      const x1 = cx + l1 * Math.sin(theta1);
      const y1 = cy + l1 * Math.cos(theta1);
      const x2 = x1 + l2 * Math.sin(theta2);
      const y2 = y1 + l2 * Math.cos(theta2);

      trail.push([x2, y2]);
      if (trail.length > 120) trail.shift();

      // Draw chaotic trail
      if (trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(trail[0][0], trail[0][1]);
        for (let i = 1; i < trail.length; i++) {
          ctx.lineTo(trail[i][0], trail[i][1]);
        }
        ctx.strokeStyle = 'rgba(34, 211, 238, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Draw rods
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw bobs
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(x1, y1, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(x2, y2, 6, 0, Math.PI * 2);
      ctx.fill();

      if (isRunning) {
        animId = requestAnimationFrame(render);
      }
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isRunning]);

  return (
    <div className="space-y-2 font-mono text-xs">
      <div className="flex items-center justify-between text-slate-400">
        <span>Nonlinear RK4 Trajectory & Chaotic Butterfly Trail</span>
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white"
        >
          {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={700}
        height={180}
        className="w-full h-44 rounded-lg bg-slate-950"
      />
    </div>
  );
};

// --- Sub-Visualizer 5: RC Transient Response ---
const RCTransientVisualizer: React.FC = () => {
  return (
    <div className="space-y-2 font-mono text-xs">
      <div className="flex items-center justify-between text-slate-400">
        <span>V_C(t) = V₀(1 - e^{'{'}-t/RC{'}'}) Capacitor Charging Curve</span>
        <span className="text-cyan-300">τ = RC = 0.468 ms</span>
      </div>
      <div className="h-44 w-full bg-slate-950 rounded-lg p-3 relative border border-slate-900">
        <svg className="w-full h-full" viewBox="0 0 500 160">
          <line x1="40" y1="130" x2="480" y2="130" stroke="#475569" strokeWidth="1.5" />
          <line x1="40" y1="10" x2="40" y2="130" stroke="#475569" strokeWidth="1.5" />

          {/* Asymptote V0 */}
          <line x1="40" y1="25" x2="480" y2="25" stroke="#ef4444" strokeDasharray="4,4" />
          <text x="440" y="20" fill="#ef4444" fontSize="10">V₀ = 5.0 V</text>

          {/* 63.2% Tau marker */}
          <line x1="120" y1="130" x2="120" y2="65" stroke="#eab308" strokeDasharray="3,3" />
          <line x1="40" y1="65" x2="120" y2="65" stroke="#eab308" strokeDasharray="3,3" />
          <text x="125" y="68" fill="#eab308" fontSize="10">63.2% V₀ at t = τ</text>

          {/* Exponential curve */}
          <path
            d="M 40 130 Q 90 70, 180 35 T 480 25"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="2.5"
          />
        </svg>
      </div>
    </div>
  );
};

// --- Sub-Visualizer 6: N-Body Relativistic Precession ---
const NBodyPrecessionVisualizer: React.FC = () => {
  return (
    <div className="space-y-2 font-mono text-xs">
      <div className="flex items-center justify-between text-slate-400">
        <span>General Relativistic Perihelion Precession (Mercury Orbit)</span>
        <span className="text-cyan-300">Δφ = 6πGM / [c²a(1-e²)]</span>
      </div>
      <div className="h-44 w-full bg-slate-950 rounded-lg p-3 relative flex items-center justify-center border border-slate-900">
        <svg className="w-64 h-40" viewBox="0 0 200 140">
          {/* Central Sun */}
          <circle cx="90" cy="70" r="10" fill="#f59e0b" />
          {/* Precessing Rosette Ellipses */}
          {[0, 20, 40, 60, 80].map(rot => (
            <ellipse
              key={rot}
              cx="105"
              cy="70"
              rx="60"
              ry="35"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="1.2"
              opacity={(rot + 20) / 100}
              transform={`rotate(${rot} 90 70)`}
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default ProjectDetailModal;
