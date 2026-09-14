import React, { useState, useMemo } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

interface BandColor {
  name: string;
  color: string;
  textColor: string;
  digit?: number;
  multiplier?: number;
  tolerance?: number;
  tempCoeff?: number;
}

const COLOR_TABLE: BandColor[] = [
  { name: 'Black', color: '#18181b', textColor: '#ffffff', digit: 0, multiplier: 1 },
  { name: 'Brown', color: '#78350f', textColor: '#ffffff', digit: 1, multiplier: 10, tolerance: 1, tempCoeff: 100 },
  { name: 'Red', color: '#dc2626', textColor: '#ffffff', digit: 2, multiplier: 100, tolerance: 2, tempCoeff: 50 },
  { name: 'Orange', color: '#ea580c', textColor: '#ffffff', digit: 3, multiplier: 1000, tempCoeff: 15 },
  { name: 'Yellow', color: '#eab308', textColor: '#000000', digit: 4, multiplier: 10000, tempCoeff: 25 },
  { name: 'Green', color: '#16a34a', textColor: '#ffffff', digit: 5, multiplier: 100000, tolerance: 0.5 },
  { name: 'Blue', color: '#2563eb', textColor: '#ffffff', digit: 6, multiplier: 1000000, tolerance: 0.25, tempCoeff: 10 },
  { name: 'Violet', color: '#7c3aed', textColor: '#ffffff', digit: 7, multiplier: 10000000, tolerance: 0.1, tempCoeff: 5 },
  { name: 'Gray', color: '#4b5563', textColor: '#ffffff', digit: 8, multiplier: 100000000, tolerance: 0.05 },
  { name: 'White', color: '#f8fafc', textColor: '#000000', digit: 9, multiplier: 1000000000 },
  { name: 'Gold', color: '#d97706', textColor: '#ffffff', multiplier: 0.1, tolerance: 5 },
  { name: 'Silver', color: '#94a3b8', textColor: '#000000', multiplier: 0.01, tolerance: 10 }
];

