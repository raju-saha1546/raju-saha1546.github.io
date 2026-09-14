import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CommandPalette from './components/common/CommandPalette';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import JourneyPage from './components/journey/JourneyPage';
import ProjectsShowcase from './components/projects/ProjectsShowcase';
import NotesReader from './components/notes/NotesReader';
import LabNotebookViewer from './components/lab/LabNotebookViewer';
import ToolsPlatform from './components/tools/ToolsPlatform';
import ContactSection from './components/contact/ContactSection';

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
  const initialRoute = parseCurrentRoute();
  const [activeTab, setActiveTab] = useState<string>(initialRoute.tab);
  const [activeItemId, setActiveItemId] = useState<string | undefined>(initialRoute.subId);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  useEffect(() => {
    const syncFromLocation = () => {
      const route = parseCurrentRoute();
      setActiveTab(route.tab);
      if (route.subId) setActiveItemId(route.subId);
    };

    window.addEventListener('popstate', syncFromLocation);
    window.addEventListener('hashchange', syncFromLocation);
    return () => {
      window.removeEventListener('popstate', syncFromLocation);
      window.removeEventListener('hashchange', syncFromLocation);
    };
  }, []);

  const handleNavigate = (tab: string, subId?: string) => {
    // Normalization for aliases
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
    <div className="min-h-screen bg-[#05070d] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-[30rem] h-[30rem] bg-blue-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Global Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {activeTab === 'home' && <HomePage onNavigate={handleNavigate} />}
        {activeTab === 'about' && <AboutPage onNavigate={handleNavigate} />}
        {activeTab === 'journey' && <JourneyPage onNavigate={handleNavigate} />}
        {activeTab === 'projects' && <ProjectsShowcase />}
        {activeTab === 'notes' && <NotesReader onOpenSimulation={id => handleNavigate('tools', id)} />}
        {activeTab === 'lab' && <LabNotebookViewer />}
        {activeTab === 'tools' && <ToolsPlatform initialItemId={activeItemId || 'resistor'} />}
        {activeTab === 'contact' && <ContactSection />}
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
