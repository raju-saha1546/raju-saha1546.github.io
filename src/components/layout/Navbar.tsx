import React, { useState } from 'react';
import {
  Atom,
  User,
  Milestone,
  FolderGit2,
  BookOpen,
  ClipboardList,
  Wrench,
  Mail,
  Search,
  Menu,
  X,
  Github
} from 'lucide-react';
import { PERSONAL_DATA } from '../../data/personal';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Atom },
    { id: 'about', label: 'About', icon: User },
    { id: 'journey', label: 'Journey', icon: Milestone },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'notes', label: 'Notes', icon: BookOpen },
    { id: 'lab', label: 'Lab', icon: ClipboardList },
    { id: 'tools', label: 'Tools', icon: Wrench },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo / Identity */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition shadow-sm">
              <Atom className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <div>
              <div className="font-display font-bold text-slate-100 text-sm tracking-tight flex items-center gap-1.5">
                Raju
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span className="text-slate-400 font-mono text-xs font-normal">Physics Student</span>
              </div>
              <div className="text-[10px] font-mono text-slate-400 tracking-wider">
                Physics • Computation • Experiments
              </div>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive =
                activeTab === item.id ||
                (item.id === 'lab' && activeTab === 'experiments') ||
                (item.id === 'tools' && activeTab === 'simulations');
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Actions: Command Search & GitHub */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-cyan-500/50 text-slate-400 hover:text-slate-200 text-xs transition"
              title="Search notebooks, tools, and simulations (Cmd/Ctrl + K)"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline font-sans text-[11px]">Search</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono bg-slate-800 text-slate-400 rounded border border-slate-700">
                ⌘K
              </kbd>
            </button>

            <a
              href={PERSONAL_DATA.contact.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-400 hover:text-slate-200 hover:border-slate-600 transition"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-slate-200"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950/95 px-4 pt-2 pb-5 space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive =
              activeTab === item.id ||
              (item.id === 'lab' && activeTab === 'experiments') ||
              (item.id === 'tools' && activeTab === 'simulations');
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4 text-cyan-400" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
