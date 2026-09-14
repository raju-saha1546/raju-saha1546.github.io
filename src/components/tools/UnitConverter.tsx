import React, { useState, useMemo } from 'react';
import { ArrowLeftRight, Copy, Check, Sparkles } from 'lucide-react';

interface UnitCategory {
  name: string;
  baseUnit: string;
  units: { name: string; symbol: string; toBase: (v: number) => number; fromBase: (v: number) => number }[];
}

const UNIT_CATEGORIES: UnitCategory[] = [
  {
    name: 'Length',
    baseUnit: 'm',
    units: [
      { name: 'Meters', symbol: 'm', toBase: v => v, fromBase: v => v },
      { name: 'Nanometers', symbol: 'nm', toBase: v => v * 1e-9, fromBase: v => v * 1e9 },
      { name: 'Micrometers', symbol: 'μm', toBase: v => v * 1e-6, fromBase: v => v * 1e6 },
      { name: 'Millimeters', symbol: 'mm', toBase: v => v * 1e-3, fromBase: v => v * 1e3 },
      { name: 'Centimeters', symbol: 'cm', toBase: v => v * 1e-2, fromBase: v => v * 1e2 },
      { name: 'Kilometers', symbol: 'km', toBase: v => v * 1e3, fromBase: v => v * 1e-3 },
      { name: 'Angstroms', symbol: 'Å', toBase: v => v * 1e-10, fromBase: v => v * 1e10 },
      { name: 'Inches', symbol: 'in', toBase: v => v * 0.0254, fromBase: v => v / 0.0254 },
      { name: 'Feet', symbol: 'ft', toBase: v => v * 0.3048, fromBase: v => v / 0.3048 },
      { name: 'Miles', symbol: 'mi', toBase: v => v * 1609.344, fromBase: v => v / 1609.344 },
      { name: 'Astronomical Units', symbol: 'AU', toBase: v => v * 1.495978707e11, fromBase: v => v / 1.495978707e11 },
      { name: 'Light Years', symbol: 'ly', toBase: v => v * 9.460730472e15, fromBase: v => v / 9.460730472e15 },
      { name: 'Parsecs', symbol: 'pc', toBase: v => v * 3.085677581e16, fromBase: v => v / 3.085677581e16 }
    ]
  },
  {
    name: 'Energy',
    baseUnit: 'J',
    units: [
      { name: 'Joules', symbol: 'J', toBase: v => v, fromBase: v => v },
      { name: 'Electronvolts', symbol: 'eV', toBase: v => v * 1.602176634e-19, fromBase: v => v / 1.602176634e-19 },
      { name: 'Kiloelectronvolts', symbol: 'keV', toBase: v => v * 1.602176634e-16, fromBase: v => v / 1.602176634e-16 },
      { name: 'Megaelectronvolts', symbol: 'MeV', toBase: v => v * 1.602176634e-13, fromBase: v => v / 1.602176634e-13 },
      { name: 'Kilowatt-hours', symbol: 'kWh', toBase: v => v * 3.6e6, fromBase: v => v / 3.6e6 },
      { name: 'Calories (thermochemical)', symbol: 'cal', toBase: v => v * 4.184, fromBase: v => v / 4.184 },
      { name: 'Kilocalories', symbol: 'kcal', toBase: v => v * 4184, fromBase: v => v / 4184 },
      { name: 'Ergs', symbol: 'erg', toBase: v => v * 1e-7, fromBase: v => v * 1e7 },
      { name: 'BTU', symbol: 'BTU', toBase: v => v * 1055.06, fromBase: v => v / 1055.06 }
    ]
  },
  {
    name: 'Mass',
    baseUnit: 'kg',
    units: [
      { name: 'Kilograms', symbol: 'kg', toBase: v => v, fromBase: v => v },
      { name: 'Grams', symbol: 'g', toBase: v => v * 1e-3, fromBase: v => v * 1e3 },
      { name: 'Milligrams', symbol: 'mg', toBase: v => v * 1e-6, fromBase: v => v * 1e6 },
      { name: 'Micrograms', symbol: 'μg', toBase: v => v * 1e-9, fromBase: v => v * 1e9 },
      { name: 'Atomic Mass Units', symbol: 'u / Da', toBase: v => v * 1.66053906660e-27, fromBase: v => v / 1.66053906660e-27 },
      { name: 'Electron Rest Masses', symbol: 'm_e', toBase: v => v * 9.1093837e-31, fromBase: v => v / 9.1093837e-31 },
      { name: 'Pounds', symbol: 'lb', toBase: v => v * 0.45359237, fromBase: v => v / 0.45359237 },
      { name: 'Ounces', symbol: 'oz', toBase: v => v * 0.028349523, fromBase: v => v / 0.028349523 },
      { name: 'Solar Masses', symbol: 'M_☉', toBase: v => v * 1.98847e30, fromBase: v => v / 1.98847e30 }
    ]
  },
  {
    name: 'Velocity',
    baseUnit: 'm/s',
    units: [
      { name: 'Meters per second', symbol: 'm/s', toBase: v => v, fromBase: v => v },
      { name: 'Kilometers per hour', symbol: 'km/h', toBase: v => v / 3.6, fromBase: v => v * 3.6 },
      { name: 'Miles per hour', symbol: 'mph', toBase: v => v * 0.44704, fromBase: v => v / 0.44704 },
      { name: 'Speed of Light (c)', symbol: 'c', toBase: v => v * 299792458, fromBase: v => v / 299792458 },
      { name: 'Knots', symbol: 'kn', toBase: v => v * 0.514444, fromBase: v => v / 0.514444 }
    ]
  },
  {
    name: 'Pressure',
    baseUnit: 'Pa',
    units: [
      { name: 'Pascals', symbol: 'Pa', toBase: v => v, fromBase: v => v },
      { name: 'Kilopascals', symbol: 'kPa', toBase: v => v * 1e3, fromBase: v => v * 1e-3 },
      { name: 'Bar', symbol: 'bar', toBase: v => v * 1e5, fromBase: v => v * 1e-5 },
      { name: 'Standard Atmospheres', symbol: 'atm', toBase: v => v * 101325, fromBase: v => v / 101325 },
      { name: 'Torr (mmHg)', symbol: 'Torr', toBase: v => v * 133.322368, fromBase: v => v / 133.322368 },
      { name: 'Pounds per square inch', symbol: 'psi', toBase: v => v * 6894.757, fromBase: v => v / 6894.757 }
    ]
  },
  {
    name: 'Temperature',
    baseUnit: 'K',
    units: [
      { name: 'Kelvin', symbol: 'K', toBase: v => v, fromBase: v => v },
      { name: 'Celsius', symbol: '°C', toBase: v => v + 273.15, fromBase: v => v - 273.15 },
      { name: 'Fahrenheit', symbol: '°F', toBase: v => (v - 32) * 5/9 + 273.15, fromBase: v => (v - 273.15) * 9/5 + 32 },
      { name: 'Rankine', symbol: '°R', toBase: v => v * 5/9, fromBase: v => v * 9/5 }
    ]
  },
  {
    name: 'Frequency & Wavelength',
    baseUnit: 'Hz',
    units: [
      { name: 'Hertz', symbol: 'Hz', toBase: v => v, fromBase: v => v },
      { name: 'Kilohertz', symbol: 'kHz', toBase: v => v * 1e3, fromBase: v => v * 1e-3 },
      { name: 'Megahertz', symbol: 'MHz', toBase: v => v * 1e6, fromBase: v => v * 1e-6 },
      { name: 'Gigahertz', symbol: 'GHz', toBase: v => v * 1e9, fromBase: v => v * 1e-9 },
      { name: 'Terahertz', symbol: 'THz', toBase: v => v * 1e12, fromBase: v => v * 1e-12 }
    ]
  },
  {
    name: 'Capacitance & Inductance',
    baseUnit: 'F',
    units: [
      { name: 'Farads', symbol: 'F', toBase: v => v, fromBase: v => v },
      { name: 'Millifarads', symbol: 'mF', toBase: v => v * 1e-3, fromBase: v => v * 1e3 },
      { name: 'Microfarads', symbol: 'μF', toBase: v => v * 1e-6, fromBase: v => v * 1e6 },
      { name: 'Nanofarads', symbol: 'nF', toBase: v => v * 1e-9, fromBase: v => v * 1e9 },
      { name: 'Picofarads', symbol: 'pF', toBase: v => v * 1e-12, fromBase: v => v * 1e12 }
    ]
  }
];

