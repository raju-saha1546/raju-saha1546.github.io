import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Zap, Plus, Minus, RotateCcw, Trash2, Layers } from 'lucide-react';

interface PointCharge {
  id: string;
  x: number;
  y: number;
  q: number; // in nC
}

export const ElectricFieldSimulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Charges array
  const [charges, setCharges] = useState<PointCharge[]>([
    { id: 'c1', x: -80, y: 0, q: 5 }, // +5 nC
    { id: 'c2', x: 80, y: 0, q: -5 }  // -5 nC (Dipole)
  ]);

  const [selectedChargeId, setSelectedChargeId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showVectors, setShowVectors] = useState<boolean>(true);
  const [showPotential, setShowPotential] = useState<boolean>(true);

  // Preset Configurations
  const loadPreset = (type: 'dipole' | 'quadrupole' | 'repelling' | 'capacitor') => {
    if (type === 'dipole') {
      setCharges([
        { id: 'c1', x: -80, y: 0, q: 5 },
        { id: 'c2', x: 80, y: 0, q: -5 }
      ]);
    } else if (type === 'quadrupole') {
      setCharges([
        { id: 'c1', x: -60, y: -60, q: 5 },
        { id: 'c2', x: 60, y: -60, q: -5 },
        { id: 'c3', x: 60, y: 60, q: 5 },
        { id: 'c4', x: -60, y: 60, q: -5 }
      ]);
    } else if (type === 'repelling') {
      setCharges([
        { id: 'c1', x: -70, y: 0, q: 6 },
        { id: 'c2', x: 70, y: 0, q: 6 }
      ]);
    } else {
      // 6 charges forming mini parallel plates
      setCharges([
        { id: 'p1', x: -60, y: -50, q: 4 },
        { id: 'p2', x: -60, y: 0, q: 4 },
        { id: 'p3', x: -60, y: 50, q: 4 },
        { id: 'n1', x: 60, y: -50, q: -4 },
        { id: 'n2', x: 60, y: 0, q: -4 },
        { id: 'n3', x: 60, y: 50, q: -4 }
      ]);
    }
  };

  // Add charge
  const addCharge = (sign: number) => {
    const nextId = `c_${Date.now()}`;
    setCharges([...charges, { id: nextId, x: 0, y: 0, q: sign * 5 }]);
  };

  // Canvas drawing
  const renderField = useCallback(() => {
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

    // Clear
    ctx.fillStyle = '#060911';
    ctx.fillRect(0, 0, w, h);

    const originX = w / 2;
    const originY = h / 2;

    // 1. Draw Equipotential heatmap if enabled
    if (showPotential && charges.length > 0) {
      const step = 6;
      for (let px = 0; px < w; px += step) {
        for (let py = 0; py < h; py += step) {
          const x = px - originX;
          const y = py - originY;

          // V = k * sum(q_i / r_i)
          let v = 0;
          for (const c of charges) {
            const dx = x - c.x;
            const dy = y - c.y;
            const r = Math.sqrt(dx * dx + dy * dy);
            if (r > 6) {
              v += c.q / r;
            }
          }

          // Render subtle colored potential lines
          const clampedV = Math.max(-1.5, Math.min(1.5, v * 15));
          if (Math.abs(clampedV) > 0.08) {
            if (clampedV > 0) {
              ctx.fillStyle = `rgba(239, 68, 68, ${Math.min(0.22, clampedV * 0.15)})`;
            } else {
              ctx.fillStyle = `rgba(59, 130, 246, ${Math.min(0.22, -clampedV * 0.15)})`;
            }
            ctx.fillRect(px, py, step, step);
          }
        }
      }
    }

    // 2. Draw Vector field arrows
    if (showVectors && charges.length > 0) {
      const gridSpacing = 28;
      ctx.lineWidth = 1.2;

      for (let px = gridSpacing; px < w; px += gridSpacing) {
        for (let py = gridSpacing; py < h; py += gridSpacing) {
          const x = px - originX;
          const y = py - originY;

          // E = k * sum(q_i * r_vec / r^3)
          let ex = 0;
          let ey = 0;

          for (const c of charges) {
            const dx = x - c.x;
            const dy = y - c.y;
            const r2 = dx * dx + dy * dy;
            const r = Math.sqrt(r2);
            if (r > 12) {
              const eMag = c.q / (r2 * 0.08 + 1);
              ex += (dx / r) * eMag;
              ey += (dy / r) * eMag;
            }
          }

          const eTotal = Math.sqrt(ex * ex + ey * ey);
          if (eTotal > 0.02) {
            const angle = Math.atan2(ey, ex);
            const arrowLen = Math.min(14, 4 + eTotal * 12);

            ctx.save();
            ctx.translate(px, py);
            ctx.rotate(angle);

            // Intensity color gradient from slate to cyan
            const alpha = Math.min(0.85, 0.2 + eTotal * 0.5);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(-arrowLen / 2, 0);
            ctx.lineTo(arrowLen / 2, 0);
            ctx.lineTo(arrowLen / 2 - 3, -2.5);
            ctx.moveTo(arrowLen / 2, 0);
            ctx.lineTo(arrowLen / 2 - 3, 2.5);
            ctx.stroke();

            ctx.restore();
          }
        }
      }
    }

    // 3. Draw Point Charges
    for (const c of charges) {
      const sx = originX + c.x;
      const sy = originY + c.y;
      const isPos = c.q > 0;

      // Outer glow
      ctx.fillStyle = isPos ? 'rgba(239, 68, 68, 0.25)' : 'rgba(59, 130, 246, 0.25)';
      ctx.beginPath();
      ctx.arc(sx, sy, 20, 0, Math.PI * 2);
      ctx.fill();

      // Charge body
      ctx.fillStyle = isPos ? '#ef4444' : '#3b82f6';
      ctx.beginPath();
      ctx.arc(sx, sy, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Sign text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(isPos ? '+' : '−', sx, sy);

      // Charge magnitude label
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '10px Fira Code';
      ctx.fillText(`${c.q > 0 ? '+' : ''}${c.q} nC`, sx, sy + 22);
    }
  }, [charges, showVectors, showPotential]);

  useEffect(() => {
    renderField();
  }, [renderField]);

  // Drag and drop interaction
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left - rect.width / 2;
    const clickY = e.clientY - rect.top - rect.height / 2;

    // Check hit on any charge
    const hit = charges.find(c => Math.sqrt(Math.pow(c.x - clickX, 2) + Math.pow(c.y - clickY, 2)) < 22);
    if (hit) {
      setSelectedChargeId(hit.id);
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !selectedChargeId) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const curX = e.clientX - rect.left - rect.width / 2;
    const curY = e.clientY - rect.top - rect.height / 2;

    setCharges(prev =>
      prev.map(c => (c.id === selectedChargeId ? { ...c, x: curX, y: curY } : c))
    );
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-5 md:p-8 backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h3 className="text-xl font-bold font-display text-slate-100 flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            Coulomb Field & Equipotential Manifold
          </h3>
          <p className="text-xs text-slate-400 mt-1">Interactive multi-pole electrostatic field vectors with real-time scalar potential field rendering</p>
        </div>

        {/* Presets */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-400 hidden sm:inline">Presets:</span>
          {[
            { id: 'dipole', label: 'Dipole (+/-)' },
            { id: 'quadrupole', label: 'Quadrupole' },
            { id: 'repelling', label: 'Repelling (+/+)' },
            { id: 'capacitor', label: 'Capacitor' }
          ].map(p => (
            <button
              key={p.id}
              onClick={() => loadPreset(p.id as any)}
              className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 hover:text-cyan-300 transition text-[11px]"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Field Canvas */}
      <div className="my-6 relative rounded-xl border border-slate-800 overflow-hidden bg-[#060911] shadow-2xl">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className="w-full h-80 sm:h-96 block cursor-grab active:cursor-grabbing"
        />

        {/* Tool overlay */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <button
            onClick={() => addCharge(1)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold hover:bg-rose-500/30 transition backdrop-blur-sm"
          >
            <Plus className="w-3.5 h-3.5" /> Add +q
          </button>
          <button
            onClick={() => addCharge(-1)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs font-bold hover:bg-blue-500/30 transition backdrop-blur-sm"
          >
            <Minus className="w-3.5 h-3.5" /> Add -q
          </button>
          <button
            onClick={() => setCharges([])}
            className="p-1.5 rounded-lg bg-slate-900/90 text-slate-400 hover:text-rose-400 border border-slate-700 transition"
            title="Clear all charges"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Layer Toggles */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <button
            onClick={() => setShowVectors(!showVectors)}
            className={`text-xs px-2.5 py-1 rounded-lg border transition backdrop-blur-sm ${showVectors ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300' : 'bg-slate-900/80 border-slate-700 text-slate-400'}`}
          >
            Field Vectors: {showVectors ? 'ON' : 'OFF'}
          </button>
          <button
            onClick={() => setShowPotential(!showPotential)}
            className={`text-xs px-2.5 py-1 rounded-lg border transition backdrop-blur-sm ${showPotential ? 'bg-amber-500/20 border-amber-500/50 text-amber-300' : 'bg-slate-900/80 border-slate-700 text-slate-400'}`}
          >
            Potential Map: {showPotential ? 'ON' : 'OFF'}
          </button>
        </div>

        <div className="absolute bottom-3 left-3 text-[11px] font-mono text-slate-400 bg-slate-900/80 px-3 py-1 rounded-lg border border-slate-800">
          💡 Click and drag any charge to see instantaneous electric field reconfiguration
        </div>
      </div>
    </div>
  );
};

export default ElectricFieldSimulation;
