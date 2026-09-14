import React, { useState, useRef, useEffect, useCallback } from 'react';
import { TrendingUp, ZoomIn, ZoomOut, RotateCcw, Download, Plus, Trash2, Eye } from 'lucide-react';

interface FunctionCurve {
  id: string;
  name: string;
  expression: string;
  color: string;
  visible: boolean;
}

const PRESET_FUNCTIONS = [
  { name: 'Damped Oscillator', expr: 'exp(-0.2*x) * cos(3*x)', desc: 'Underdamped harmonic motion' },
  { name: 'Gaussian Wave Packet', expr: 'exp(-0.5*x*x) * cos(4*x)', desc: 'Localized quantum matter wave' },
  { name: 'Diffraction Sinc', expr: 'sin(x) / x', desc: 'Single-slit optical diffraction intensity' },
  { name: 'Morse Potential', expr: '(1 - exp(-0.8*x))^2', desc: 'Anharmonic diatomic molecular bonding' },
  { name: 'Fermi-Dirac Step', expr: '1 / (exp((x - 2) / 0.3) + 1)', desc: 'Fermion thermal energy distribution' }
];

const PALETTE = ['#06b6d4', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6', '#3b82f6'];

export const ScientificPlotter: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Function expressions list
  const [functions, setFunctions] = useState<FunctionCurve[]>([
    { id: 'f1', name: 'f(x)', expression: 'sin(x)', color: '#06b6d4', visible: true },
    { id: 'f2', name: 'g(x)', expression: 'exp(-0.2*x) * cos(2*x)', color: '#10b981', visible: true }
  ]);

  // Viewport boundaries
  const [xMin, setXMin] = useState<number>(-10);
  const [xMax, setXMax] = useState<number>(10);
  const [yMin, setYMin] = useState<number>(-3);
  const [yMax, setYMax] = useState<number>(3);

  // Crosshair coordinates
  const [hoverCoords, setHoverCoords] = useState<{ x: number; y: number } | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);

  // Evaluate expression safely
  const evaluateExpr = (expr: string, x: number): number => {
    try {
      // Replace scientific terms with Math.*
      let sanitized = expr
        .replace(/\^/g, '**')
        .replace(/\bsin\b/g, 'Math.sin')
        .replace(/\bcos\b/g, 'Math.cos')
        .replace(/\btan\b/g, 'Math.tan')
        .replace(/\basin\b/g, 'Math.asin')
        .replace(/\bacos\b/g, 'Math.acos')
        .replace(/\batan\b/g, 'Math.atan')
        .replace(/\bsqrt\b/g, 'Math.sqrt')
        .replace(/\bexp\b/g, 'Math.exp')
        .replace(/\bln\b/g, 'Math.log')
        .replace(/\blog\b/g, 'Math.log10')
        .replace(/\babs\b/g, 'Math.abs')
        .replace(/\bpi\b/gi, 'Math.PI')
        .replace(/\be\b/g, 'Math.E');

      // Simple security check: only allowed characters
      if (/[^0-9+\-*/()., MathPIEexpsicotanblg]/.test(sanitized)) {
        return NaN;
      }

      // eslint-disable-next-line no-new-func
      const fn = new Function('x', `return ${sanitized};`);
      const val = fn(x);
      return typeof val === 'number' && !isNaN(val) && isFinite(val) ? val : NaN;
    } catch {
      return NaN;
    }
  };

  // Render canvas
  const drawPlot = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI
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

    // Transform math coords to screen coords
    const toScreenX = (x: number) => ((x - xMin) / (xMax - xMin)) * width;
    const toScreenY = (y: number) => height - ((y - yMin) / (yMax - yMin)) * height;

    // Draw grid
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.08)';

    // Vertical grid lines
    const xRange = xMax - xMin;
    let xStep = Math.pow(10, Math.floor(Math.log10(xRange / 5)));
    if (xRange / xStep > 15) xStep *= 2;
    const firstX = Math.ceil(xMin / xStep) * xStep;

    ctx.fillStyle = '#64748b';
    ctx.font = '10px Fira Code, monospace';

    for (let x = firstX; x <= xMax; x += xStep) {
      const sx = toScreenX(x);
      ctx.beginPath();
      ctx.moveTo(sx, 0);
      ctx.lineTo(sx, height);
      ctx.stroke();
      if (Math.abs(x) > 1e-6) {
        ctx.fillText(x.toFixed(xStep < 1 ? 2 : 0), sx + 4, height - 6);
      }
    }

    // Horizontal grid lines
    const yRange = yMax - yMin;
    let yStep = Math.pow(10, Math.floor(Math.log10(yRange / 5)));
    if (yRange / yStep > 15) yStep *= 2;
    const firstY = Math.ceil(yMin / yStep) * yStep;

    for (let y = firstY; y <= yMax; y += yStep) {
      const sy = toScreenY(y);
      ctx.beginPath();
      ctx.moveTo(0, sy);
      ctx.lineTo(width, sy);
      ctx.stroke();
      if (Math.abs(y) > 1e-6) {
        ctx.fillText(y.toFixed(yStep < 1 ? 2 : 0), 6, sy - 4);
      }
    }

    // Draw main axes (x=0 and y=0)
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';

    // Y axis (x=0)
    if (xMin <= 0 && xMax >= 0) {
      const sx0 = toScreenX(0);
      ctx.beginPath();
      ctx.moveTo(sx0, 0);
      ctx.lineTo(sx0, height);
      ctx.stroke();
    }

    // X axis (y=0)
    if (yMin <= 0 && yMax >= 0) {
      const sy0 = toScreenY(0);
      ctx.beginPath();
      ctx.moveTo(0, sy0);
      ctx.lineTo(width, sy0);
      ctx.stroke();
    }

    // Plot curves
    functions.forEach(fn => {
      if (!fn.visible || !fn.expression.trim()) return;

      ctx.lineWidth = 2.2;
      ctx.strokeStyle = fn.color;
      ctx.beginPath();

      const numPoints = Math.min(width * 2, 800);
      let isDrawing = false;

      for (let i = 0; i <= numPoints; i++) {
        const x = xMin + (i / numPoints) * (xMax - xMin);
        const y = evaluateExpr(fn.expression, x);

        if (isNaN(y) || Math.abs(y) > 1e6) {
          isDrawing = false;
          continue;
        }

        const sx = toScreenX(x);
        const sy = toScreenY(y);

        if (!isDrawing) {
          ctx.moveTo(sx, sy);
          isDrawing = true;
        } else {
          ctx.lineTo(sx, sy);
        }
      }
      ctx.stroke();
    });

    // Draw crosshair cursor if hovering
    if (hoverCoords) {
      const sx = toScreenX(hoverCoords.x);
      const sy = toScreenY(hoverCoords.y);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);

      ctx.beginPath();
      ctx.moveTo(sx, 0);
      ctx.lineTo(sx, height);
      ctx.moveTo(0, sy);
      ctx.lineTo(width, sy);
      ctx.stroke();
      ctx.setLineDash([]);

      // Point circle
      ctx.fillStyle = '#06b6d4';
      ctx.beginPath();
      ctx.arc(sx, sy, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [functions, xMin, xMax, yMin, yMax, hoverCoords]);

  useEffect(() => {
    drawPlot();
  }, [drawPlot]);

  // Handle canvas mouse move for crosshair coordinates
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const mathX = xMin + (px / rect.width) * (xMax - xMin);
    const mathY = yMin + ((rect.height - py) / rect.height) * (yMax - yMin);
    setHoverCoords({ x: mathX, y: mathY });
  };

  const handleMouseLeave = () => {
    setHoverCoords(null);
  };

  const zoom = (factor: number) => {
    const xCenter = (xMin + xMax) / 2;
    const xSpan = (xMax - xMin) * factor;
    const yCenter = (yMin + yMax) / 2;
    const ySpan = (yMax - yMin) * factor;

    setXMin(xCenter - xSpan / 2);
    setXMax(xCenter + xSpan / 2);
    setYMin(yCenter - ySpan / 2);
    setYMax(yCenter + ySpan / 2);
  };

  const resetView = () => {
    setXMin(-10);
    setXMax(10);
    setYMin(-3);
    setYMax(3);
  };

  const addFunction = () => {
    const nextIdx = functions.length + 1;
    const newColor = PALETTE[functions.length % PALETTE.length];
    setFunctions([
      ...functions,
      { id: `f${Date.now()}`, name: `y${nextIdx}`, expression: 'cos(x)', color: newColor, visible: true }
    ]);
  };

  const updateFunction = (id: string, updates: Partial<FunctionCurve>) => {
    setFunctions(functions.map(fn => fn.id === id ? { ...fn, ...updates } : fn));
  };

  const removeFunction = (id: string) => {
    if (functions.length <= 1) return;
    setFunctions(functions.filter(fn => fn.id !== id));
  };

  const exportCanvasImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'scientific-plot.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-5 md:p-8 backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h3 className="text-xl font-bold font-display text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            Scientific Function Plotter
          </h3>
          <p className="text-xs text-slate-400 mt-1">Multi-expression analytical graphing with coordinate inspection and vector bounds</p>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => zoom(0.7)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => zoom(1.4)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={resetView}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={exportCanvasImage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/20 text-xs font-semibold transition"
          >
            <Download className="w-3.5 h-3.5" />
            Export PNG
          </button>
        </div>
      </div>

      {/* Preset Quick Loader */}
      <div className="my-4 flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
        <span className="text-xs text-slate-400 whitespace-nowrap">Physics Presets:</span>
        {PRESET_FUNCTIONS.map(preset => (
          <button
            key={preset.name}
            onClick={() => {
              setFunctions([
                { id: 'f1', name: preset.name, expression: preset.expr, color: '#06b6d4', visible: true }
              ]);
            }}
            className="px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-cyan-300 text-xs whitespace-nowrap transition"
            title={preset.desc}
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Main Canvas & Inspection Bar */}
      <div className="relative rounded-xl border border-slate-800 overflow-hidden bg-[#060911] shadow-2xl">
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full h-80 sm:h-96 block cursor-crosshair"
        />

        {/* Live Coordinate Overlay */}
        <div className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700/80 font-mono text-xs text-slate-200 backdrop-blur-sm shadow-md">
          {hoverCoords ? (
            <span>
              x: <span className="text-cyan-400 font-bold">{hoverCoords.x.toFixed(3)}</span>, y:{' '}
              <span className="text-emerald-400 font-bold">{hoverCoords.y.toFixed(3)}</span>
            </span>
          ) : (
            <span className="text-slate-500">Hover over canvas to inspect (x, y)</span>
          )}
        </div>
      </div>

      {/* Function Curves Editor */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Functions (y = f(x))</span>
          <button
            onClick={addFunction}
            className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-medium"
          >
            <Plus className="w-3.5 h-3.5" /> Add Function
          </button>
        </div>

        <div className="space-y-2.5">
          {functions.map(fn => (
            <div key={fn.id} className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-800 bg-slate-950/60">
              <input
                type="color"
                value={fn.color}
                onChange={e => updateFunction(fn.id, { color: e.target.value })}
                className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent"
                title="Change curve color"
              />

              <span className="font-mono text-xs font-bold text-slate-300 min-w-10">{fn.name} =</span>

              <input
                type="text"
                value={fn.expression}
                onChange={e => updateFunction(fn.id, { expression: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 font-mono text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
                placeholder="e.g. sin(x), x^2 - 4, exp(-x)"
              />

              <button
                onClick={() => updateFunction(fn.id, { visible: !fn.visible })}
                className={`p-1.5 rounded text-xs transition ${fn.visible ? 'text-cyan-400' : 'text-slate-600'}`}
                title="Toggle visibility"
              >
                <Eye className="w-4 h-4" />
              </button>

              {functions.length > 1 && (
                <button
                  onClick={() => removeFunction(fn.id)}
                  className="p-1.5 text-slate-500 hover:text-rose-400 transition"
                  title="Delete curve"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Axis Ranges & Syntax Cheat Sheet */}
      <div className="mt-6 pt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-400">
        <div>
          <span className="font-semibold text-slate-300 block mb-2">Adjust Viewport Extents</span>
          <div className="grid grid-cols-4 gap-2 font-mono">
            <div>
              <label className="text-[10px] text-slate-500 block">X Min</label>
              <input
                type="number"
                value={xMin}
                onChange={e => setXMin(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 block">X Max</label>
              <input
                type="number"
                value={xMax}
                onChange={e => setXMax(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 block">Y Min</label>
              <input
                type="number"
                value={yMin}
                onChange={e => setYMin(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 block">Y Max</label>
              <input
                type="number"
                value={yMax}
                onChange={e => setYMax(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200"
              />
            </div>
          </div>
        </div>

        <div>
          <span className="font-semibold text-slate-300 block mb-2">Supported Math Operators</span>
          <p className="font-mono text-[11px] leading-relaxed text-slate-400">
            <span className="text-cyan-400">sin, cos, tan, asin, acos, atan, sqrt, exp, ln, log, abs, pi, e</span>
            <br />
            Example: <code className="text-slate-200">2 * sin(3 * x) * exp(-0.1 * x)</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScientificPlotter;