export const UnitConverter: React.FC = () => {
  const [selectedCatIdx, setSelectedCatIdx] = useState<number>(0);
  const currentCategory = UNIT_CATEGORIES[selectedCatIdx];

  const [fromUnitIdx, setFromUnitIdx] = useState<number>(0);
  const [toUnitIdx, setToUnitIdx] = useState<number>(1);
  const [inputVal, setInputVal] = useState<string>('1');
  const [copied, setCopied] = useState<boolean>(false);

  // When category changes, reset indices
  const handleCategoryChange = (idx: number) => {
    setSelectedCatIdx(idx);
    setFromUnitIdx(0);
    setToUnitIdx(UNIT_CATEGORIES[idx].units.length > 1 ? 1 : 0);
  };

  const swapUnits = () => {
    const temp = fromUnitIdx;
    setFromUnitIdx(toUnitIdx);
    setToUnitIdx(temp);
  };

  // Conversion math
  const converted = useMemo(() => {
    try {
      const val = parseFloat(inputVal);
      if (isNaN(val)) return null;

      const fromU = currentCategory.units[fromUnitIdx];
      const toU = currentCategory.units[toUnitIdx];
      if (!fromU || !toU) return null;

      const baseVal = fromU.toBase(val);
      const targetVal = toU.fromBase(baseVal);

      return {
        numeric: targetVal,
        formatted: targetVal.toExponential(6).includes('e+0') || Math.abs(targetVal) > 0.001 && Math.abs(targetVal) < 100000
          ? targetVal.toLocaleString('en-US', { maximumFractionDigits: 6 })
          : targetVal.toExponential(6),
        scientific: targetVal.toExponential(6)
      };
    } catch {
      return null;
    }
  }, [inputVal, currentCategory, fromUnitIdx, toUnitIdx]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-5 md:p-8 backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h3 className="text-xl font-bold font-display text-slate-100 flex items-center gap-2">
            <ArrowLeftRight className="w-5 h-5 text-cyan-400" />
            Scientific Unit Converter
          </h3>
          <p className="text-xs text-slate-400 mt-1">High-precision SI & non-SI conversions with scientific notation parsing</p>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 hidden sm:inline">Presets:</span>
          <button
            onClick={() => {
              handleCategoryChange(1); // Energy
              setInputVal('1');
              setFromUnitIdx(1); // eV
              setToUnitIdx(0); // J
            }}
            className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-cyan-300 hover:bg-slate-700 transition"
          >
            1 eV → J
          </button>
          <button
            onClick={() => {
              handleCategoryChange(4); // Pressure
              setInputVal('1');
              setFromUnitIdx(3); // atm
              setToUnitIdx(0); // Pa
            }}
            className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-cyan-300 hover:bg-slate-700 transition"
          >
            1 atm → Pa
          </button>
        </div>
      </div>

      {/* Category selector pills */}
      <div className="flex items-center gap-2 overflow-x-auto py-4 border-b border-slate-800/80 scrollbar-none">
        {UNIT_CATEGORIES.map((cat, idx) => (
          <button
            key={cat.name}
            onClick={() => handleCategoryChange(idx)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${selectedCatIdx === idx ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/60'}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Converter Panel */}
      <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center my-6">
        {/* From Box */}
        <div className="md:col-span-5 rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>From:</span>
            <span className="font-mono text-cyan-400">{currentCategory.units[fromUnitIdx]?.symbol}</span>
          </div>
          <input
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 font-mono text-base text-slate-100 focus:outline-none focus:border-cyan-500"
            placeholder="Enter value (e.g. 1.5e-3)"
          />
          <select
            value={fromUnitIdx}
            onChange={e => setFromUnitIdx(Number(e.target.value))}
            className="w-full bg-slate-800 text-slate-200 rounded-lg px-3 py-2 text-xs border border-slate-700 focus:outline-none font-medium"
          >
            {currentCategory.units.map((u, i) => (
              <option key={u.name} value={i}>
                {u.name} ({u.symbol})
              </option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <div className="md:col-span-1 flex justify-center">
          <button
            onClick={swapUnits}
            className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 transition hover:scale-105 active:scale-95 shadow-md"
            title="Swap units"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>

        {/* To Box */}
        <div className="md:col-span-5 rounded-xl border border-cyan-500/30 bg-cyan-950/10 p-4 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>To (Result):</span>
            <span className="font-mono text-cyan-400">{currentCategory.units[toUnitIdx]?.symbol}</span>
          </div>
          <div className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 flex items-center justify-between">
            <span className="font-mono text-base font-bold text-cyan-300 truncate">
              {converted ? converted.formatted : '—'}
            </span>
            {converted && (
              <button
                onClick={() => handleCopy(converted.scientific)}
                className="p-1 text-slate-400 hover:text-cyan-300 transition shrink-0 ml-2"
                title="Copy scientific notation"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            )}
          </div>
          <select
            value={toUnitIdx}
            onChange={e => setToUnitIdx(Number(e.target.value))}
            className="w-full bg-slate-800 text-slate-200 rounded-lg px-3 py-2 text-xs border border-slate-700 focus:outline-none font-medium"
          >
            {currentCategory.units.map((u, i) => (
              <option key={u.name} value={i}>
                {u.name} ({u.symbol})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Scientific details & breakdown */}
      {converted && (
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-300">
          <div>
            <span className="text-slate-500">Scientific Exponential:</span>{' '}
            <span className="text-cyan-400 font-bold">{converted.scientific} {currentCategory.units[toUnitIdx]?.symbol}</span>
          </div>
          <div className="text-slate-400">
            <span>Base Unit ({currentCategory.baseUnit}): </span>
            <span className="text-slate-200">{currentCategory.units[fromUnitIdx].toBase(parseFloat(inputVal) || 0).toExponential(6)} {currentCategory.baseUnit}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitConverter;
