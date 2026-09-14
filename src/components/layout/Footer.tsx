import React from 'react';
import { Atom, Github, Mail, Linkedin, ArrowUpRight } from 'lucide-react';
import { PERSONAL_DATA } from '../../data/personal';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 mt-20 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          {/* Col 1: Bio / Brand */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Atom className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-slate-100 text-sm">
                Raju • Physics Student
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              Exploring physics through theory, mathematics, computation, experimentation, electronics, and code. Documenting my undergraduate journey from first principles.
            </p>

            <div className="font-mono text-slate-400 text-[11px] pt-1">
              Physics • Computation • Experiments
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-slate-200 font-semibold mb-3">
              Portfolio & Notebook
            </h4>
            <div className="grid grid-cols-2 gap-2 font-medium">
              <button onClick={() => onNavigate('home')} className="text-left hover:text-cyan-400 transition">
                Home
              </button>
              <button onClick={() => onNavigate('about')} className="text-left hover:text-cyan-400 transition">
                About
              </button>
              <button onClick={() => onNavigate('journey')} className="text-left hover:text-cyan-400 transition">
                Journey Timeline
              </button>
              <button onClick={() => onNavigate('projects')} className="text-left hover:text-cyan-400 transition">
                Projects Showcase
              </button>
              <button onClick={() => onNavigate('notes')} className="text-left hover:text-cyan-400 transition">
                Physics Notes
              </button>
              <button onClick={() => onNavigate('lab')} className="text-left hover:text-cyan-400 transition">
                Lab Notebook
              </button>
              <button onClick={() => onNavigate('tools')} className="text-left hover:text-cyan-400 transition">
                My Physics Lab
              </button>
              <button onClick={() => onNavigate('contact')} className="text-left hover:text-cyan-400 transition">
                Contact
              </button>
            </div>
          </div>

          {/* Col 3: Academic Channels */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-slate-200 font-semibold">
              Connect & Source
            </h4>
            <div className="space-y-2 font-mono text-xs">
              <a
                href={PERSONAL_DATA.contact.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-cyan-300 transition"
              >
                <Github className="w-3.5 h-3.5 text-cyan-400" />
                <span>raju-saha1546</span>
                <ArrowUpRight className="w-3 h-3 text-slate-400" />
              </a>
              <button
                onClick={() => onNavigate('contact')}
                className="flex items-center gap-2 hover:text-cyan-300 transition"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{PERSONAL_DATA.contact.email}</span>
              </button>
            </div>
            <div className="text-[11px] text-slate-400 pt-1">
              {PERSONAL_DATA.contact.note}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-slate-400">
          <div>
            © {new Date().getFullYear()} Raju. Crafted for scientific exploration & physics learning.
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
