import React, { useState, useMemo, useRef, useEffect } from 'react';
import { FileSpreadsheet, Upload, Download, Sparkles, Check, AlertCircle } from 'lucide-react';

interface DataPoint {
  x: number;
  y: number;
}

const SAMPLE_DATASETS = [
  {
    name: 'Photoelectric Effect (V₀ vs ν)',
    desc: 'Determination of Planck constant h and work function',
    data: `Frequency_Hz,Stopping_Potential_V
5.187e14,0.41
5.490e14,0.54
6.880e14,1.12
7.408e14,1.34
8.214e14,1.66`
  },
  {
    name: 'Pendulum Period (T² vs Length L)',
    desc: 'Determination of local gravitational acceleration g',
    data: `Length_m,PeriodSquared_s2
0.20,0.805
0.40,1.611
0.60,2.417
0.80,3.223
1.00,4.029`
  },
  {
    name: 'RC Capacitor Discharge (V vs t)',
    desc: 'Exponential decay and determination of time constant τ',
    data: `Time_ms,Voltage_V
0.0,5.00
0.2,3.26
0.5,1.72
1.0,0.59
1.5,0.20
2.0,0.07`
  }
];

export const DataAnalysisTool: React.FC = () => {
  const [rawText, setRawText] = useState<string>(SAMPLE_DATASETS[0].data);
  const [fitType, setFitType] = useState<'linear' | 'poly2' | 'exponential' | 'power'>('linear');
  const [dragOver, setDragOver] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Parse CSV/table text into data points
  const parsedData = useMemo(() => {
    try {
      const lines = rawText.trim().split('\n').filter(l => l.trim().length > 0);
      if (lines.length < 2) return { points: [], headers: ['X', 'Y'], error: 'Dataset must have at least 2 rows' };

      const headerLine = lines[0].split(/[,\t\s]+/).map(h => h.trim());
      const points: DataPoint[] = [];

      for (let i = 1; i < lines.length; i++) {
        const parts = lines[i].split(/[,\t\s]+/).map(p => parseFloat(p.trim()));
        if (parts.length >= 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
          points.push({ x: parts[0], y: parts[1] });
        }
      }

      if (points.length < 2) {
        return { points: [], headers: headerLine, error: 'Could not parse sufficient numeric (X, Y) points' };
      }

      return { points, headers: headerLine, error: null };
    } catch {
      return { points: [], headers: ['X', 'Y'], error: 'Malformed CSV or TXT structure' };
    }
  }, [rawText]);

  // Perform regression fitting
  const fitResults = useMemo(() => {
    const { points } = parsedData;
    if (points.length < 2) return null;

    const n = points.length;

    if (fitType === 'linear') {
      // y = mx + c
      let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
      for (const p of points) {
        sumX += p.x;
        sumY += p.y;
        sumXY += p.x * p.y;
        sumX2 += p.x * p.x;
      }
      const denom = n * sumX2 - sumX * sumX;
      if (denom === 0) return null;

      const m = (n * sumXY - sumX * sumY) / denom;
      const c = (sumY - m * sumX) / n;

      // R^2 calculation
      const yMean = sumY / n;
      let ssTot = 0, ssRes = 0;
      for (const p of points) {
        const yPred = m * p.x + c;
        ssTot += Math.pow(p.y - yMean, 2);
        ssRes += Math.pow(p.y - yPred, 2);
      }
      const r2 = ssTot === 0 ? 1 : Math.max(0, 1 - ssRes / ssTot);
      const rmse = Math.sqrt(ssRes / n);

      return {
        equation: `y = (${m.toExponential(4)}) x + (${c.toExponential(4)})`,
        params: [
          { name: 'Slope (m)', value: m.toExponential(4) },
          { name: 'Y-Intercept (c)', value: c.toExponential(4) },
          { name: 'R² (Fit Quality)', value: r2.toFixed(5) },
          { name: 'Residual RMS Error', value: rmse.toExponential(3) }
        ],
        predict: (x: number) => m * x + c,
        r2
      };
    } else if (fitType === 'exponential') {
      // y = a * exp(b * x) -> ln(y) = ln(a) + b * x
      // filter y > 0
      const validPoints = points.filter(p => p.y > 0);
      if (validPoints.length < 2) return null;

      let sumX = 0, sumLnY = 0, sumXLnY = 0, sumX2 = 0;
      const nv = validPoints.length;
      for (const p of validPoints) {
        const lnY = Math.log(p.y);
        sumX += p.x;
        sumLnY += lnY;
        sumXLnY += p.x * lnY;
        sumX2 += p.x * p.x;
      }
      const denom = nv * sumX2 - sumX * sumX;
      if (denom === 0) return null;

      const b = (nv * sumXLnY - sumX * sumLnY) / denom;
      const lnA = (sumLnY - b * sumX) / nv;
      const a = Math.exp(lnA);

      let ssTot = 0, ssRes = 0;
      const yMean = validPoints.reduce((acc, p) => acc + p.y, 0) / nv;
      for (const p of validPoints) {
        const yPred = a * Math.exp(b * p.x);
        ssTot += Math.pow(p.y - yMean, 2);
        ssRes += Math.pow(p.y - yPred, 2);
      }
      const r2 = ssTot === 0 ? 1 : Math.max(0, 1 - ssRes / ssTot);

      return {
        equation: `y = (${a.toExponential(4)}) \\cdot e^{(${b.toExponential(4)}) x}`,
        params: [
          { name: 'Amplitude (a)', value: a.toExponential(4) },
          { name: 'Decay/Growth (b)', value: b.toExponential(4) },
          { name: 'R² (Fit Quality)', value: r2.toFixed(5) }
        ],
        predict: (x: number) => a * Math.exp(b * x),
        r2
      };
    } else {
      // Polynomial Degree 2: y = a x^2 + b x + c
      // Normal equations for parabolic fit
      let s0 = points.length;
      let s1 = 0, s2 = 0, s3 = 0, s4 = 0;
      let t0 = 0, t1 = 0, t2 = 0;

      for (const p of points) {
        const x = p.x;
        const y = p.y;
        s1 += x;
        s2 += x * x;
        s3 += x * x * x;
        s4 += x * x * x * x;
        t0 += y;
        t1 += x * y;
        t2 += x * x * y;
      }

      // Solve 3x3 system via Cramer's rule
      const det3 = (m: number[][]) =>
        m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
        m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
        m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);

      const M = [
        [s4, s3, s2],
        [s3, s2, s1],
        [s2, s1, s0]
      ];
      const D = det3(M);
      if (Math.abs(D) < 1e-18) return null;

      const Ma = [
        [t2, s3, s2],
        [t1, s2, s1],
        [t0, s1, s0]
      ];
      const Mb = [
        [s4, t2, s2],
        [s3, t1, s1],
        [s2, t0, s0]
      ];
      const Mc = [
        [s4, s3, t2],
        [s3, s2, t1],
        [s2, s1, t0]
      ];

      const a = det3(Ma) / D;
      const b = det3(Mb) / D;
      const c = det3(Mc) / D;

      const yMean = t0 / s0;
      let ssTot = 0, ssRes = 0;
      for (const p of points) {
        const yPred = a * p.x * p.x + b * p.x + c;
        ssTot += Math.pow(p.y - yMean, 2);
        ssRes += Math.pow(p.y - yPred, 2);
      }
      const r2 = ssTot === 0 ? 1 : Math.max(0, 1 - ssRes / ssTot);

      return {
        equation: `y = (${a.toExponential(3)}) x^2 + (${b.toExponential(3)}) x + (${c.toExponential(3)})`,
        params: [
          { name: 'Quadratic Coeff (a)', value: a.toExponential(4) },
          { name: 'Linear Coeff (b)', value: b.toExponential(4) },
          { name: 'Constant (c)', value: c.toExponential(4) },
          { name: 'R² (Fit Quality)', value: r2.toFixed(5) }
        ],
        predict: (x: number) => a * x * x + b * x + c,
        r2
      };
    }
  }, [parsedData, fitType]);

  // Render canvas plot of data points & fitted curve
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

    ctx.fillStyle = '#060911';
    ctx.fillRect(0, 0, width, height);

    const points = parsedData.points;
    if (points.length < 2) {
      ctx.fillStyle = '#64748b';
      ctx.font = '12px Fira Code';
      ctx.textAlign = 'center';
      ctx.fillText('Please provide at least 2 valid numeric data points to plot', width / 2, height / 2);
      return;
    }

    // Determine bounds
    let minX = Math.min(...points.map(p => p.x));
    let maxX = Math.max(...points.map(p => p.x));
    let minY = Math.min(...points.map(p => p.y));
    let maxY = Math.max(...points.map(p => p.y));

    // Pad bounds by 10%
    const padX = (maxX - minX) * 0.1 || 1;
    const padY = (maxY - minY) * 0.1 || 1;
    minX -= padX;
    maxX += padX;
    minY -= padY;
    maxY += padY;

    const padLeft = 60;
    const padBottom = 40;
    const padTop = 20;
    const padRight = 20;

    const plotW = width - padLeft - padRight;
    const plotH = height - padTop - padBottom;

    const toScreenX = (x: number) => padLeft + ((x - minX) / (maxX - minX)) * plotW;
    const toScreenY = (y: number) => padTop + plotH - ((y - minY) / (maxY - minY)) * plotH;

    // Draw Grid
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.08)';
    ctx.lineWidth = 1;

    for (let i = 0; i <= 5; i++) {
      const gx = padLeft + (i / 5) * plotW;
      ctx.beginPath();
      ctx.moveTo(gx, padTop);
      ctx.lineTo(gx, padTop + plotH);
      ctx.stroke();

      const gy = padTop + (i / 5) * plotH;
      ctx.beginPath();
      ctx.moveTo(padLeft, gy);
      ctx.lineTo(padLeft + plotW, gy);
      ctx.stroke();

      // Axis labels
      const vx = minX + (i / 5) * (maxX - minX);
      const vy = maxY - (i / 5) * (maxY - minY);
      ctx.fillStyle = '#64748b';
      ctx.font = '10px Fira Code';
      ctx.textAlign = 'center';
      ctx.fillText(vx.toExponential(1), gx, height - 12);
      ctx.textAlign = 'right';
      ctx.fillText(vy.toExponential(1), padLeft - 6, gy + 4);
    }

    // Draw fitted curve if available
    if (fitResults && fitResults.predict) {
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2.5;
      ctx.beginPath();

      const steps = 150;
      for (let s = 0; s <= steps; s++) {
        const xVal = minX + (s / steps) * (maxX - minX);
        const yVal = fitResults.predict(xVal);
        const sx = toScreenX(xVal);
        const sy = toScreenY(yVal);

        if (s === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
    }

    // Draw Scatter Points
    for (const p of points) {
      const sx = toScreenX(p.x);
      const sy = toScreenY(p.y);

      // Outer halo
      ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
      ctx.beginPath();
      ctx.arc(sx, sy, 8, 0, Math.PI * 2);
      ctx.fill();

      // Core point
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(sx, sy, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }, [parsedData, fitResults]);

  // Handle file drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => {
        if (typeof ev.target?.result === 'string') {
          setRawText(ev.target.result);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => {
        if (typeof ev.target?.result === 'string') {
          setRawText(ev.target.result);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-5 md:p-8 backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h3 className="text-xl font-bold font-display text-slate-100 flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-cyan-400" />
            Experimental Data Analysis & Curve Fitting
          </h3>
          <p className="text-xs text-slate-400 mt-1">Upload experimental CSV/TXT datasets, execute non-linear regression fits, and inspect residual statistics</p>
        </div>

        {/* Fit Model Selector */}
        <div className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 p-1 text-xs font-semibold">
          <span className="text-slate-400 px-2">Model:</span>
          {[
            { id: 'linear', label: 'Linear (y=mx+c)' },
            { id: 'exponential', label: 'Exponential' },
            { id: 'poly2', label: 'Polynomial 2°' }
          ].map(m => (
            <button
              key={m.id}
              onClick={() => setFitType(m.id as any)}
              className={`px-3 py-1.5 rounded-md transition ${fitType === m.id ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'}`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dataset quick loaders */}
      <div className="my-4 flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
        <span className="text-xs text-slate-400 whitespace-nowrap">Load Laboratory Dataset:</span>
        {SAMPLE_DATASETS.map(ds => (
          <button
            key={ds.name}
            onClick={() => setRawText(ds.data)}
            className="px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-cyan-300 text-xs whitespace-nowrap transition"
            title={ds.desc}
          >
            {ds.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-4">
        {/* Left: Raw Data / File Upload */}
        <div className="lg:col-span-5 space-y-3">
          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-4 text-center transition ${dragOver ? 'border-cyan-400 bg-cyan-950/20' : 'border-slate-700/80 bg-slate-950/60'}`}
          >
            <Upload className="w-5 h-5 mx-auto text-slate-400 mb-1" />
            <p className="text-xs text-slate-300">Drag & drop CSV/TXT file, or{' '}
              <label className="text-cyan-400 hover:underline cursor-pointer">
                browse
                <input type="file" accept=".csv,.txt" onChange={handleFileUpload} className="hidden" />
              </label>
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1 text-xs text-slate-400">
              <span>Raw Data (Comma, Space, or Tab separated):</span>
              <span className="font-mono text-cyan-400">{parsedData.points.length} points parsed</span>
            </div>
            <textarea
              rows={8}
              value={rawText}
              onChange={e => setRawText(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs text-slate-200 focus:outline-none focus:border-cyan-500 leading-relaxed resize-none"
              placeholder="X, Y values per line..."
            />
          </div>

          {parsedData.error && (
            <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800 text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{parsedData.error}</span>
            </div>
          )}
        </div>

        {/* Right: Regression Plot & Fit Statistics */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950/80 p-4">
          {/* Canvas Plot */}
          <div className="relative rounded-lg overflow-hidden border border-slate-800 bg-[#060911]">
            <canvas ref={canvasRef} className="w-full h-64 block" />
          </div>

          {/* Fit Results Box */}
          {fitResults && (
            <div className="mt-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                <span className="text-slate-400">Fitted Model Equation:</span>
                <span className="font-mono font-bold text-cyan-400 text-sm">{fitResults.equation}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                {fitResults.params.map((p, i) => (
                  <div key={i} className="p-2 rounded bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block truncate">{p.name}</span>
                    <span className="text-slate-200 font-bold">{p.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Statistical Determination:</span>
                <span className={`font-mono font-bold ${fitResults.r2 > 0.98 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {fitResults.r2 > 0.98 ? '✓ Excellent Correlation (R² > 0.98)' : 'Moderate Fit'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataAnalysisTool;
