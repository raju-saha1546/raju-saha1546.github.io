import React, { useState, useRef, useEffect } from 'react';
import { Waves, Sparkles, Sun, Sliders } from 'lucide-react';

export const WaveInterferenceSimulation: React.FC = () => {
  const canvasWaveRef = useRef<HTMLCanvasElement | null>(null);
  const canvasIntensityRef = useRef<HTMLCanvasElement | null>(null);

  // Optical parameters
  const [wavelengthNm, setWavelengthNm] = useState<number>(532); // 532 nm (Green laser)
  const [slitSeparationUm, setSlitSeparationUm] = useState<number>(20); // 20 um
  const [slitWidthUm, setSlitWidthUm] = useState<number>(4); // 4 um single slit width
  const [distanceM, setDistanceM] = useState<number>(1.2); // 1.2 m to screen

  // Convert wavelength in nm to RGB color
  const wavelengthToRGB = (wl: number): string => {
    let r = 0, g = 0, b = 0;
    if (wl >= 380 && wl < 440) {
      r = -(wl - 440) / (440 - 380);
      b = 1.0;
    } else if (wl >= 440 && wl < 490) {
      g = (wl - 440) / (490 - 440);
      b = 1.0;
    } else if (wl >= 490 && wl < 510) {
      g = 1.0;
      b = -(wl - 510) / (510 - 490);
    } else if (wl >= 510 && wl < 580) {
      r = (wl - 510) / (580 - 510);
      g = 1.0;
    } else if (wl >= 580 && wl < 645) {
      r = 1.0;
      g = -(wl - 645) / (645 - 580);
    } else if (wl >= 645 && wl <= 780) {
      r = 1.0;
    }

    // Intensity falloff near limits
    let factor = 1.0;
    if (wl >= 380 && wl < 420) factor = 0.3 + 0.7 * (wl - 380) / (420 - 380);
    else if (wl >= 700 && wl <= 780) factor = 0.3 + 0.7 * (780 - wl) / (780 - 700);

    return `rgb(${Math.round(r * factor * 255)}, ${Math.round(g * factor * 255)}, ${Math.round(b * factor * 255)})`;
  };

  const laserColor = wavelengthToRGB(wavelengthNm);

  // Render 2D Wave Propagation Field
  useEffect(() => {
    const canvas = canvasWaveRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const imgData = ctx.createImageData(w, h);
    const data = imgData.data;

    // Slit coordinates on left edge
    const slit1Y = h / 2 - slitSeparationUm * 1.5;
    const slit2Y = h / 2 + slitSeparationUm * 1.5;
    const slitX = 20;

    const k = (2 * Math.PI) / (wavelengthNm * 0.05); // spatial wave number scaled for canvas

    for (let x = slitX; x < w; x += 2) {
      for (let y = 0; y < h; y += 2) {
        const r1 = Math.sqrt((x - slitX) * (x - slitX) + (y - slit1Y) * (y - slit1Y));
        const r2 = Math.sqrt((x - slitX) * (x - slitX) + (y - slit2Y) * (y - slit2Y));

        // Superposition of two spherical/cylindrical waves: E = cos(kr1)/sqrt(r1) + cos(kr2)/sqrt(r2)
        const e1 = Math.cos(k * r1) / (Math.sqrt(r1) * 0.3 + 1);
        const e2 = Math.cos(k * r2) / (Math.sqrt(r2) * 0.3 + 1);
        const intensity = Math.pow(e1 + e2, 2);

        const brightness = Math.min(255, Math.floor(intensity * 120));

        // Color modulation based on laser wavelength
        // We write 2x2 blocks for speed
        for (let dx = 0; dx < 2 && x + dx < w; dx++) {
          for (let dy = 0; dy < 2 && y + dy < h; dy++) {
            const idx = ((y + dy) * w + (x + dx)) * 4;
            data[idx] = wavelengthNm > 580 ? brightness : Math.floor(brightness * 0.1); // R
            data[idx + 1] = wavelengthNm >= 490 && wavelengthNm <= 600 ? brightness : Math.floor(brightness * 0.2); // G
            data[idx + 2] = wavelengthNm < 520 ? brightness : Math.floor(brightness * 0.1); // B
            data[idx + 3] = 255;
          }
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);

    // Draw slit barrier
    ctx.fillStyle = '#475569';
    ctx.fillRect(slitX - 4, 0, 4, h);
    // Cut out slits
    ctx.fillStyle = '#060911';
    ctx.fillRect(slitX - 5, slit1Y - 4, 6, 8);
    ctx.fillRect(slitX - 5, slit2Y - 4, 6, 8);

    // Laser incoming rays
    ctx.strokeStyle = laserColor;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, slit1Y);
    ctx.lineTo(slitX, slit1Y);
    ctx.moveTo(0, slit2Y);
    ctx.lineTo(slitX, slit2Y);
    ctx.stroke();
  }, [wavelengthNm, slitSeparationUm]);

  // Render 1D Intensity distribution and Screen Fringes
  useEffect(() => {
    const canvas = canvasIntensityRef.current;
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

    // Center screen line
    const centerY = h / 2;

    // Physical variables converted to SI
    const lambda = wavelengthNm * 1e-9;
    const d = slitSeparationUm * 1e-6;
    const a = slitWidthUm * 1e-6;
    const D = distanceM;

    // Draw intensity curve
    ctx.strokeStyle = laserColor;
    ctx.lineWidth = 2;
    ctx.beginPath();

    const screenSpanY = 0.12; // +/- 12 cm on screen
    const points = w;

    for (let px = 0; px < points; px++) {
      // Map screen pixel to y position in meters
      const yPos = ((px - w / 2) / (w / 2)) * screenSpanY;
      const theta = Math.atan(yPos / D);

      // Diffraction beta & Interference alpha
      const beta = (Math.PI * a * Math.sin(theta)) / lambda;
      const alpha = (Math.PI * d * Math.sin(theta)) / lambda;

      const diffractionFactor = beta === 0 ? 1 : Math.pow(Math.sin(beta) / beta, 2);
      const interferenceFactor = Math.pow(Math.cos(alpha), 2);
      const intensity = diffractionFactor * interferenceFactor;

      const plotH = (h * 0.55);
      const sy = h - 25 - intensity * plotH;

      if (px === 0) ctx.moveTo(px, sy);
      else ctx.lineTo(px, sy);
    }
    ctx.stroke();

    // Top Strip: Optical Fringes as seen on viewing screen
    const fringeHeight = 24;
    for (let px = 0; px < w; px++) {
      const yPos = ((px - w / 2) / (w / 2)) * screenSpanY;
      const theta = Math.atan(yPos / D);
      const beta = (Math.PI * a * Math.sin(theta)) / lambda;
      const alpha = (Math.PI * d * Math.sin(theta)) / lambda;
      const diff = beta === 0 ? 1 : Math.pow(Math.sin(beta) / beta, 2);
      const interf = Math.pow(Math.cos(alpha), 2);
      const intensity = Math.min(1, Math.max(0, diff * interf));

      ctx.fillStyle = laserColor;
      ctx.globalAlpha = intensity;
      ctx.fillRect(px, 10, 1, fringeHeight);
    }
    ctx.globalAlpha = 1.0;

    // Screen strip border
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 10, w, fringeHeight);
  }, [wavelengthNm, slitSeparationUm, slitWidthUm, distanceM, laserColor]);

  // Fringe spacing calculation: Delta y = lambda * D / d
  const fringeSpacingMm = ((wavelengthNm * 1e-9 * distanceM) / (slitSeparationUm * 1e-6)) * 1000;

  return (
    <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-5 md:p-8 backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h3 className="text-xl font-bold font-display text-slate-100 flex items-center gap-2">
            <Waves className="w-5 h-5 text-cyan-400" />
            Double-Slit Interference & Wave Superposition
          </h3>
          <p className="text-xs text-slate-400 mt-1">Fresnel-Fraunhofer wave diffraction with chromatic spectrum wavelength rendering and intensity envelopes</p>
        </div>

        {/* Wavelength quick color badges */}
        <div className="flex items-center gap-1.5 text-xs">
          {[
            { name: 'Violet', wl: 405 },
            { name: 'Blue', wl: 450 },
            { name: 'Green', wl: 532 },
            { name: 'Yellow', wl: 589 },
            { name: 'Red', wl: 650 }
          ].map(c => (
            <button
              key={c.name}
              onClick={() => setWavelengthNm(c.wl)}
              className="px-2.5 py-1 rounded-md border text-slate-200 transition font-mono text-[11px]"
              style={{
                borderColor: wavelengthNm === c.wl ? '#38bdf8' : '#334155',
                backgroundColor: wavelengthNm === c.wl ? 'rgba(56, 189, 248, 0.2)' : 'rgba(15, 23, 42, 0.6)'
              }}
            >
              {c.wl}nm
            </button>
          ))}
        </div>
      </div>

      {/* Dual Simulation Display: 2D Field + 1D Diffraction Pattern */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 my-6">
        {/* Left: 2D Field */}
        <div className="lg:col-span-6 rounded-xl border border-slate-800 bg-[#060911] p-3 flex flex-col justify-between">
          <div className="flex justify-between items-center text-xs text-slate-400 font-mono mb-2">
            <span>2D Superposition Wavefronts</span>
            <span style={{ color: laserColor }} className="font-bold">λ = {wavelengthNm} nm</span>
          </div>
          <canvas ref={canvasWaveRef} width={280} height={200} className="w-full h-56 rounded border border-slate-800/80 block" />
          <span className="text-[10px] text-slate-500 font-mono text-center mt-2">Two coherent point sources emerging from Young's double aperture</span>
        </div>

        {/* Right: Screen Fringes & Intensity Envelope */}
        <div className="lg:col-span-6 rounded-xl border border-slate-800 bg-[#060911] p-3 flex flex-col justify-between">
          <div className="flex justify-between items-center text-xs text-slate-400 font-mono mb-2">
            <span>Observation Screen Intensity Envelope</span>
            <span className="text-cyan-400 font-bold">I(θ) = I₀ sinc²(β) cos²(α)</span>
          </div>
          <canvas ref={canvasIntensityRef} className="w-full h-56 rounded border border-slate-800/80 block" />
          <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mt-2">
            <span>Fringe spacing (Δy): <span className="text-cyan-400 font-bold">{fringeSpacingMm.toFixed(2)} mm</span></span>
            <span>Screen Distance: {distanceM} m</span>
          </div>
        </div>
      </div>

      {/* Parameter Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-slate-800 text-xs">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-slate-300 font-semibold">Wavelength (λ):</span>
            <span className="font-mono font-bold" style={{ color: laserColor }}>{wavelengthNm} nm</span>
          </div>
          <input
            type="range"
            min="380"
            max="750"
            value={wavelengthNm}
            onChange={e => setWavelengthNm(Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-slate-300 font-semibold">Slit Separation (d):</span>
            <span className="font-mono text-cyan-400 font-bold">{slitSeparationUm} μm</span>
          </div>
          <input
            type="range"
            min="8"
            max="60"
            value={slitSeparationUm}
            onChange={e => setSlitSeparationUm(Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-slate-300 font-semibold">Slit Width (a):</span>
            <span className="font-mono text-cyan-400 font-bold">{slitWidthUm} μm</span>
          </div>
          <input
            type="range"
            min="1"
            max="15"
            value={slitWidthUm}
            onChange={e => setSlitWidthUm(Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-slate-300 font-semibold">Screen Distance (D):</span>
            <span className="font-mono text-cyan-400 font-bold">{distanceM} m</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="3.0"
            step="0.1"
            value={distanceM}
            onChange={e => setDistanceM(Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default WaveInterferenceSimulation;
