import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, GitBranch, Sparkles, Eye } from 'lucide-react';

interface PendulumState {
  theta1: number;
  theta2: number;
  omega1: number;
  omega2: number;
}

export const DoublePendulumSimulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Parameters
  const [l1, setL1] = useState<number>(1.0);
  const [l2, setL2] = useState<number>(1.0);
  const [m1, setM1] = useState<number>(1.0);
  const [m2, setM2] = useState<number>(1.0);
  const [g, setG] = useState<number>(9.81);
  const [showTwin, setShowTwin] = useState<boolean>(true); // Twin pendulum for Lyapunov divergence!

  // Primary pendulum state
  const [p1, setP1] = useState<PendulumState>({
    theta1: Math.PI / 2,
    theta2: Math.PI / 2,
    omega1: 0,
    omega2: 0
  });

  // Secondary twin pendulum state (starts with 0.001 rad difference)
  const [p2, setP2] = useState<PendulumState>({
    theta1: Math.PI / 2 + 0.001,
    theta2: Math.PI / 2,
    omega1: 0,
    omega2: 0
  });

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [trailP1, setTrailP1] = useState<{ x: number; y: number }[]>([]);
  const [trailP2, setTrailP2] = useState<{ x: number; y: number }[]>([]);

  // Reset
  const resetSim = useCallback(() => {
    setP1({
      theta1: Math.PI / 2,
      theta2: Math.PI / 2,
      omega1: 0,
      omega2: 0
    });
    setP2({
      theta1: Math.PI / 2 + 0.001,
      theta2: Math.PI / 2,
      omega1: 0,
      omega2: 0
    });
    setTrailP1([]);
    setTrailP2([]);
  }, []);

  // Compute derivatives via Lagrangian equations
  const derivatives = (state: PendulumState) => {
    const { theta1, theta2, omega1, omega2 } = state;
    const delta = theta1 - theta2;

    // Denominators
    const den1 = l1 * (2 * m1 + m2 - m2 * Math.cos(2 * theta1 - 2 * theta2));
    const den2 = l2 * (2 * m1 + m2 - m2 * Math.cos(2 * theta1 - 2 * theta2));

    // Angular acceleration 1
    const num1 =
      -g * (2 * m1 + m2) * Math.sin(theta1) -
      m2 * g * Math.sin(theta1 - 2 * theta2) -
      2 * Math.sin(delta) * m2 * (omega2 * omega2 * l2 + omega1 * omega1 * l1 * Math.cos(delta));
    const alpha1 = num1 / den1;

    // Angular acceleration 2
    const num2 =
      2 *
      Math.sin(delta) *
      (omega1 * omega1 * l1 * (m1 + m2) +
        g * (m1 + m2) * Math.cos(theta1) +
        omega2 * omega2 * l2 * m2 * Math.cos(delta));
    const alpha2 = num2 / den2;

    return { dTheta1: omega1, dTheta2: omega2, dOmega1: alpha1, dOmega2: alpha2 };
  };

  // Runge-Kutta 4th Order integrator step
  const rk4Step = (state: PendulumState, dt: number): PendulumState => {
    const k1 = derivatives(state);

    const s2: PendulumState = {
      theta1: state.theta1 + 0.5 * dt * k1.dTheta1,
      theta2: state.theta2 + 0.5 * dt * k1.dTheta2,
      omega1: state.omega1 + 0.5 * dt * k1.dOmega1,
      omega2: state.omega2 + 0.5 * dt * k1.dOmega2
    };
    const k2 = derivatives(s2);

    const s3: PendulumState = {
      theta1: state.theta1 + 0.5 * dt * k2.dTheta1,
      theta2: state.theta2 + 0.5 * dt * k2.dTheta2,
      omega1: state.omega1 + 0.5 * dt * k2.dOmega1,
      omega2: state.omega2 + 0.5 * dt * k2.dOmega2
    };
    const k3 = derivatives(s3);

    const s4: PendulumState = {
      theta1: state.theta1 + dt * k3.dTheta1,
      theta2: state.theta2 + dt * k3.dTheta2,
      omega1: state.omega1 + dt * k3.dOmega1,
      omega2: state.omega2 + dt * k3.dOmega2
    };
    const k4 = derivatives(s4);

    return {
      theta1: state.theta1 + (dt / 6) * (k1.dTheta1 + 2 * k2.dTheta1 + 2 * k3.dTheta1 + k4.dTheta1),
      theta2: state.theta2 + (dt / 6) * (k1.dTheta2 + 2 * k2.dTheta2 + 2 * k3.dTheta2 + k4.dTheta2),
      omega1: state.omega1 + (dt / 6) * (k1.dOmega1 + 2 * k2.dOmega1 + 2 * k3.dOmega1 + k4.dOmega1),
      omega2: state.omega2 + (dt / 6) * (k1.dOmega2 + 2 * k2.dOmega2 + 2 * k3.dOmega2 + k4.dOmega2)
    };
  };

  // Simulation physics ticker
  useEffect(() => {
    if (!isPlaying) return;

    const dt = 0.02;
    const interval = setInterval(() => {
      setP1(prev1 => {
        const next1 = rk4Step(prev1, dt);
        // Position of tip 2
        const x1 = l1 * Math.sin(next1.theta1);
        const y1 = l1 * Math.cos(next1.theta1);
        const x2 = x1 + l2 * Math.sin(next1.theta2);
        const y2 = y1 + l2 * Math.cos(next1.theta2);

        setTrailP1(t => {
          const up = [...t, { x: x2, y: y2 }];
          if (up.length > 250) up.shift();
          return up;
        });

        return next1;
      });

      if (showTwin) {
        setP2(prev2 => {
          const next2 = rk4Step(prev2, dt);
          const x1 = l1 * Math.sin(next2.theta1);
          const y1 = l1 * Math.cos(next2.theta1);
          const x2 = x1 + l2 * Math.sin(next2.theta2);
          const y2 = y1 + l2 * Math.cos(next2.theta2);

          setTrailP2(t => {
            const up = [...t, { x: x2, y: y2 }];
            if (up.length > 250) up.shift();
            return up;
          });

          return next2;
        });
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isPlaying, l1, l2, m1, m2, g, showTwin]);

  // Canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current;
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

    // Subtle grid
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.06)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= w; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y <= h; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const originX = w / 2;
    const originY = h * 0.38;
    const scale = Math.min(w, h) / 4.5;

    // Draw Twin Trail (Rose)
    if (showTwin && trailP2.length > 1) {
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      trailP2.forEach((pt, i) => {
        const sx = originX + pt.x * scale;
        const sy = originY + pt.y * scale;
        if (i === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      });
      ctx.stroke();
    }

    // Draw Primary Trail (Cyan)
    if (trailP1.length > 1) {
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.7)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      trailP1.forEach((pt, i) => {
        const sx = originX + pt.x * scale;
        const sy = originY + pt.y * scale;
        if (i === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      });
      ctx.stroke();
    }

    // Helper to draw a single double pendulum
    const drawRodsAndBobs = (state: PendulumState, rodColor: string, bobColor: string, isGhost: boolean) => {
      const x1 = originX + l1 * Math.sin(state.theta1) * scale;
      const y1 = originY + l1 * Math.cos(state.theta1) * scale;

      const x2 = x1 + l2 * Math.sin(state.theta2) * scale;
      const y2 = y1 + l2 * Math.cos(state.theta2) * scale;

      ctx.strokeStyle = rodColor;
      ctx.lineWidth = isGhost ? 1.5 : 2.5;

      // Rod 1
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(x1, y1);
      ctx.stroke();

      // Rod 2
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      // Bob 1
      ctx.fillStyle = bobColor;
      ctx.beginPath();
      ctx.arc(x1, y1, isGhost ? 5 : 8, 0, Math.PI * 2);
      ctx.fill();

      // Bob 2 (tip)
      ctx.beginPath();
      ctx.arc(x2, y2, isGhost ? 6 : 9, 0, Math.PI * 2);
      ctx.fill();
    };

    // Draw secondary if enabled
    if (showTwin) {
      drawRodsAndBobs(p2, 'rgba(244, 63, 94, 0.5)', '#fb7185', true);
    }

    // Draw primary
    drawRodsAndBobs(p1, '#38bdf8', '#06b6d4', false);

    // Pivot Anchor
    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.arc(originX, originY, 4, 0, Math.PI * 2);
    ctx.fill();
  }, [p1, p2, l1, l2, trailP1, trailP2, showTwin]);

  // Angular difference between primary and twin
  const angularDiff = Math.sqrt(
    Math.pow(p1.theta1 - p2.theta1, 2) + Math.pow(p1.theta2 - p2.theta2, 2)
  );

  return (
    <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-5 md:p-8 backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h3 className="text-xl font-bold font-display text-slate-100 flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-cyan-400" />
            Double Pendulum & Deterministic Chaos
          </h3>
          <p className="text-xs text-slate-400 mt-1">4th-order Runge-Kutta integration of chaotic Lagrangian dynamics with Lyapunov phase divergence</p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTwin(!showTwin)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition border ${showTwin ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' : 'bg-slate-800 text-slate-400 border-slate-700'}`}
            title="Twin pendulum with 0.001 rad initial deviation"
          >
            <Eye className="w-3.5 h-3.5" />
            Twin Divergence: {showTwin ? 'ON' : 'OFF'}
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition shadow-sm ${isPlaying ? 'bg-amber-500 text-slate-950' : 'bg-cyan-500 text-slate-950'}`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isPlaying ? 'Pause' : 'Resume'}
          </button>
          <button
            onClick={resetSim}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title="Reset Simulation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Canvas */}
      <div className="my-6 relative rounded-xl border border-slate-800 overflow-hidden bg-[#060911] shadow-2xl">
        <canvas ref={canvasRef} className="w-full h-80 sm:h-96 block" />

        {/* Chaos Telemetry Overlay */}
        <div className="absolute top-3 left-3 px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-700/80 font-mono text-xs text-slate-200 backdrop-blur-sm space-y-1 shadow-md">
          <div className="text-[11px] text-cyan-400 font-bold uppercase tracking-wider">Lagrangian State</div>
          <div>θ₁: <span className="text-slate-100">{(p1.theta1 % (2 * Math.PI)).toFixed(2)} rad</span></div>
          <div>θ₂: <span className="text-slate-100">{(p1.theta2 % (2 * Math.PI)).toFixed(2)} rad</span></div>
          {showTwin && (
            <div className="pt-1 border-t border-slate-800 text-rose-400">
              Trajectory Separation (Δθ): <span className="font-bold">{angularDiff.toFixed(4)} rad</span>
            </div>
          )}
        </div>

        <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-[11px] font-mono text-slate-400 backdrop-blur-sm">
          <span className="text-cyan-400">● Primary Trajectory</span>{' '}
          {showTwin && <span className="text-rose-400 ml-2">● Twin (Initial Δθ = 10⁻³ rad)</span>}
        </div>
      </div>

      {/* Parameter Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-slate-800 text-xs">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-slate-300 font-semibold">Rod 1 Length (L₁):</span>
            <span className="font-mono text-cyan-400 font-bold">{l1} m</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="1.5"
            step="0.05"
            value={l1}
            onChange={e => setL1(Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-slate-300 font-semibold">Rod 2 Length (L₂):</span>
            <span className="font-mono text-cyan-400 font-bold">{l2} m</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="1.5"
            step="0.05"
            value={l2}
            onChange={e => setL2(Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-slate-300 font-semibold">Bob 1 Mass (m₁):</span>
            <span className="font-mono text-cyan-400 font-bold">{m1} kg</span>
          </div>
          <input
            type="range"
            min="0.2"
            max="3.0"
            step="0.1"
            value={m1}
            onChange={e => setM1(Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-slate-300 font-semibold">Bob 2 Mass (m₂):</span>
            <span className="font-mono text-cyan-400 font-bold">{m2} kg</span>
          </div>
          <input
            type="range"
            min="0.2"
            max="3.0"
            step="0.1"
            value={m2}
            onChange={e => setM2(Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default DoublePendulumSimulation;
