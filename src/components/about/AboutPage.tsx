import React from 'react';
import {
  User,
  Atom,
  BookOpen,
  Cpu,
  Terminal,
  Compass,
  GraduationCap,
  Sparkles,
  Camera,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Code
} from 'lucide-react';
import { PERSONAL_DATA } from '../../data/personal';
import MathView from '../common/MathView';

interface AboutPageProps {
  onNavigate?: (tab: string, subId?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const competencies = [
    {
      category: 'Theory & Mathematical Modeling',
      icon: Atom,
      description: 'Deriving physical laws from first principles, variational action methods, and boundary-value differential systems.',
      skills: ['Lagrangian & Hamiltonian Mechanics', 'Wave Equation & Superposition', 'Schrödinger Equation & Operators', 'Vector Calculus & Complex Analysis']
    },
    {
      category: 'Computation & Numerical Simulation',
      icon: Terminal,
      description: 'Formulating stable numerical algorithms to model nonlinear dynamical and quantum systems.',
      skills: ['Python (NumPy, SciPy, Matplotlib)', 'C / C++ Numerical Routines', 'Runge-Kutta (RK4) Schemes', 'Crank-Nicolson PDE Integration']
    },
    {
      category: 'Laboratory & Experimental Practice',
      icon: Compass,
      description: 'Taking physical bench measurements, characterizing sensors, and performing rigorous uncertainty propagation.',
      skills: ['Digital Oscilloscopes & DMMs', '4-Wire Kelvin Sensing', 'Least-Squares Regression & Residuals', 'Systematic Error Budgets']
    },
    {
      category: 'Electronics & Hardware',
      icon: Cpu,
      description: 'Prototyping analog signal conditioning and discrete digital logic circuits on solderless breadboards.',
      skills: ['74LS Series TTL Logic', 'Operational Amplifiers & Active Filters', 'Microcontroller Interfacing (Arduino)', 'Sensor Signal Conditioning']
    }
  ];

  return (
    <div className="space-y-12">
      {/* Top Banner */}
      <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-6 md:p-8 backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold mb-2">
          <User className="w-4 h-4" />
          Academic Profile & Scientific Philosophy
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-100">
          About Raju
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl mt-1.5 leading-relaxed">
          Undergraduate physics student driven by curiosity, mathematical reasoning, hands-on experimentation, and scientific programming.
        </p>
      </div>

      {/* Main Profile & Story Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Profile Photo Placeholder & Quick Facts */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 text-center space-y-5">
            {/* Profile Photo Placeholder */}
            <div className="relative mx-auto w-36 h-36 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 border-2 border-dashed border-cyan-500/40 flex flex-col items-center justify-center p-4 group hover:border-cyan-400 transition">
              <Camera className="w-8 h-8 text-cyan-400/70 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-mono text-cyan-300 font-semibold">
                Photo Placeholder
              </span>
              <span className="text-[9px] text-slate-400">
                Replace with portrait
              </span>
            </div>

            <div>
              <h2 className="text-xl font-bold font-display text-slate-100">
                {PERSONAL_DATA.name}
              </h2>
              <div className="text-xs font-mono text-cyan-400 mt-0.5">
                {PERSONAL_DATA.role}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {PERSONAL_DATA.tagline}
              </div>
            </div>

            {/* Quick Meta List */}
            <div className="border-t border-slate-800/80 pt-4 text-left space-y-2.5 text-xs font-mono">
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Focus:</span>
                <span className="text-slate-200">Theory & Computation</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Status:</span>
                <span className="text-cyan-300">Undergraduate Student</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Toolkit:</span>
                <span className="text-slate-200">Python, C, LaTeX, Arduino</span>
              </div>
            </div>

            {onNavigate && (
              <button
                onClick={() => onNavigate('contact')}
                className="w-full py-2 px-4 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-semibold transition"
              >
                Send Academic Message
              </button>
            )}
          </div>

          {/* Guiding Principles Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
              How I Approach Physics
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">•</span>
                <span>Unpack the mathematical reasoning behind every equation rather than treating it as a black box.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">•</span>
                <span>Cross-check analytical models against bench measurements to quantify real-world uncertainties.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">•</span>
                <span>Use code and simulation to gain physical intuition for nonlinear or chaotic systems.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">•</span>
                <span>Document derivations, circuit quirks, and error budgets rigorously in my notebook.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right: Personal Narrative */}
        <div className="lg:col-span-8 space-y-8">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-100">
                Who I Am & What Drives Me
              </h2>
              <p className="text-xs font-mono text-cyan-400">
                {PERSONAL_DATA.mainStatement}
              </p>
            </div>

            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              {PERSONAL_DATA.aboutParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Quote / Formula Callout */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="text-xs font-mono text-slate-400">
                Foundational Principle I Think About Often:
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-cyan-300">
                <span>Hamilton's Principle of Stationary Action:</span>
                <MathView math="\delta S = \delta \int_{t_1}^{t_2} \mathcal{L}(q, \dot{q}, t)\, dt = 0" />
              </div>
              <p className="text-[11px] text-slate-400 italic">
                From a single variational principle, the equations of motion for Newtonian mechanics, optics, and quantum path integrals naturally unfold.
              </p>
            </div>
          </div>

          {/* Competency Pillars */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold font-display text-slate-100">
              Areas of Competency & Active Study
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {competencies.map((comp, idx) => {
                const Icon = comp.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3"
                  >
                    <div className="flex items-center gap-2 text-cyan-400">
                      <Icon className="w-4 h-4" />
                      <h3 className="text-xs font-bold font-display text-slate-200">
                        {comp.category}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {comp.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                      {comp.skills.map((s, si) => (
                        <span
                          key={si}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950 text-slate-300 border border-slate-800"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
