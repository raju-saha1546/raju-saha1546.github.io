import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Compass, Wind, Gauge, Sparkles } from 'lucide-react';

interface CelestialBody {
  name: string;
  g: number; // m/s^2
  airDensity: number; // kg/m^3 (approx)
}

const CELESTIAL_BODIES: CelestialBody[] = [
  { name: 'Earth (9.81 m/s²)', g: 9.80665, airDensity: 1.225 },
  { name: 'Moon (1.62 m/s²)', g: 1.62, airDensity: 0.0 },
  { name: 'Mars (3.72 m/s²)', g: 3.72, airDensity: 0.02 },
  { name: 'Jupiter (24.79 m/s²)', g: 24.79, airDensity: 2.0 }
];

export const ProjectileSimulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Simulation Parameters
  const [velocity, setVelocity] = useState<number>(35); // m/s
  const [angleDeg, setAngleDeg] = useState<number>(45); // degrees
  const [launchHeight, setLaunchHeight] = useState<number>(0); // meters
  const [mass, setMass] = useState<number>(1.0); // kg
  const [dragCoeff, setDragCoeff] = useState<number>(0.15); // Cd * A approx
  const [enableDrag, setEnableDrag] = useState<boolean>(true);
  const [selectedBodyIdx, setSelectedBodyIdx] = useState<number>(0);

  // State of simulation
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [simTime, setSimTime] = useState<number>(0);

  // Trajectory history: points {x, y, vx, vy, t}
  const [trajectory, setTrajectory] = useState<{ x: number; y: number }[]>([]);
  const [currentPos, setCurrentPos] = useState<{ x: number; y: number; vx: number; vy: number }>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0
  });

  // Metrics
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const [maxRange, setMaxRange] = useState<number>(0);
  const [flightTime, setFlightTime] = useState<number>(0);

  const body = CELESTIAL_BODIES[selectedBodyIdx];

  // Reset simulation
  const resetSim = useCallback(() => {
    setIsPlaying(false);
    setSimTime(0);
    const theta = (angleDeg * Math.PI) / 180;
    const v0x = velocity * Math.cos(theta);
    const v0y = velocity * Math.sin(theta);
    setCurrentPos({ x: 0, y: launchHeight, vx: v0x, vy: v0y });
    setTrajectory([{ x: 0, y: launchHeight }]);
    setMaxHeight(launchHeight);
    setMaxRange(0);
    setFlightTime(0);
  }, [velocity, angleDeg, launchHeight]);

  useEffect(() => {
    resetSim();
  }, [resetSim]);

  // Numerical integration loop (Runge-Kutta / Euler-Cromer)
  useEffect(() => {
    if (!isPlaying) return;

    const dt = 0.02; // 20ms physics step
    const interval = setInterval(() => {
      setCurrentPos(prev => {
        if (prev.y < 0 && prev.x > 0) {
          setIsPlaying(false);
          return prev;
        }

        const v = Math.sqrt(prev.vx * prev.vx + prev.vy * prev.vy);
        const dragForceMag = enableDrag ? 0.5 * body.airDensity * dragCoeff * v * v : 0;
        const ax = v > 0 ? -(dragForceMag * (prev.vx / v)) / mass : 0;
        const ay = -body.g - (v > 0 ? (dragForceMag * (prev.vy / v)) / mass : 0);

        const nextVx = prev.vx + ax * dt;
        const nextVy = prev.vy + ay * dt;
        const nextX = prev.x + nextVx * dt;
        const nextY = Math.max(0, prev.y + nextVy * dt);

        setTrajectory(t => [...t, { x: nextX, y: nextY }]);
        setMaxHeight(h => Math.max(h, nextY));
        setMaxRange(nextX);
        setSimTime(st => st + dt);

        if (nextY <= 0 && prev.x > 0.1) {
          setIsPlaying(false);
          setFlightTime(t => t + dt);
        }

        return { x: nextX, y: nextY, vx: nextVx, vy: nextVy };
      });
    }, 20);

    return () => clearInterval(interval);
  }, [isPlaying, body, dragCoeff, enableDrag, mass]);

  // Canvas drawing
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

    const width = rect.width;
    const height = rect.height;

    // Clear canvas
    ctx.fillStyle = '#060911';
    ctx.fillRect(0, 0, width, height);

    // Coordinate scaling
    const scale = Math.min(width / Math.max(80, maxRange * 1.25), (height - 60) / Math.max(30, maxHeight * 1.3));
    const originX = 40;
    const originY = height - 40;

    const toX = (x: number) => originX + x * scale;
    const toY = (y: number) => originY - y * scale;

    // Draw ground grid
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y <= height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Ground plane
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY);
    ctx.stroke();

    // Distance tick markers along ground
    ctx.fillStyle = '#64748b';
    ctx.font = '10px Fira Code';
    const tickStep = 20;
    for (let m = 0; m * scale < width - originX; m += tickStep) {
      const sx = toX(m);
      ctx.beginPath();
      ctx.moveTo(sx, originY);
      ctx.lineTo(sx, originY + 6);
      ctx.stroke();
      ctx.fillText(`${m}m`, sx - 8, originY + 18);
    }

    // Launch Cannon / Platform
    ctx.fillStyle = '#334155';
    ctx.fillRect(originX - 10, toY(launchHeight), 12, launchHeight * scale || 8);

    // Cannon barrel
    const theta = (angleDeg * Math.PI) / 180;
    ctx.save();
    ctx.translate(originX, toY(launchHeight));
    ctx.rotate(-theta);
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(0, -4, 26, 8);
    ctx.restore();

    // Draw Trajectory Path
    if (trajectory.length > 1) {
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.7)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(toX(trajectory[0].x), toY(trajectory[0].y));
      for (let i = 1; i < trajectory.length; i++) {
        ctx.lineTo(toX(trajectory[i].x), toY(trajectory[i].y));
      }
      ctx.stroke();
    }

    // Draw Projectile Sphere
    const px = toX(currentPos.x);
    const py = toY(currentPos.y);

    // Glowing halo
    ctx.fillStyle = 'rgba(56, 189, 248, 0.3)';
    ctx.beginPath();
    ctx.arc(px, py, 12, 0, Math.PI * 2);
    ctx.fill();

    // Ball
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(px, py, 6, 0, Math.PI * 2);
    ctx.fill();

    // Velocity vector arrow
    const vMag = Math.sqrt(currentPos.vx * currentPos.vx + currentPos.vy * currentPos.vy);
    if (vMag > 0.1) {
      const vScale = 1.2;
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px + currentPos.vx * vScale, py - currentPos.vy * vScale);
      ctx.stroke();
    }
  }, [trajectory, currentPos, maxHeight, maxRange, angleDeg, launchHeight]);

  // Current kinetic & potential energy
  const currentSpeed = Math.sqrt(currentPos.vx * currentPos.vx + currentPos.vy * currentPos.vy);
  const ke = 0.5 * mass * currentSpeed * currentSpeed;
  const pe = mass * body.g * currentPos.y;

  return (
    <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-5 md:p-8 backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h3 className="text-xl font-bold font-display text-slate-100 flex items-center gap-2">
            <Compass className="w-5 h-5 text-cyan-400" />
            Ballistic Projectile & Aerodynamic Drag Simulation
          </h3>
          <p className="text-xs text-slate-400 mt-1">Simulate 2D trajectory dynamics with quadratic air resistance and planetary gravitational fields</p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm ${isPlaying ? 'bg-amber-500 text-slate-950' : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'}`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? 'Pause' : 'Launch'}
          </button>
          <button
            onClick={resetSim}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title="Reset Simulation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Simulation Stage */}
      <div className="my-6 relative rounded-xl border border-slate-800 overflow-hidden bg-[#060911] shadow-2xl">
        <canvas ref={canvasRef} className="w-full h-80 sm:h-96 block" />

        {/* Live Flight Telemetry Overlay */}
        <div className="absolute top-3 left-3 px-3.5 py-2 rounded-lg bg-slate-900/90 border border-slate-700/80 font-mono text-xs text-slate-200 backdrop-blur-sm space-y-1 shadow-md">
          <div className="text-[11px] text-cyan-400 font-bold uppercase tracking-wider">Flight Telemetry</div>
          <div>Time elapsed: <span className="text-slate-100 font-bold">{simTime.toFixed(2)} s</span></div>
          <div>Velocity: <span className="text-amber-400 font-bold">{currentSpeed.toFixed(2)} m/s</span></div>
          <div>Position: <span className="text-slate-300">({currentPos.x.toFixed(1)}m, {currentPos.y.toFixed(1)}m)</span></div>
        </div>

        {/* Energetics Gauge Overlay */}
        <div className="absolute top-3 right-3 px-3.5 py-2 rounded-lg bg-slate-900/90 border border-slate-700/80 font-mono text-xs text-slate-200 backdrop-blur-sm space-y-1 shadow-md">
          <div className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider">Energetics</div>
          <div>Kinetic (KE): <span className="text-cyan-300">{ke.toFixed(1)} J</span></div>
          <div>Potential (PE): <span className="text-emerald-300">{pe.toFixed(1)} J</span></div>
          <div>Total: <span className="text-slate-100 font-bold">{(ke + pe).toFixed(1)} J</span></div>
        </div>
      </div>

      {/* Trajectory Result Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 font-mono">
          <span className="text-[10px] uppercase text-slate-500 block">Peak Altitude (H_max)</span>
          <span className="text-base font-bold text-cyan-400">{maxHeight.toFixed(2)} m</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 font-mono">
          <span className="text-[10px] uppercase text-slate-500 block">Horizontal Range (R)</span>
          <span className="text-base font-bold text-emerald-400">{maxRange.toFixed(2)} m</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 font-mono">
          <span className="text-[10px] uppercase text-slate-500 block">Flight Duration</span>
          <span className="text-base font-bold text-amber-400">{simTime.toFixed(2)} s</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 font-mono">
          <span className="text-[10px] uppercase text-slate-500 block">Environment</span>
          <span className="text-base font-bold text-slate-200">{body.name.split(' ')[0]}</span>
        </div>
      </div>

      {/* Physics Controls Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-800 text-xs">
        {/* Launch velocity & angle */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-slate-300 font-semibold">Initial Velocity (v₀):</span>
              <span className="font-mono text-cyan-400 font-bold">{velocity} m/s</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              value={velocity}
              onChange={e => setVelocity(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-slate-300 font-semibold">Launch Angle (θ):</span>
              <span className="font-mono text-cyan-400 font-bold">{angleDeg}°</span>
            </div>
            <input
              type="range"
              min="5"
              max="85"
              value={angleDeg}
              onChange={e => setAngleDeg(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Mass & Height */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-slate-300 font-semibold">Projectile Mass (m):</span>
              <span className="font-mono text-cyan-400 font-bold">{mass} kg</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="10"
              step="0.1"
              value={mass}
              onChange={e => setMass(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-slate-300 font-semibold">Launch Elevation (y₀):</span>
              <span className="font-mono text-cyan-400 font-bold">{launchHeight} m</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={launchHeight}
              onChange={e => setLaunchHeight(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Atmosphere & Drag */}
        <div className="space-y-3">
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Planetary Gravity Field:</label>
            <select
              value={selectedBodyIdx}
              onChange={e => setSelectedBodyIdx(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 font-medium focus:outline-none"
            >
              {CELESTIAL_BODIES.map((b, i) => (
                <option key={b.name} value={i}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-slate-300 font-semibold flex items-center gap-1.5">
              <Wind className="w-3.5 h-3.5 text-cyan-400" />
              Air Drag Model (F_d = ½ρC_dAv²):
            </span>
            <button
              onClick={() => setEnableDrag(!enableDrag)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${enableDrag ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}
            >
              {enableDrag ? 'Active' : 'Vacuum'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectileSimulation;
