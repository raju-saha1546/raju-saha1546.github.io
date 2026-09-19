import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';
import Home from './pages/Home';
import About from './pages/About';
import Journey from './pages/Journey';
import Projects from './pages/Projects';
import Notes from './pages/Notes';
import Lab from './pages/Lab';
import Tools from './pages/Tools';
import Contact from './pages/Contact';
import { useTheme } from './context/ThemeContext';

const VALID_TABS = ['home', 'about', 'journey', 'projects', 'notes', 'lab', 'tools', 'contact'];

function parseCurrentRoute(): { tab: string; subId?: string } {
  if (typeof window === 'undefined') return { tab: 'home' };

  // 1. Check URL hash first (e.g. #projects, #/lab, #tools/double-pendulum)
  const rawHash = window.location.hash.replace(/^#\/?/, '').trim();
  if (rawHash) {
    const parts = rawHash.split(/[/?:&=]/).filter(Boolean);
    const first = parts[0]?.toLowerCase();
    const sub = parts.length > 1 ? parts[1] : undefined;
    if (VALID_TABS.includes(first)) return { tab: first, subId: sub };
    if (first === 'simulations') return { tab: 'tools', subId: sub };
    if (first === 'experiments') return { tab: 'lab', subId: sub };
  }

  // 2. Check pathname (e.g. /projects, /notes, /lab)
  const path = window.location.pathname.replace(/^\/|\/$/g, '').trim();
  if (path) {
    const segments = path.split('/').filter(Boolean);
    const first = segments[0]?.toLowerCase();
    const sub = segments.length > 1 ? segments[1] : undefined;
    if (VALID_TABS.includes(first)) return { tab: first, subId: sub };
    if (first === 'simulations') return { tab: 'tools', subId: sub };
    if (first === 'experiments') return { tab: 'lab', subId: sub };
  }

  return { tab: 'home' };
}

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [activeItemId, setActiveItemId] = useState<string | undefined>(undefined);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Synchronize with URL hash / path on mount and on popstate (browser back/forward)
  useEffect(() => {
    const syncRoute = () => {
      const { tab, subId } = parseCurrentRoute();
      setActiveTab(tab);
      if (subId) setActiveItemId(subId);
    };

    syncRoute();
    window.addEventListener('popstate', syncRoute);
    window.addEventListener('hashchange', syncRoute);

    return () => {
      window.removeEventListener('popstate', syncRoute);
      window.removeEventListener('hashchange', syncRoute);
    };
  }, []);

  // Keyboard shortcut for Command Palette (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (tab: string, subId?: string) => {
    let targetTab = tab;
    if (tab === 'simulations') {
      targetTab = 'tools';
    } else if (tab === 'experiments') {
      targetTab = 'lab';
    }

    setActiveTab(targetTab);
    if (subId) setActiveItemId(subId);

    // Update URL hash to support direct link sharing and back/forward navigation
    const targetHash = subId ? `#${targetTab}/${subId}` : `#${targetTab}`;
    if (window.location.hash !== targetHash) {
      window.history.pushState(null, '', targetHash);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`app-container min-h-screen flex flex-col transition-colors duration-200 selection:bg-cyan-500/30 selection:text-cyan-200 ${
        isDark
          ? 'bg-[#080c14] text-slate-100'
          : 'bg-[#f8fafc] text-slate-900'
      }`}
    >
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl transition-opacity duration-300 ${
            isDark ? 'bg-cyan-500/5' : 'bg-cyan-500/10'
          }`}
        ></div>
        <div
          className={`absolute top-1/3 right-1/4 w-[30rem] h-[30rem] rounded-full blur-3xl transition-opacity duration-300 ${
            isDark ? 'bg-blue-600/5' : 'bg-blue-500/10'
          }`}
        ></div>
        <div
          className={`absolute bottom-10 left-1/3 w-80 h-80 rounded-full blur-3xl transition-opacity duration-300 ${
            isDark ? 'bg-indigo-500/5' : 'bg-indigo-500/10'
          }`}
        ></div>
      </div>

      {/* Global Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {activeTab === 'home' && <Home onNavigate={handleNavigate} />}
        {activeTab === 'about' && <About onNavigate={handleNavigate} />}
        {activeTab === 'journey' && <Journey onNavigate={handleNavigate} />}
        {activeTab === 'projects' && <Projects />}
        {activeTab === 'notes' && <Notes onOpenSimulation={id => handleNavigate('tools', id)} />}
        {activeTab === 'lab' && <Lab />}
        {activeTab === 'tools' && <Tools initialItemId={activeItemId || 'resistor'} />}
        {activeTab === 'contact' && <Contact />}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Command Palette Search Modal */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
