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
  Github,
  Sun,
  Moon
} from 'lucide-react';
import { PERSONAL_DATA } from '../data/personal';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

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

  const isDark = theme === 'dark';

  return (
    <nav
      className={`sticky top-0 z-40 border-b transition-colors duration-200 backdrop-blur-xl ${
        isDark
          ? 'border-slate-800/80 bg-slate-950/80'
          : 'border-slate-200/80 bg-white/85 shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo / Identity */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div
              className={`w-9 h-9 rounded-xl border flex items-center justify-center transition shadow-sm ${
                isDark
                  ? 'bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-cyan-500/40 text-cyan-400 group-hover:border-cyan-400'
                  : 'bg-cyan-50 border-cyan-200 text-cyan-700 group-hover:border-cyan-400'
              }`}
            >
              <Atom className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <div>
              <div
                className={`font-display font-bold text-sm tracking-tight flex items-center gap-1.5 ${
                  isDark ? 'text-slate-100' : 'text-slate-900'
                }`}
              >
                Raju
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                <span
                  className={`font-mono text-xs font-normal ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  Physics Student
                </span>
              </div>
              <div
                className={`text-[10px] font-mono tracking-wider ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
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
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? isDark
                        ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-sm'
                        : 'bg-cyan-50 text-cyan-800 border border-cyan-200 font-bold shadow-xs'
                      : isDark
                      ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Actions: Theme Toggle, Command Search & GitHub */}
          <div className="flex items-center gap-2">
            {/* Dark / Light Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl border transition cursor-pointer flex items-center justify-center ${
                isDark
                  ? 'bg-slate-900 border-slate-700/80 text-amber-300 hover:text-amber-200 hover:border-amber-400/50 hover:bg-slate-800/80'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-cyan-700 hover:border-cyan-400 hover:bg-slate-200/80'
              }`}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? (
                <Sun className="w-4 h-4 transition-transform duration-300 hover:rotate-45 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 transition-transform duration-300 hover:-rotate-12 text-slate-700" />
              )}
            </button>

            {/* Quick Search */}
            <button
              onClick={onOpenSearch}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition cursor-pointer ${
                isDark
                  ? 'bg-slate-900 border-slate-700/80 hover:border-cyan-500/50 text-slate-400 hover:text-slate-200'
                  : 'bg-slate-100 border-slate-300 hover:border-cyan-500/50 text-slate-600 hover:text-slate-900'
              }`}
              title="Search notebooks, tools, and simulations (Cmd/Ctrl + K)"
            >
              <Search className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
              <span className="hidden sm:inline font-sans text-[11px]">Search</span>
              <kbd
                className={`hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono rounded border ${
                  isDark
                    ? 'bg-slate-800 text-slate-400 border-slate-700'
                    : 'bg-white text-slate-500 border-slate-300'
                }`}
              >
                ⌘K
              </kbd>
            </button>

            {/* GitHub Link */}
            <a
              href={PERSONAL_DATA.contact.github}
              target="_blank"
              rel="noreferrer"
              className={`p-2 rounded-xl border transition ${
                isDark
                  ? 'bg-slate-900/80 border-slate-700/80 text-slate-400 hover:text-slate-200 hover:border-slate-600'
                  : 'bg-slate-100 border-slate-300 text-slate-600 hover:text-slate-900 hover:border-slate-400'
              }`}
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-xl border ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-slate-900'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-b px-4 pt-2 pb-5 space-y-1 ${
            isDark
              ? 'border-slate-800 bg-slate-950/95'
              : 'border-slate-200 bg-white/95 shadow-md'
          }`}
        >
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
                    ? isDark
                      ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                      : 'bg-cyan-50 text-cyan-800 border border-cyan-200'
                    : isDark
                    ? 'text-slate-300 hover:bg-slate-900'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
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
