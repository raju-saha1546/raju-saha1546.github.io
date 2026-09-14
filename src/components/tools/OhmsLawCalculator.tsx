import React, { useState, useMemo } from 'react';
import { Zap, Copy, Check, RotateCcw } from 'lucide-react';
import MathView from '../common/MathView';

export const OhmsLawCalculator: React.FC = () => {
  // We can let user pick which two are known, or directly enter any 2 of V, I, R, P
  const [voltageStr, setVoltageStr] = useState<string>('5');
  const [voltageUnit, setVoltageUnit] = useState<number>(1); // 1 = V, 0.001 = mV, 1000 = kV

  const [currentStr, setCurrentStr] = useState<string>('0.02');
  const [currentUnit, setCurrentUnit] = useState<number>(1); // 1 = A, 0.001 = mA, 1e-6 = uA

  const [resistanceStr, setResistanceStr] = useState<string>('250');
  const [resistanceUnit, setResistanceUnit] = useState<number>(1); // 1 = Ohm, 1000 = kOhm, 1e6 = MOhm

  const [powerStr, setPowerStr] = useState<string>('0.1');
  const [powerUnit, setPowerUnit] = useState<number>(1); // 1 = W, 0.001 = mW

  // Which variable is active/target: 'solve-v' | 'solve-i' | 'solve-r' | 'solve-p'
  const [target, setTarget] = useState<'solve-v' | 'solve-i' | 'solve-r' | 'solve-p'>('solve-v');
  const [copied, setCopied] = useState(false);

  // Compute based on target and inputs
  const result = useMemo(() => {
    try {
      const vRaw = parseFloat(voltageStr) * voltageUnit;
      const iRaw = parseFloat(currentStr) * currentUnit;
      const rRaw = parseFloat(resistanceStr) * resistanceUnit;
      const pRaw = parseFloat(powerStr) * powerUnit;

      let v = 0;
      let i = 0;
      let r = 0;
      let p = 0;
      let formulaUsed = '';
      let error = '';

      if (target === 'solve-v') {
        // Known: I and R (or P and I, or P and R)
        if (iRaw > 0 && rRaw > 0) {
          v = iRaw * rRaw;
          p = v * iRaw;
          i = iRaw;
          r = rRaw;
          formulaUsed = 'V = I \\cdot R, \\quad P = I^2 \\cdot R';
        } else {
          error = 'Please enter positive values for Current (I) and Resistance (R)';
        }
      } else if (target === 'solve-i') {
        // Known: V and R
        if (vRaw > 0 && rRaw > 0) {
          i = vRaw / rRaw;
          p = (vRaw * vRaw) / rRaw;
          v = vRaw;
          r = rRaw;
          formulaUsed = 'I = \\frac{V}{R}, \\quad P = \\frac{V^2}{R}';
        } else {
          error = 'Please enter positive values for Voltage (V) and Resistance (R)';
        }
      } else if (target === 'solve-r') {
        // Known: V and I
        if (vRaw > 0 && iRaw > 0) {
          r = vRaw / iRaw;
          p = vRaw * iRaw;
          v = vRaw;
          i = iRaw;
          formulaUsed = 'R = \\frac{V}{I}, \\quad P = V \\cdot I';
        } else {
          error = 'Please enter positive values for Voltage (V) and Current (I)';
        }
      } else if (target === 'solve-p') {
        // Known: V and I
        if (vRaw > 0 && iRaw > 0) {
          p = vRaw * iRaw;
          r = vRaw / iRaw;
          v = vRaw;
          i = iRaw;
          formulaUsed = 'P = V \\cdot I = I^2 \\cdot R';
        } else {
          error = 'Please enter positive values for Voltage (V) and Current (I)';
        }
      }

      return { v, i, r, p, formulaUsed, error };
    } catch {
      return { v: 0, i: 0, r: 0, p: 0, formulaUsed: '', error: 'Calculation error' };
    }
  }, [target, voltageStr, voltageUnit, currentStr, currentUnit, resistanceStr, resistanceUnit, powerStr, powerUnit]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const formatNumber = (num: number, unitStr: string) => {
    if (num === 0) return `0 ${unitStr}`;
    if (num < 0.001) return `${(num * 1e6).toFixed(3)} μ${unitStr}`;
    if (num < 1) return `${(num * 1e3).toFixed(3)} m${unitStr}`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(3)} M${unitStr}`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(3)} k${unitStr}`;
    return `${num.toFixed(3)} ${unitStr}`;
  };

  return (
    <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-5 md:p-8 backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h3 className="text-xl font-bold font-display text-slate-100 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            Ohm's Law & Electric Power Solver
          </h3>
          <p className="text-xs text-slate-400 mt-1">Fundamental DC circuit solver with live schematic and power dissipation metrics</p>
        </div>

        {/* Target Variable Selector */}
        <div className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 p-1 text-xs font-semibold">
          <span className="text-slate-400 px-2">Solve for:</span>
          {[
            { id: 'solve-v', label: 'Voltage (V)' },
            { id: 'solve-i', label: 'Current (I)' },
            { id: 'solve-r', label: 'Resistance (R)' },
            { id: 'solve-p', label: 'Power (P)' }
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => setTarget(opt.id as any)}
              className={`px-3 py-1.5 rounded-md transition ${target === opt.id ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-4">
          {/* Voltage Input (disabled if solving for V) */}
          <div className={`p-3.5 rounded-xl border transition ${target === 'solve-v' ? 'border-cyan-500/50 bg-cyan-950/20' : 'border-slate-800 bg-slate-950/60'}`}>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                Voltage (V)
              </label>
              {target === 'solve-v' && <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">Solving Output</span>}
            </div>
            <div className="flex rounded-lg overflow-hidden border border-slate-700 bg-slate-900">
              <input
                type="number"
                step="any"
                disabled={target === 'solve-v'}
                value={target === 'solve-v' ? (result.v / voltageUnit).toFixed(4) : voltageStr}
                onChange={e => setVoltageStr(e.target.value)}
                className={`w-full px-3 py-2 text-sm font-mono focus:outline-none ${target === 'solve-v' ? 'text-cyan-300 font-bold bg-slate-900/50' : 'text-slate-100 bg-transparent'}`}
                placeholder="Enter Voltage"
              />
              <select
                value={voltageUnit}
                onChange={e => setVoltageUnit(Number(e.target.value))}
                className="bg-slate-800 text-slate-200 text-xs px-2.5 font-mono border-l border-slate-700 focus:outline-none"
              >
                <option value={0.001}>mV</option>
                <option value={1}>V</option>
                <option value={1000}>kV</option>
              </select>
            </div>
          </div>

          {/* Current Input (disabled if solving for I) */}
          <div className={`p-3.5 rounded-xl border transition ${target === 'solve-i' ? 'border-cyan-500/50 bg-cyan-950/20' : 'border-slate-800 bg-slate-950/60'}`}>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Current (I)
              </label>
              {target === 'solve-i' && <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">Solving Output</span>}
            </div>
            <div className="flex rounded-lg overflow-hidden border border-slate-700 bg-slate-900">
              <input
                type="number"
                step="any"
                disabled={target === 'solve-i'}
                value={target === 'solve-i' ? (result.i / currentUnit).toFixed(4) : currentStr}
                onChange={e => setCurrentStr(e.target.value)}
                className={`w-full px-3 py-2 text-sm font-mono focus:outline-none ${target === 'solve-i' ? 'text-cyan-300 font-bold bg-slate-900/50' : 'text-slate-100 bg-transparent'}`}
                placeholder="Enter Current"
              />
              <select
                value={currentUnit}
                onChange={e => setCurrentUnit(Number(e.target.value))}
                className="bg-slate-800 text-slate-200 text-xs px-2.5 font-mono border-l border-slate-700 focus:outline-none"
              >
                <option value={0.000001}>μA</option>
                <option value={0.001}>mA</option>
                <option value={1}>A</option>
              </select>
            </div>
          </div>

          {/* Resistance Input (disabled if solving for R) */}
          <div className={`p-3.5 rounded-xl border transition ${target === 'solve-r' ? 'border-cyan-500/50 bg-cyan-950/20' : 'border-slate-800 bg-slate-950/60'}`}>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-violet-400"></span>
                Resistance (R)
              </label>
              {target === 'solve-r' && <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">Solving Output</span>}
            </div>
            <div className="flex rounded-lg overflow-hidden border border-slate-700 bg-slate-900">
              <input
                type="number"
                step="any"
                disabled={target === 'solve-r'}
                value={target === 'solve-r' ? (result.r / resistanceUnit).toFixed(4) : resistanceStr}
                onChange={e => setResistanceStr(e.target.value)}
                className={`w-full px-3 py-2 text-sm font-mono focus:outline-none ${target === 'solve-r' ? 'text-cyan-300 font-bold bg-slate-900/50' : 'text-slate-100 bg-transparent'}`}
                placeholder="Enter Resistance"
              />
              <select
                value={resistanceUnit}
                onChange={e => setResistanceUnit(Number(e.target.value))}
                className="bg-slate-800 text-slate-200 text-xs px-2.5 font-mono border-l border-slate-700 focus:outline-none"
              >
                <option value={1}>Ω</option>
                <option value={1000}>kΩ</option>
                <option value={1000000}>MΩ</option>
              </select>
            </div>
          </div>

          {/* Power Input / Display */}
          <div className={`p-3.5 rounded-xl border transition ${target === 'solve-p' ? 'border-cyan-500/50 bg-cyan-950/20' : 'border-slate-800 bg-slate-950/60'}`}>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                Dissipated Power (P)
              </label>
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">Thermal Dissipation</span>
            </div>
            <div className="flex rounded-lg overflow-hidden border border-slate-700 bg-slate-900">
              <input
                type="text"
                disabled
                value={(result.p / powerUnit).toFixed(4)}
                className="w-full px-3 py-2 text-sm font-mono text-amber-300 font-bold bg-slate-900/50 focus:outline-none"
              />
              <select
                value={powerUnit}
                onChange={e => setPowerUnit(Number(e.target.value))}
                className="bg-slate-800 text-slate-200 text-xs px-2.5 font-mono border-l border-slate-700 focus:outline-none"
              >
                <option value={0.000001}>μW</option>
                <option value={0.001}>mW</option>
                <option value={1}>W</option>
                <option value={1000}>kW</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right: Circuit Schematic & Results Dashboard */}
        <div className="lg:col-span-6 flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950/80 p-5">
          {/* Circuit Graphic */}
          <div className="relative w-full h-44 border border-slate-800/80 rounded-lg bg-[#060910] flex items-center justify-center p-4 overflow-hidden">
            <div className="absolute inset-0 scientific-grid-dense opacity-40"></div>

            <svg viewBox="0 0 320 140" className="w-full h-full max-w-xs relative z-10">
              {/* Loop wires */}
              <rect x="50" y="30" width="220" height="80" fill="none" stroke="#475569" strokeWidth="2.5" rx="4" />

              {/* DC Voltage Source (Left branch) */}
              <g transform="translate(50, 70)">
                <circle cx="0" cy="0" r="16" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
                <line x1="-8" y1="-5" x2="8" y2="-5" stroke="#38bdf8" strokeWidth="2.5" />
                <line x1="-4" y1="5" x2="4" y2="5" stroke="#38bdf8" strokeWidth="2.5" />
                <text x="-26" y="4" fill="#38bdf8" fontSize="10" fontFamily="Fira Code" fontWeight="bold">V</text>
              </g>

              {/* Resistor (Top branch) */}
              <g transform="translate(160, 30)">
                <rect x="-24" y="-10" width="48" height="20" fill="#1e293b" stroke="#a855f7" strokeWidth="2" rx="3" />
                {/* Resistor zigzag inside */}
                <path d="M -18 0 L -12 -5 L -6 5 L 0 -5 L 6 5 L 12 -5 L 18 0" fill="none" stroke="#e2e8f0" strokeWidth="1.5" />
                <text x="-8" y="-14" fill="#c084fc" fontSize="10" fontFamily="Fira Code" fontWeight="bold">R</text>
              </g>

              {/* Current Direction Arrow (Bottom branch) */}
              <g transform="translate(160, 110)">
                <line x1="20" y1="0" x2="-20" y2="0" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow)" />
                <polygon points="-24,0 -16,-4 -16,4" fill="#10b981" />
                <text x="-6" y="18" fill="#34d399" fontSize="10" fontFamily="Fira Code" fontWeight="bold">I</text>
              </g>

              {/* Real-time value overlays */}
              <text x="50" y="20" fill="#06b6d4" fontSize="9" textAnchor="middle" fontFamily="Fira Code">{formatNumber(result.v, 'V')}</text>
              <text x="160" y="16" fill="#c084fc" fontSize="9" textAnchor="middle" fontFamily="Fira Code">{formatNumber(result.r, 'Ω')}</text>
              <text x="160" y="134" fill="#10b981" fontSize="9" textAnchor="middle" fontFamily="Fira Code">{formatNumber(result.i, 'A')}</text>
            </svg>
          </div>

          {/* Results Summary Box */}
          <div className="mt-4 p-4 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono">Active Model:</span>
              <span className="font-mono text-cyan-400">{result.formulaUsed}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
              <div>
                <span className="text-[11px] text-slate-400 block">Calculated Power:</span>
                <span className="text-lg font-mono font-bold text-amber-400">
                  {formatNumber(result.p, 'W')}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Energy Rate:</span>
                <span className="text-lg font-mono font-bold text-slate-200">
                  {result.p > 0 ? (result.p * 3600 / 1000).toFixed(2) + ' kJ/hr' : '0.00 kJ/hr'}
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center text-xs text-slate-400">
              <span>Standard 1/4W resistor safety:</span>
              <span className={`font-mono font-bold ${result.p < 0.25 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {result.p < 0.25 ? '✓ Safe (< 250 mW)' : '⚠ Exceeds 250 mW (Requires power resistor)'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OhmsLawCalculator;
