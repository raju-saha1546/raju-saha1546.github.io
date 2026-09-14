import React, { useState, useMemo } from 'react';
import { Layers, Power, ToggleLeft, ToggleRight, Info } from 'lucide-react';

export const ElectronicsSimulator: React.FC = () => {
  const [topology, setTopology] = useState<'series' | 'parallel' | 'voltage-divider'>('series');
  const [supplyVoltage, setSupplyVoltage] = useState<number>(9); // 9V default
  const [r1, setR1] = useState<number>(330);
  const [r2, setR2] = useState<number>(470);
  const [r3, setR3] = useState<number>(1000);
  const [switchClosed, setSwitchClosed] = useState<boolean>(true);
  const [includeLed, setIncludeLed] = useState<boolean>(true);

  // LED forward voltage drop (typically ~2.0V for Red LED)
  const ledVf = 2.0;

  // Circuit calculations
  const circuitState = useMemo(() => {
    if (!switchClosed) {
      return {
        rEq: Infinity,
        iTotal: 0,
        vDrops: [0, 0, 0],
        ledLit: false,
        totalPower: 0
      };
    }

    let rEq = 0;
    let iTotal = 0;
    let vDrops: number[] = [0, 0, 0];
    let effectiveSupply = supplyVoltage;

    if (includeLed) {
      effectiveSupply = Math.max(0, supplyVoltage - ledVf);
    }

    if (topology === 'series') {
      rEq = r1 + r2 + r3;
      iTotal = rEq > 0 ? effectiveSupply / rEq : 0;
      vDrops = [iTotal * r1, iTotal * r2, iTotal * r3];
    } else if (topology === 'parallel') {
      // 1/Req = 1/r1 + 1/r2 + 1/r3
      const invReq = (1 / r1) + (1 / r2) + (1 / r3);
      rEq = invReq > 0 ? 1 / invReq : 0;
      iTotal = rEq > 0 ? effectiveSupply / rEq : 0;
      vDrops = [effectiveSupply, effectiveSupply, effectiveSupply];
    } else {
      // Voltage Divider with R1 & R2
      rEq = r1 + r2;
      iTotal = rEq > 0 ? effectiveSupply / rEq : 0;
      const vOut = (r2 / (r1 + r2)) * effectiveSupply;
      vDrops = [effectiveSupply - vOut, vOut, 0];
    }

    const ledLit = switchClosed && includeLed && supplyVoltage > ledVf && iTotal > 0.001;
    const totalPower = supplyVoltage * iTotal;

    return {
      rEq,
      iTotal,
      vDrops,
      ledLit,
      totalPower
    };
  }, [topology, supplyVoltage, r1, r2, r3, switchClosed, includeLed]);

  const formatAmps = (a: number) => {
    if (a === 0) return '0.0 mA';
    if (a < 0.001) return `${(a * 1e6).toFixed(2)} μA`;
    if (a < 1) return `${(a * 1e3).toFixed(2)} mA`;
    return `${a.toFixed(3)} A`;
  };

  return (
    <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-5 md:p-8 backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h3 className="text-xl font-bold font-display text-slate-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            Educational DC Circuit Simulator
          </h3>
          <p className="text-xs text-slate-400 mt-1">Simulate series, parallel, and divider networks with real-time nodal voltages and LED states</p>
        </div>

        {/* Topology Buttons */}
        <div className="flex rounded-lg border border-slate-700 bg-slate-800/80 p-1 text-xs font-semibold">
          {[
            { id: 'series', label: 'Series Network' },
            { id: 'parallel', label: 'Parallel Network' },
            { id: 'voltage-divider', label: 'Voltage Divider' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTopology(t.id as any)}
              className={`px-3 py-1.5 rounded-md transition ${topology === t.id ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6">
        {/* Schematic Canvas */}
        <div className="lg:col-span-7 rounded-xl border border-slate-800 bg-[#060911] p-6 flex flex-col justify-between relative overflow-hidden shadow-inner">
          <div className="absolute inset-0 scientific-grid opacity-30"></div>

          {/* Circuit Top Status Bar */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSwitchClosed(!switchClosed)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition ${switchClosed ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'}`}
              >
                <Power className="w-3.5 h-3.5" />
                Switch: {switchClosed ? 'CLOSED (ON)' : 'OPEN (OFF)'}
              </button>

              <button
                onClick={() => setIncludeLed(!includeLed)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition ${includeLed ? 'border-amber-500/50 text-amber-300 bg-amber-950/20' : 'border-slate-700 text-slate-400 bg-slate-900'}`}
              >
                LED: {includeLed ? 'Installed' : 'Bypassed'}
              </button>
            </div>

            <span className="text-xs font-mono text-cyan-400">
              Supply: <span className="font-bold text-slate-100">{supplyVoltage} V DC</span>
            </span>
          </div>

          {/* SVG Schematic */}
          <div className="my-6 relative z-10 flex justify-center items-center">
            <svg viewBox="0 0 380 180" className="w-full max-w-md h-48">
              {/* Main loop box */}
              <rect x="40" y="30" width="300" height="120" fill="none" stroke="#475569" strokeWidth="2.5" rx="4" />

              {/* Voltage Source (Left branch) */}
              <g transform="translate(40, 90)">
                <circle cx="0" cy="0" r="16" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
                <line x1="-8" y1="-5" x2="8" y2="-5" stroke="#38bdf8" strokeWidth="2.5" />
                <line x1="-4" y1="5" x2="4" y2="5" stroke="#38bdf8" strokeWidth="2.5" />
                <text x="-28" y="4" fill="#38bdf8" fontSize="10" fontFamily="Fira Code">{supplyVoltage}V</text>
              </g>

              {/* Switch on top left */}
              <g transform="translate(100, 30)">
                <circle cx="-12" cy="0" r="3" fill="#94a3b8" />
                <circle cx="12" cy="0" r="3" fill="#94a3b8" />
                {switchClosed ? (
                  <line x1="-12" y1="0" x2="12" y2="0" stroke="#10b981" strokeWidth="2.5" />
                ) : (
                  <line x1="-12" y1="0" x2="6" y2="-12" stroke="#f43f5e" strokeWidth="2.5" />
                )}
                <text x="-10" y="-12" fill="#94a3b8" fontSize="8" fontFamily="Fira Code">SW1</text>
              </g>

              {/* Series Topology */}
              {topology === 'series' && (
                <>
                  {/* Resistor R1 */}
                  <g transform="translate(180, 30)">
                    <rect x="-18" y="-8" width="36" height="16" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.5" rx="2" />
                    <text x="-12" y="-12" fill="#7dd3fc" fontSize="9" fontFamily="Fira Code">R1: {r1}Ω</text>
                    <text x="-12" y="24" fill="#64748b" fontSize="8" fontFamily="Fira Code">{circuitState.vDrops[0].toFixed(2)}V</text>
                  </g>

                  {/* Resistor R2 */}
                  <g transform="translate(270, 30)">
                    <rect x="-18" y="-8" width="36" height="16" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.5" rx="2" />
                    <text x="-12" y="-12" fill="#7dd3fc" fontSize="9" fontFamily="Fira Code">R2: {r2}Ω</text>
                    <text x="-12" y="24" fill="#64748b" fontSize="8" fontFamily="Fira Code">{circuitState.vDrops[1].toFixed(2)}V</text>
                  </g>

                  {/* Resistor R3 (Right branch) */}
                  <g transform="translate(340, 90)">
                    <rect x="-8" y="-18" width="16" height="36" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.5" rx="2" />
                    <text x="14" y="4" fill="#7dd3fc" fontSize="9" fontFamily="Fira Code">R3: {r3}Ω</text>
                  </g>
                </>
              )}

              {/* Parallel Topology */}
              {topology === 'parallel' && (
                <>
                  {/* Central parallel branches */}
                  <line x1="160" y1="30" x2="160" y2="150" stroke="#475569" strokeWidth="2" />
                  <line x1="250" y1="30" x2="250" y2="150" stroke="#475569" strokeWidth="2" />

                  {/* Branch 1 */}
                  <g transform="translate(160, 90)">
                    <rect x="-8" y="-16" width="16" height="32" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.5" rx="2" />
                    <text x="12" y="4" fill="#7dd3fc" fontSize="8" fontFamily="Fira Code">R1: {r1}Ω</text>
                  </g>

                  {/* Branch 2 */}
                  <g transform="translate(250, 90)">
                    <rect x="-8" y="-16" width="16" height="32" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.5" rx="2" />
                    <text x="12" y="4" fill="#7dd3fc" fontSize="8" fontFamily="Fira Code">R2: {r2}Ω</text>
                  </g>

                  {/* Branch 3 */}
                  <g transform="translate(340, 90)">
                    <rect x="-8" y="-16" width="16" height="32" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.5" rx="2" />
                    <text x="12" y="4" fill="#7dd3fc" fontSize="8" fontFamily="Fira Code">R3: {r3}Ω</text>
                  </g>
                </>
              )}

              {/* Voltage Divider */}
              {topology === 'voltage-divider' && (
                <>
                  <g transform="translate(220, 30)">
                    <rect x="-20" y="-8" width="40" height="16" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.5" rx="2" />
                    <text x="-12" y="-12" fill="#7dd3fc" fontSize="9" fontFamily="Fira Code">R1: {r1}Ω</text>
                  </g>
                  <g transform="translate(340, 90)">
                    <rect x="-8" y="-18" width="16" height="36" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.5" rx="2" />
                    <text x="14" y="0" fill="#7dd3fc" fontSize="9" fontFamily="Fira Code">R2: {r2}Ω</text>
                    <circle cx="28" cy="18" r="4" fill="#f59e0b" />
                    <text x="36" y="22" fill="#fbbf24" fontSize="9" fontFamily="Fira Code" fontWeight="bold">V_out: {circuitState.vDrops[1].toFixed(2)}V</text>
                  </g>
                </>
              )}

              {/* Indicator LED (Bottom branch) */}
              {includeLed && (
                <g transform="translate(190, 150)">
                  <circle
                    cx="0"
                    cy="0"
                    r="12"
                    fill={circuitState.ledLit ? '#ef4444' : '#450a0a'}
                    stroke={circuitState.ledLit ? '#f87171' : '#7f1d1d'}
                    strokeWidth="1.5"
                    className={circuitState.ledLit ? 'animate-pulse' : ''}
                  />
                  {circuitState.ledLit && (
                    <circle cx="0" cy="0" r="22" fill="none" stroke="rgba(239, 68, 68, 0.4)" strokeWidth="2" />
                  )}
                  <text x="-12" y="24" fill={circuitState.ledLit ? '#f87171' : '#64748b'} fontSize="8" fontFamily="Fira Code">
                    LED {circuitState.ledLit ? '(ON)' : '(OFF)'}
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Circuit Metrics Strip */}
          <div className="relative z-10 grid grid-cols-3 gap-2 p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-center font-mono text-xs">
            <div>
              <span className="text-[10px] text-slate-500 block">Equivalent R</span>
              <span className="font-bold text-slate-200">
                {isFinite(circuitState.rEq) ? `${circuitState.rEq.toFixed(1)} Ω` : '∞ (Open)'}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">Total Current</span>
              <span className="font-bold text-emerald-400">{formatAmps(circuitState.iTotal)}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">Power Consumed</span>
              <span className="font-bold text-amber-400">
                {(circuitState.totalPower * 1000).toFixed(1)} mW
              </span>
            </div>
          </div>
        </div>

        {/* Circuit Parameters Controls */}
        <div className="lg:col-span-5 rounded-xl border border-slate-800 bg-slate-950/80 p-5 space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Component Values</h4>

          {/* Supply Voltage Slider */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-slate-300">DC Voltage Source:</span>
              <span className="font-mono text-cyan-400 font-bold">{supplyVoltage} V</span>
            </div>
            <input
              type="range"
              min="1"
              max="24"
              step="0.5"
              value={supplyVoltage}
              onChange={e => setSupplyVoltage(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Resistor 1 */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-slate-300">Resistor R1:</span>
              <span className="font-mono text-cyan-400 font-bold">{r1} Ω</span>
            </div>
            <input
              type="range"
              min="10"
              max="2000"
              step="10"
              value={r1}
              onChange={e => setR1(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Resistor 2 */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-slate-300">Resistor R2:</span>
              <span className="font-mono text-cyan-400 font-bold">{r2} Ω</span>
            </div>
            <input
              type="range"
              min="10"
              max="2000"
              step="10"
              value={r2}
              onChange={e => setR2(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Resistor 3 (if applicable) */}
          {topology !== 'voltage-divider' && (
            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-300">Resistor R3:</span>
                <span className="font-mono text-cyan-400 font-bold">{r3} Ω</span>
              </div>
              <input
                type="range"
                min="10"
                max="2000"
                step="10"
                value={r3}
                onChange={e => setR3(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>
          )}

          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-slate-300">
              <Info className="w-3.5 h-3.5 text-cyan-400" />
              Circuit Insights
            </div>
            <p className="leading-relaxed">
              {topology === 'series' && 'In series, current is identical across all elements while voltage divides proportionally to resistance.'}
              {topology === 'parallel' && 'In parallel, voltage across each branch is identical to source potential while branch currents sum together.'}
              {topology === 'voltage-divider' && 'The unloaded voltage divider ratio is V_out = V_in · [R2 / (R1 + R2)]. Loading impedance will reduce V_out.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectronicsSimulator;