export const ResistorCalculator: React.FC = () => {
  const [mode, setMode] = useState<'color-to-val' | 'val-to-color'>('color-to-val');
  const [bandCount, setBandCount] = useState<4 | 5 | 6>(4);

  // Band selections for color-to-value
  const [band1, setBand1] = useState<number>(2); // Red (2)
  const [band2, setBand2] = useState<number>(7); // Violet (7)
  const [band3, setBand3] = useState<number>(0); // Black (0) for 5/6 band
  const [multiplierIdx, setMultiplierIdx] = useState<number>(1); // Brown (10^1) -> 270 ohm
  const [toleranceIdx, setToleranceIdx] = useState<number>(10); // Gold (±5%)
  const [tempIdx, setTempIdx] = useState<number>(1); // Brown (100 ppm/K)

  // Input for value-to-color
  const [inputVal, setInputVal] = useState<string>('270');
  const [inputUnit, setInputUnit] = useState<number>(1); // 1, 1000 (k), 1000000 (M)
  const [targetTolerance, setTargetTolerance] = useState<number>(5);
  const [copied, setCopied] = useState(false);

  // Calculate Resistance from bands
  const calculation = useMemo(() => {
    const b1 = COLOR_TABLE[band1];
    const b2 = COLOR_TABLE[band2];
    const mult = COLOR_TABLE[multiplierIdx];
    const tol = COLOR_TABLE[toleranceIdx];
    const temp = COLOR_TABLE[tempIdx];

    let baseVal = 0;
    if (bandCount === 4) {
      baseVal = (b1.digit! * 10) + b2.digit!;
    } else {
      const b3 = COLOR_TABLE[band3];
      baseVal = (b1.digit! * 100) + (b2.digit! * 10) + b3.digit!;
    }

    const resistance = baseVal * (mult.multiplier || 1);
    const tolPercent = tol.tolerance || 5;
    const minVal = resistance * (1 - tolPercent / 100);
    const maxVal = resistance * (1 + tolPercent / 100);

    return {
      resistance,
      tolPercent,
      minVal,
      maxVal,
      tempPpm: bandCount === 6 ? temp.tempCoeff || 100 : undefined
    };
  }, [bandCount, band1, band2, band3, multiplierIdx, toleranceIdx, tempIdx]);

  // Format ohms nicely
  const formatOhms = (val: number) => {
    if (val >= 1e6) {
      return `${(val / 1e6).toFixed(val % 1e6 === 0 ? 0 : 2)} MΩ`;
    }
    if (val >= 1e3) {
      return `${(val / 1e3).toFixed(val % 1e3 === 0 ? 0 : 2)} kΩ`;
    }
    if (val < 1) {
      return `${val.toFixed(2)} Ω`;
    }
    return `${val.toFixed(val % 1 === 0 ? 0 : 2)} Ω`;
  };

  // Convert entered resistance into color bands
  const calculatedBandsFromValue = useMemo(() => {
    const totalOhms = parseFloat(inputVal) * inputUnit;
    if (isNaN(totalOhms) || totalOhms <= 0) return null;

    let str = totalOhms.toExponential();
    const parts = str.split('e');
    let mantissa = parseFloat(parts[0]);
    let exponent = parseInt(parts[1], 10);

    // Adjust mantissa to 2 digits for 4 band, or 3 digits for 5/6 band
    const digitsNeeded = bandCount === 4 ? 2 : 3;
    let factor = Math.pow(10, digitsNeeded - 1);
    let roundedMantissa = Math.round(mantissa * factor) / factor;
    
    // Extract individual digits
    let digitsInt = Math.round(roundedMantissa * factor);
    if (digitsInt >= Math.pow(10, digitsNeeded)) {
      digitsInt = Math.round(digitsInt / 10);
      exponent += 1;
    }

    let digitArray = digitsInt.toString().split('').map(d => parseInt(d, 10));
    while (digitArray.length < digitsNeeded) {
      digitArray.push(0);
    }

    const multPower = exponent - (digitsNeeded - 1);
    const multValue = Math.pow(10, multPower);

    // Find closest multiplier in table
    const multBand = COLOR_TABLE.find(c => Math.abs((c.multiplier || 0) - multValue) < multValue * 0.05) || COLOR_TABLE[0];
    const tolBand = COLOR_TABLE.find(c => c.tolerance === targetTolerance) || COLOR_TABLE[10]; // Gold default

    return {
      digits: digitArray,
      multiplier: multBand,
      tolerance: tolBand,
      actualResistance: totalOhms
    };
  }, [inputVal, inputUnit, bandCount, targetTolerance]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-5 md:p-8 backdrop-blur-md">
      {/* Header with Mode & Band switch */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h3 className="text-xl font-bold font-display text-slate-100 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block shadow-sm shadow-cyan-500"></span>
            Resistor Color Code Calculator
          </h3>
          <p className="text-xs text-slate-400 mt-1">EIA-standard resistor decoding with high-contrast color visualization</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Mode Switch */}
          <div className="flex rounded-lg border border-slate-700 bg-slate-800/80 p-1 text-xs font-medium">
            <button
              onClick={() => setMode('color-to-val')}
              className={`px-3 py-1.5 rounded-md transition-all ${mode === 'color-to-val' ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm' : 'text-slate-300 hover:text-white'}`}
            >
              Color → Resistance
            </button>
            <button
              onClick={() => setMode('val-to-color')}
              className={`px-3 py-1.5 rounded-md transition-all ${mode === 'val-to-color' ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm' : 'text-slate-300 hover:text-white'}`}
            >
              Resistance → Color
            </button>
          </div>

          {/* Band Count Selection */}
          <div className="flex rounded-lg border border-slate-700 bg-slate-800/80 p-1 text-xs font-medium">
            {([4, 5, 6] as const).map(n => (
              <button
                key={n}
                onClick={() => setBandCount(n)}
                className={`px-2.5 py-1.5 rounded-md transition-all ${bandCount === n ? 'bg-slate-700 text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
              >
                {n} Bands
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Resistor Display */}
      <div className="my-6 rounded-xl border border-slate-800 bg-slate-950/70 p-6 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 scientific-grid-dense opacity-40 pointer-events-none"></div>

        {/* Resistor Component Graphic */}
        <div className="relative w-full max-w-md h-24 flex items-center justify-center">
          {/* Wire left */}
          <div className="w-16 h-1.5 bg-slate-400 rounded-l shadow-inner"></div>

          {/* Resistor body */}
          <div className="relative w-72 h-16 bg-[#d1c7b7] rounded-full shadow-lg border border-[#a89b88] flex items-center justify-between px-6 overflow-hidden">
            {/* Ceramic highlight reflection */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-white/20 rounded-t-full pointer-events-none"></div>

            {/* Bands Container */}
            <div className="flex items-center justify-between w-full h-full relative z-10">
              {mode === 'color-to-val' ? (
                <>
                  <div className="w-4 h-full shadow-sm" style={{ backgroundColor: COLOR_TABLE[band1].color }} title={`1st: ${COLOR_TABLE[band1].name}`}></div>
                  <div className="w-4 h-full shadow-sm" style={{ backgroundColor: COLOR_TABLE[band2].color }} title={`2nd: ${COLOR_TABLE[band2].name}`}></div>
                  {bandCount >= 5 && (
                    <div className="w-4 h-full shadow-sm" style={{ backgroundColor: COLOR_TABLE[band3].color }} title={`3rd: ${COLOR_TABLE[band3].name}`}></div>
                  )}
                  <div className="w-4 h-full shadow-sm" style={{ backgroundColor: COLOR_TABLE[multiplierIdx].color }} title={`Mult: ${COLOR_TABLE[multiplierIdx].name}`}></div>
                  <div className="w-4 h-full shadow-sm ml-4" style={{ backgroundColor: COLOR_TABLE[toleranceIdx].color }} title={`Tol: ${COLOR_TABLE[toleranceIdx].name}`}></div>
                  {bandCount === 6 && (
                    <div className="w-4 h-full shadow-sm" style={{ backgroundColor: COLOR_TABLE[tempIdx].color }} title={`Temp: ${COLOR_TABLE[tempIdx].name}`}></div>
                  )}
                </>
              ) : calculatedBandsFromValue ? (
                <>
                  {calculatedBandsFromValue.digits.map((d, i) => (
                    <div
                      key={i}
                      className="w-4 h-full shadow-sm"
                      style={{ backgroundColor: COLOR_TABLE[d].color }}
                      title={`Digit ${i+1}: ${COLOR_TABLE[d].name}`}
                    ></div>
                  ))}
                  <div
                    className="w-4 h-full shadow-sm"
                    style={{ backgroundColor: calculatedBandsFromValue.multiplier.color }}
                    title={`Mult: ${calculatedBandsFromValue.multiplier.name}`}
                  ></div>
                  <div
                    className="w-4 h-full shadow-sm ml-4"
                    style={{ backgroundColor: calculatedBandsFromValue.tolerance.color }}
                    title={`Tol: ${calculatedBandsFromValue.tolerance.name}`}
                  ></div>
                </>
              ) : null}
            </div>
          </div>

          {/* Wire right */}
          <div className="w-16 h-1.5 bg-slate-400 rounded-r shadow-inner"></div>
        </div>

        {/* Primary Result Readout */}
        <div className="mt-4 text-center">
          {mode === 'color-to-val' ? (
            <div>
              <div className="text-3xl font-extrabold font-mono text-cyan-400 tracking-tight flex items-center justify-center gap-2">
                <span>{formatOhms(calculation.resistance)}</span>
                <span className="text-xl text-slate-400 font-normal">±{calculation.tolPercent}%</span>
                <button
                  onClick={() => handleCopy(`${formatOhms(calculation.resistance)} ±${calculation.tolPercent}%`)}
                  className="p-1 text-slate-400 hover:text-cyan-300 transition"
                  title="Copy value"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 mt-2">
                <span>Min: <span className="text-slate-200">{formatOhms(calculation.minVal)}</span></span>
                <span>•</span>
                <span>Max: <span className="text-slate-200">{formatOhms(calculation.maxVal)}</span></span>
                {calculation.tempPpm && (
                  <>
                    <span>•</span>
                    <span>Temp Coeff: <span className="text-slate-200">{calculation.tempPpm} ppm/K</span></span>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div>
              {calculatedBandsFromValue ? (
                <div>
                  <div className="text-3xl font-extrabold font-mono text-cyan-400 tracking-tight">
                    {formatOhms(calculatedBandsFromValue.actualResistance)}
                    <span className="text-xl text-slate-400 font-normal ml-2">±{targetTolerance}%</span>
                  </div>
                  <div className="text-xs font-mono text-slate-400 mt-2 flex flex-wrap items-center justify-center gap-2">
                    {calculatedBandsFromValue.digits.map((d, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200">
                        Band {idx+1}: {COLOR_TABLE[d].name} ({d})
                      </span>
                    ))}
                    <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200">
                      Multiplier: {calculatedBandsFromValue.multiplier.name} (×{calculatedBandsFromValue.multiplier.multiplier})
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200">
                      Tolerance: {calculatedBandsFromValue.tolerance.name} (±{targetTolerance}%)
                    </span>
                  </div>
                </div>
              ) : (
                <span className="text-sm font-mono text-rose-400">Please enter a valid positive resistance value</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Interactive Controls based on mode */}
      {mode === 'color-to-val' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Band 1 */}
          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-3">
            <label className="text-xs font-semibold text-slate-400 block mb-2">1st Band (Digit)</label>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              {COLOR_TABLE.filter(c => c.digit !== undefined && c.digit > 0).map((c) => {
                const idx = COLOR_TABLE.findIndex(t => t.name === c.name);
                return (
                  <button
                    key={c.name}
                    onClick={() => setBand1(idx)}
                    className={`w-full flex items-center justify-between px-2 py-1 rounded text-xs transition ${band1 === idx ? 'ring-2 ring-cyan-400 font-semibold' : 'hover:bg-slate-800'}`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full border border-slate-600" style={{ backgroundColor: c.color }}></span>
                      <span className="text-slate-300">{c.name}</span>
                    </span>
                    <span className="font-mono text-slate-400">{c.digit}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Band 2 */}
          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-3">
            <label className="text-xs font-semibold text-slate-400 block mb-2">2nd Band (Digit)</label>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              {COLOR_TABLE.filter(c => c.digit !== undefined).map((c) => {
                const idx = COLOR_TABLE.findIndex(t => t.name === c.name);
                return (
                  <button
                    key={c.name}
                    onClick={() => setBand2(idx)}
                    className={`w-full flex items-center justify-between px-2 py-1 rounded text-xs transition ${band2 === idx ? 'ring-2 ring-cyan-400 font-semibold' : 'hover:bg-slate-800'}`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full border border-slate-600" style={{ backgroundColor: c.color }}></span>
                      <span className="text-slate-300">{c.name}</span>
                    </span>
                    <span className="font-mono text-slate-400">{c.digit}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Band 3 (for 5 and 6 bands) */}
          {bandCount >= 5 && (
            <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-3">
              <label className="text-xs font-semibold text-slate-400 block mb-2">3rd Band (Digit)</label>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                {COLOR_TABLE.filter(c => c.digit !== undefined).map((c) => {
                  const idx = COLOR_TABLE.findIndex(t => t.name === c.name);
                  return (
                    <button
                      key={c.name}
                      onClick={() => setBand3(idx)}
                      className={`w-full flex items-center justify-between px-2 py-1 rounded text-xs transition ${band3 === idx ? 'ring-2 ring-cyan-400 font-semibold' : 'hover:bg-slate-800'}`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full border border-slate-600" style={{ backgroundColor: c.color }}></span>
                        <span className="text-slate-300">{c.name}</span>
                      </span>
                      <span className="font-mono text-slate-400">{c.digit}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Multiplier */}
          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-3">
            <label className="text-xs font-semibold text-slate-400 block mb-2">Multiplier</label>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              {COLOR_TABLE.filter(c => c.multiplier !== undefined).map((c) => {
                const idx = COLOR_TABLE.findIndex(t => t.name === c.name);
                return (
                  <button
                    key={c.name}
                    onClick={() => setMultiplierIdx(idx)}
                    className={`w-full flex items-center justify-between px-2 py-1 rounded text-xs transition ${multiplierIdx === idx ? 'ring-2 ring-cyan-400 font-semibold' : 'hover:bg-slate-800'}`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full border border-slate-600" style={{ backgroundColor: c.color }}></span>
                      <span className="text-slate-300">{c.name}</span>
                    </span>
                    <span className="font-mono text-slate-400 text-[10px]">×{c.multiplier}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tolerance */}
          <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-3">
            <label className="text-xs font-semibold text-slate-400 block mb-2">Tolerance</label>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              {COLOR_TABLE.filter(c => c.tolerance !== undefined).map((c) => {
                const idx = COLOR_TABLE.findIndex(t => t.name === c.name);
                return (
                  <button
                    key={c.name}
                    onClick={() => setToleranceIdx(idx)}
                    className={`w-full flex items-center justify-between px-2 py-1 rounded text-xs transition ${toleranceIdx === idx ? 'ring-2 ring-cyan-400 font-semibold' : 'hover:bg-slate-800'}`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full border border-slate-600" style={{ backgroundColor: c.color }}></span>
                      <span className="text-slate-300">{c.name}</span>
                    </span>
                    <span className="font-mono text-slate-400 text-[10px]">±{c.tolerance}%</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Temperature Coefficient (6-band only) */}
          {bandCount === 6 && (
            <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-3">
              <label className="text-xs font-semibold text-slate-400 block mb-2">Temp. Coeff.</label>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                {COLOR_TABLE.filter(c => c.tempCoeff !== undefined).map((c) => {
                  const idx = COLOR_TABLE.findIndex(t => t.name === c.name);
                  return (
                    <button
                      key={c.name}
                      onClick={() => setTempIdx(idx)}
                      className={`w-full flex items-center justify-between px-2 py-1 rounded text-xs transition ${tempIdx === idx ? 'ring-2 ring-cyan-400 font-semibold' : 'hover:bg-slate-800'}`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full border border-slate-600" style={{ backgroundColor: c.color }}></span>
                        <span className="text-slate-300">{c.name}</span>
                      </span>
                      <span className="font-mono text-slate-400 text-[10px]">{c.tempCoeff} ppm</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Resistance to Color inputs */
        <div className="max-w-lg mx-auto bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Target Resistance Value</label>
            <div className="flex rounded-lg overflow-hidden border border-slate-700 bg-slate-950">
              <input
                type="number"
                min="0.01"
                step="any"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="w-full px-4 py-2.5 bg-transparent font-mono text-sm text-slate-100 focus:outline-none"
                placeholder="e.g. 270, 4.7, 10"
              />
              <select
                value={inputUnit}
                onChange={(e) => setInputUnit(Number(e.target.value))}
                className="bg-slate-800 text-slate-200 font-mono text-xs px-3 border-l border-slate-700 focus:outline-none"
              >
                <option value={1}>Ω (Ohms)</option>
                <option value={1000}>kΩ (kilo-ohms)</option>
                <option value={1000000}>MΩ (mega-ohms)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Desired Tolerance Band</label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: '±1% (Brown)', val: 1 },
                { label: '±2% (Red)', val: 2 },
                { label: '±5% (Gold)', val: 5 },
                { label: '±10% (Silver)', val: 10 }
              ].map(t => (
                <button
                  key={t.val}
                  onClick={() => setTargetTolerance(t.val)}
                  className={`py-1.5 px-2 rounded text-xs font-medium border transition ${targetTolerance === t.val ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300' : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex justify-between items-center text-xs text-slate-400 border-t border-slate-800">
            <span>Standard EIA E12/E24 decade values supported</span>
            <button
              onClick={() => { setInputVal('270'); setInputUnit(1); setTargetTolerance(5); }}
              className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300"
            >
              <RefreshCw className="w-3 h-3" /> Reset default
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResistorCalculator;
