import React from 'react';
import { Atom, Github, Mail, ArrowUpRight } from 'lucide-react';
import { PERSONAL_DATA } from '../data/personal';
import { useTheme } from '../context/ThemeContext';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <footer
      className={`border-t mt-20 text-xs transition-colors duration-200 ${
        isDark
          ? 'border-slate-800/80 bg-slate-950 text-slate-400'
          : 'border-slate-200 bg-slate-100/80 text-slate-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          {/* Col 1: Bio / Brand */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-7 h-7 rounded-lg border flex items-center justify-center ${
                  isDark
                    ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400'
                    : 'bg-cyan-50 border-cyan-300 text-cyan-700'
                }`}
              >
                <Atom className="w-4 h-4" />
              </div>
              <span
                className={`font-display font-bold text-sm ${
                  isDark ? 'text-slate-100' : 'text-slate-900'
                }`}
              >
                {PERSONAL_DATA.name} • Physics Student
              </span>
            </div>

            <p
              className={`leading-relaxed max-w-sm ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Exploring physics through theory, mathematics, computation, experimentation, electronics, and code. Documenting my undergraduate journey from first principles.
            </p>

            <div
              className={`font-mono text-[11px] pt-1 ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Physics • Computation • Experiments
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-4 space-y-2">
            <h4
              className={`font-mono text-[11px] uppercase tracking-wider font-semibold mb-3 ${
                isDark ? 'text-slate-200' : 'text-slate-900'
              }`}
            >
              Portfolio & Notebook
            </h4>
            <div className="grid grid-cols-2 gap-2 font-medium">
              <button
                onClick={() => onNavigate('home')}
                className={`text-left transition cursor-pointer ${
                  isDark ? 'hover:text-cyan-400' : 'hover:text-cyan-700'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => onNavigate('about')}
                className={`text-left transition cursor-pointer ${
                  isDark ? 'hover:text-cyan-400' : 'hover:text-cyan-700'
                }`}
              >
                About
              </button>
              <button
                onClick={() => onNavigate('journey')}
                className={`text-left transition cursor-pointer ${
                  isDark ? 'hover:text-cyan-400' : 'hover:text-cyan-700'
                }`}
              >
                Journey Timeline
              </button>
              <button
                onClick={() => onNavigate('projects')}
                className={`text-left transition cursor-pointer ${
                  isDark ? 'hover:text-cyan-400' : 'hover:text-cyan-700'
                }`}
              >
                Projects Showcase
              </button>
              <button
                onClick={() => onNavigate('notes')}
                className={`text-left transition cursor-pointer ${
                  isDark ? 'hover:text-cyan-400' : 'hover:text-cyan-700'
                }`}
              >
                Physics Notes
              </button>
              <button
                onClick={() => onNavigate('lab')}
                className={`text-left transition cursor-pointer ${
                  isDark ? 'hover:text-cyan-400' : 'hover:text-cyan-700'
                }`}
              >
                Lab Notebook
              </button>
              <button
                onClick={() => onNavigate('tools')}
                className={`text-left transition cursor-pointer ${
                  isDark ? 'hover:text-cyan-400' : 'hover:text-cyan-700'
                }`}
              >
                My Physics Lab
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className={`text-left transition cursor-pointer ${
                  isDark ? 'hover:text-cyan-400' : 'hover:text-cyan-700'
                }`}
              >
                Contact
              </button>
            </div>
          </div>

          {/* Col 3: Academic Channels */}
          <div className="md:col-span-3 space-y-3">
            <h4
              className={`font-mono text-[11px] uppercase tracking-wider font-semibold ${
                isDark ? 'text-slate-200' : 'text-slate-900'
              }`}
            >
              Connect & Source
            </h4>
            <div className="space-y-2 font-mono text-xs">
              <a
                href={PERSONAL_DATA.contact.github}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-2 transition ${
                  isDark ? 'hover:text-cyan-300' : 'hover:text-cyan-700'
                }`}
              >
                <Github className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
                <span>raju-saha1546</span>
                <ArrowUpRight className="w-3 h-3 text-slate-400" />
              </a>
              <button
                onClick={() => onNavigate('contact')}
                className={`flex items-center gap-2 transition cursor-pointer ${
                  isDark ? 'hover:text-cyan-300' : 'hover:text-cyan-700'
                }`}
              >
                <Mail className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
                <span>{PERSONAL_DATA.contact.email}</span>
              </button>
            </div>
            <div
              className={`text-[11px] pt-1 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              {PERSONAL_DATA.contact.note}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`pt-8 border-t flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono ${
            isDark
              ? 'border-slate-900 text-slate-400'
              : 'border-slate-200 text-slate-500'
          }`}
        >
          <div>
            © {new Date().getFullYear()} {PERSONAL_DATA.name}. Crafted for scientific exploration & physics learning.
          </div>
          <div className="flex items-center gap-4">
            <span>KaTeX & Math Rendering</span>
            <span>•</span>
            <span>Static SPA (GitHub Pages Ready)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
