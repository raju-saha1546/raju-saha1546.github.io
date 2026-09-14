import React, { useRef, useEffect, useState } from 'react';
import {
  Atom,
  User,
  ArrowRight,
  Sparkles,
  BookOpen,
  ClipboardList,
  FolderGit2,
  Wrench,
  Cpu,
  Zap,
  ArrowLeftRight,
  TrendingUp,
  Camera,
  ExternalLink,
  Code2,
  Compass,
  CheckCircle2
} from 'lucide-react';
import {
  PERSONAL_DATA,
  WHAT_IM_EXPLORING,
  CURRENTLY_LEARNING
} from '../../data/personal';
import { PROJECTS_DATA } from '../../data/projects';
import { NOTES_DATA } from '../../data/notes';
import { LAB_EXPERIMENTS } from '../../data/labNotebook';
import { Project } from '../../types';
import MathView from '../common/MathView';
import ContactSection from '../contact/ContactSection';
import ProjectDetailModal from '../projects/ProjectDetailModal';

interface HomePageProps {
  onNavigate: (tab: string, subId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  // Subtle, elegant scientific visual background (harmonic field lines & orbital wave animation)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const updateDimensions = () => {
      const parent = canvas.parentElement;
      if (!parent) return { width: 800, height: 480 };
      const dpr = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      return { width: rect.width, height: rect.height };
    };

    let { width, height } = updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      const dims = updateDimensions();
      width = dims.width;
      height = dims.height;
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Focus point situated on the right side of the hero for desktop, center for mobile
      const isMobile = width < 768;
      const centerX = isMobile ? width * 0.5 : width * 0.76;
      const centerY = isMobile ? height * 0.6 : height * 0.5;

      // 1. Subtle polar coordinate grid rings (delicate background geometry)
      const baseRadii = [45, 95, 150, 210, 275];
      for (const r of baseRadii) {
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.04)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();

        // Subtle quadrant markers on the grid rings
        const markers = [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5];
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.09)';
        for (const angle of markers) {
          const mx = centerX + r * Math.cos(angle);
          const my = centerY + r * Math.sin(angle);
          ctx.beginPath();
          ctx.arc(mx, my, 1.2, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // 2. Primary harmonic orbital wave (simulating atomic orbital / standing wavefunction)
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.22)';
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      const points = 160;
      for (let i = 0; i <= points; i++) {
        const theta = (i / points) * Math.PI * 2;
        // Harmonic modulation: m=3 standing wave with slow temporal precession
        const radialModulation =
          32 * Math.sin(3 * theta + t * 0.016) +
          14 * Math.cos(2 * theta - t * 0.011);
        const radius = 115 + radialModulation;
        const x = centerX + radius * Math.cos(theta);
        const y = centerY + radius * Math.sin(theta);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      // 3. Secondary harmonic resonance loop (counter-propagating phase)
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.16)';
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      for (let i = 0; i <= points; i++) {
        const theta = (i / points) * Math.PI * 2;
        const radialModulation =
          26 * Math.sin(5 * theta - t * 0.014) +
          10 * Math.sin(theta + t * 0.02);
        const radius = 175 + radialModulation;
        const x = centerX + radius * Math.cos(theta);
        const y = centerY + radius * Math.sin(theta);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      // 4. Outer equipotential streamline loop (faint tertiary wave)
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.09)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i <= points; i++) {
        const theta = (i / points) * Math.PI * 2;
        const radius = 235 + 18 * Math.cos(4 * theta + t * 0.009);
        const x = centerX + radius * Math.cos(theta);
        const y = centerY + radius * Math.sin(theta);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      // 5. Orbiting wave packet beacon (gently tracing the primary harmonic)
      const primaryAngle = t * 0.012;
      const packetRadius = 115 + 32 * Math.sin(3 * primaryAngle + t * 0.016) + 14 * Math.cos(2 * primaryAngle - t * 0.011);
      const orbX = centerX + packetRadius * Math.cos(primaryAngle);
      const orbY = centerY + packetRadius * Math.sin(primaryAngle);

      // Soft luminous aura around the wave packet
      const grad = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, 18);
      grad.addColorStop(0, 'rgba(56, 189, 248, 0.6)');
      grad.addColorStop(0.4, 'rgba(56, 189, 248, 0.18)');
      grad.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(orbX, orbY, 18, 0, Math.PI * 2);
      ctx.fill();

      // Core packet dot
      ctx.fillStyle = 'rgba(224, 242, 254, 0.95)';
      ctx.beginPath();
      ctx.arc(orbX, orbY, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Secondary slower node on the second orbital
      const secAngle = -t * 0.008 + 1.2;
      const secRadius = 175 + 26 * Math.sin(5 * secAngle - t * 0.014);
      const secX = centerX + secRadius * Math.cos(secAngle);
      const secY = centerY + secRadius * Math.sin(secAngle);

      ctx.fillStyle = 'rgba(129, 140, 248, 0.7)';
      ctx.beginPath();
      ctx.arc(secX, secY, 2, 0, Math.PI * 2);
      ctx.fill();

      t += 1;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
    };
  }, []);

  // Featured 3 projects for homepage
  const featuredProjects = PROJECTS_DATA.slice(0, 3);

  // Latest 3 notes for homepage
  const latestNotes = NOTES_DATA.slice(0, 3);

  // Featured 4 tools for the Physics Lab preview
  const featuredTools = [
    {
      id: 'resistor',
      name: 'Resistor Calculator',
      category: 'Electronics',
      icon: Cpu,
      desc: 'A small electronics tool for quickly decoding 4 and 5-band resistor color codes.'
    },
    {
      id: 'plotter',
      name: 'Scientific Plotter',
      category: 'Data Analysis',
      icon: TrendingUp,
      desc: 'A browser-based tool for exploring mathematical functions and experimental equations.'
    },
    {
      id: 'unit-converter',
      name: 'Unit Converter',
      category: 'Utilities',
      icon: ArrowLeftRight,
      desc: 'High-precision scientific SI and derived physical units converter.'
    },
    {
      id: 'ohms-law',
      name: "Ohm's Law Solver",
      category: 'Electronics',
      icon: Zap,
      desc: 'Calculates DC network voltage, current, resistance, and dissipated power.'
    }
  ];

  return (
    <div className="space-y-20 pb-12">
      {/* =======================================================
          1. HERO / INTRODUCTION SECTION
          ======================================================= */}
      <section
        id="hero-section"
        className="relative rounded-3xl border border-slate-800/90 bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-slate-950/90 p-8 sm:p-12 md:p-16 overflow-hidden shadow-2xl backdrop-blur-xl"
      >
        {/* Subtle, elegant scientific visual canvas */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-60 z-0"
        />

        <div className="relative z-10 max-w-3xl space-y-7">
          {/* Identity & Status Ribbon */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/80 border border-cyan-500/30 text-cyan-300 font-mono text-xs shadow-inner">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="font-bold tracking-wider text-slate-100">RAJU</span>
              <span className="text-slate-600">•</span>
              <span className="text-cyan-300 font-medium">{PERSONAL_DATA.role}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-400 font-mono text-[11px]">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Theory • Computation • Experiments</span>
            </div>
          </div>

          {/* Headline / Main Statement */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-display text-slate-100 tracking-tight leading-[1.12]">
              Exploring the physics{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300">
                behind the equations.
              </span>
            </h1>
            <p className="text-xs sm:text-sm font-mono text-cyan-400 font-medium tracking-wide">
              {PERSONAL_DATA.tagline} • Academic Portfolio & Digital Notebook
            </p>
          </div>

          {/* Professional Summary & Supporting Text */}
          <div className="space-y-3 text-base sm:text-lg text-slate-300 leading-relaxed font-sans max-w-2xl">
            <p>
              I’m interested in understanding physical systems through mathematics, experimentation, scientific computing, electronics, and simulation.
            </p>
          </div>

          {/* Focus Pillars Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            <div className="px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
              <span className="text-slate-400 block text-[10px] font-mono uppercase tracking-wider">Theory</span>
              <span className="text-slate-200 font-medium">Mathematical Derivations</span>
            </div>
            <div className="px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
              <span className="text-slate-400 block text-[10px] font-mono uppercase tracking-wider">Computation</span>
              <span className="text-slate-200 font-medium">Numerical Simulations</span>
            </div>
            <div className="px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
              <span className="text-slate-400 block text-[10px] font-mono uppercase tracking-wider">Experiment</span>
              <span className="text-slate-200 font-medium">Bench Measurements</span>
            </div>
            <div className="px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
              <span className="text-slate-400 block text-[10px] font-mono uppercase tracking-wider">Hardware</span>
              <span className="text-slate-200 font-medium">Discrete Electronics</span>
            </div>
          </div>

          {/* Primary Actions */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              id="hero-btn-about"
              onClick={() => onNavigate('about')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              <User className="w-4 h-4" />
              <span>About Me</span>
            </button>

            <button
              id="hero-btn-work"
              onClick={() => onNavigate('projects')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700/80 hover:border-cyan-500/40 font-semibold text-sm transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
            >
              <FolderGit2 className="w-4 h-4 text-cyan-400" />
              <span>Explore My Work</span>
            </button>

            <button
              id="hero-btn-tools"
              onClick={() => onNavigate('tools')}
              className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800/80 font-mono text-xs transition-all"
            >
              <Wrench className="w-3.5 h-3.5 text-indigo-400" />
              <span>Open Physics Lab</span>
            </button>
          </div>

          {/* Subtle Formula Underpinning */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Quantum State:</span>
              <MathView math="i\hbar \partial_t \Psi = \hat{H}\Psi" className="text-cyan-300" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Variational Action:</span>
              <MathView math="\delta S = 0" className="text-cyan-300" />
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-slate-500">Induction:</span>
              <MathView math="\nabla \times \mathbf{E} = -\partial_t \mathbf{B}" className="text-cyan-300" />
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================
          2. ABOUT ME SECTION (Homepage Preview)
          ======================================================= */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10 backdrop-blur-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Profile Area with Photograph Placeholder */}
          <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
            <div className="relative w-36 h-36 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 border-2 border-dashed border-cyan-500/40 flex flex-col items-center justify-center p-3 group hover:border-cyan-400 transition">
              <Camera className="w-8 h-8 text-cyan-400/70 mb-1.5" />
              <span className="text-[11px] font-mono text-cyan-300 font-semibold">
                Profile Photo
              </span>
              <span className="text-[9px] text-slate-400">
                (Editable Placeholder)
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold font-display text-slate-100">
                {PERSONAL_DATA.name}
              </h3>
              <p className="text-xs font-mono text-cyan-400">
                {PERSONAL_DATA.role}
              </p>
            </div>

            <div className="text-xs text-slate-400 max-w-xs leading-relaxed italic">
              "Connecting paper derivations with bench instruments, numerical simulations, and code."
            </div>
          </div>

          {/* Story & Philosophy */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
              <User className="w-4 h-4" />
              About Me
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-100">
              Understanding Physical Systems from First Principles
            </h2>
            <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
              <p>
                I am a university physics student who enjoys understanding the physical and mathematical reasoning behind equations rather than treating them as arbitrary formulas.
              </p>
              <p>
                I like bridging theoretical models with actual experiments—taking bench measurements, analyzing uncertainties, and verifying where idealizations hold. Along the way, I use scientific programming to simulate dynamic systems and build small breadboard electronics to understand how instrumentation works.
              </p>
            </div>

            {/* Core commitments list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Understanding why equations work</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Connecting theory with experiments</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Numerical simulation & visualization</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Hardware, discrete logic & sensors</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                <span>Read Full Academic Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================
          3. WHAT I'M EXPLORING
          ======================================================= */}
      <section className="space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
            <Atom className="w-4 h-4" />
            Curiosities & Core Disciplines
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-100">
            What I'm Exploring
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl">
            Key areas of physics, mathematics, and computing that I am actively investigating through coursework, independent reading, and code.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WHAT_IM_EXPLORING.map(topic => (
            <div
              key={topic.id}
              className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                  {topic.category}
                </div>
                <h3 className="text-sm font-bold font-display text-slate-100">
                  {topic.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {topic.description}
                </p>
              </div>

              {topic.equation && (
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-center text-[11px] overflow-x-auto">
                  <MathView math={topic.equation} className="text-cyan-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* =======================================================
          4. FEATURED PROJECTS
          ======================================================= */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
              <FolderGit2 className="w-4 h-4" />
              Scientific Portfolio
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-100">
              Featured Projects
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Things I have built to explore physical models, test hardware circuits, and simulate differential equations.
            </p>
          </div>
          <button
            onClick={() => onNavigate('projects')}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
          >
            <span>View All Projects ({PROJECTS_DATA.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map(proj => (
            <div
              key={proj.id}
              onClick={() => setActiveModalProject(proj)}
              className="group rounded-2xl border border-slate-800 bg-slate-900/70 hover:border-cyan-500/50 p-6 flex flex-col justify-between cursor-pointer transition shadow-lg space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-cyan-950/70 text-cyan-300 border border-cyan-500/30">
                    {proj.category}
                  </span>
                  <span className="font-mono text-slate-400 text-[11px]">
                    {proj.year}
                  </span>
                </div>

                <h3 className="text-base font-bold font-display text-slate-100 group-hover:text-cyan-300 transition">
                  {proj.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {proj.shortDescription}
                </p>

                {/* Physics Involved Breakdown */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/90 text-xs space-y-1.5">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Physics Involved:
                  </div>
                  <p className="text-[11px] text-slate-300 line-clamp-2">
                    {proj.physicsTheory}
                  </p>
                </div>
              </div>

              {/* Tags & Explore link */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <div className="flex flex-wrap gap-1">
                  {proj.tags.slice(0, 3).map((tag, ti) => (
                    <span
                      key={ti}
                      className="text-[10px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-cyan-400 font-mono text-xs font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Details <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =======================================================
          5. LATEST NOTES
          ======================================================= */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
              <BookOpen className="w-4 h-4" />
              Digital Scientific Notebook
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-100">
              Latest Physics Notes & Derivations
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Step-by-step mathematical reasoning, classical limits, and theoretical concepts written for personal clarity.
            </p>
          </div>
          <button
            onClick={() => onNavigate('notes')}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
          >
            <span>Browse All Notes ({NOTES_DATA.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestNotes.map(note => (
            <div
              key={note.id}
              onClick={() => onNavigate('notes')}
              className="group rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 p-6 flex flex-col justify-between cursor-pointer transition space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                    {note.category}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">
                    {note.readTime}
                  </span>
                </div>

                <h3 className="text-sm font-bold font-display text-slate-100 group-hover:text-cyan-300 transition">
                  {note.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {note.summary}
                </p>
              </div>

              {note.keyEquation && (
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center text-xs overflow-x-auto">
                  <MathView math={note.keyEquation} className="text-cyan-300" />
                </div>
              )}

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>{note.date}</span>
                <span className="text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Note <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =======================================================
          6. CURRENTLY LEARNING
          ======================================================= */}
      <section className="space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
            <Sparkles className="w-4 h-4" />
            Active Academic Studies
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-100">
            Currently Learning
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl">
            Real topics and concepts I am currently working through. Status labels reflect actual study progress without fake percentages.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CURRENTLY_LEARNING.map(item => {
            const statusColors: Record<string, string> = {
              Studying: 'bg-blue-950/70 text-blue-300 border-blue-500/30',
              Exploring: 'bg-purple-950/70 text-purple-300 border-purple-500/30',
              Building: 'bg-emerald-950/70 text-emerald-300 border-emerald-500/30',
              Practicing: 'bg-amber-950/70 text-amber-300 border-amber-500/30'
            };

            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400">
                      {item.category}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${
                        statusColors[item.status] || 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold font-display text-slate-100">
                    {item.topic}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.currentFocus}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 font-mono">
                  Target: {item.resourceOrGoal}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =======================================================
          7. LAB NOTEBOOK PREVIEW
          ======================================================= */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
              <ClipboardList className="w-4 h-4" />
              Experimental Records
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-100">
              Lab Notebook Preview
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Empirical records of things I actually tested, built, measured, or calibrated in the laboratory.
            </p>
          </div>
          <button
            onClick={() => onNavigate('lab')}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
          >
            <span>Open Lab Notebook ({LAB_EXPERIMENTS.length} Logs)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LAB_EXPERIMENTS.slice(0, 2).map(exp => (
            <div
              key={exp.id}
              onClick={() => onNavigate('lab')}
              className="group rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-cyan-500/40 p-6 flex flex-col justify-between cursor-pointer transition space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] font-mono text-cyan-400">
                    {exp.category}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">
                    {exp.date}
                  </span>
                </div>

                <h3 className="text-sm font-bold font-display text-slate-100 group-hover:text-cyan-300 transition">
                  {exp.title}
                </h3>

                {/* Question Investigated */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                    Core Question:
                  </span>
                  <p className="text-slate-300 text-xs italic">
                    "{exp.question}"
                  </p>
                </div>

                <div className="text-xs text-slate-300 line-clamp-2">
                  <strong className="text-slate-200">Result:</strong> {exp.conclusion}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>R² = {exp.rSquared}</span>
                <span className="text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View Setup & Data <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =======================================================
          8. PHYSICS LAB PREVIEW
          ======================================================= */}
      <section className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/80 via-slate-900/50 to-slate-950/90 p-6 sm:p-8 backdrop-blur-md space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold mb-1">
              <Wrench className="w-4 h-4" />
              Supporting Utilities & Simulations
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-100">
              My Physics Lab
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
              A collection of tools and simulations for exploring physics, analyzing experiments, and making calculations easier.
            </p>
          </div>

          <button
            onClick={() => onNavigate('tools')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition shadow-md shadow-cyan-500/20"
          >
            <span>Open Physics Lab</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Featured 4 Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {featuredTools.map(tool => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                onClick={() => onNavigate('tools')}
                className="group p-5 rounded-xl border border-slate-800 bg-slate-950/70 hover:border-cyan-500/40 transition cursor-pointer flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold font-display text-slate-200 group-hover:text-cyan-300 transition">
                    {tool.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>
                <div className="text-[10px] font-mono text-cyan-400/80 flex items-center gap-1">
                  <span>Launch tool</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =======================================================
          9. CONTACT SECTION
          ======================================================= */}
      <section id="contact">
        <ContactSection />
      </section>

      {/* Full Project Detail Modal */}
      <ProjectDetailModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
        onNavigateToTools={toolId => onNavigate('tools', toolId)}
      />
    </div>
  );
};

export default HomePage;
