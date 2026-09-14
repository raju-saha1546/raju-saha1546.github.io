import React, { useState } from 'react';
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

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [activeItemId, setActiveItemId] = useState<string | undefined>(undefined);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const handleNavigate = (tab: string, subId?: string) => {
    // Normalization for aliases
    if (tab === 'simulations') {
      setActiveTab('tools');
      if (subId) setActiveItemId(subId);
    } else if (tab === 'experiments') {
      setActiveTab('lab');
      if (subId) setActiveItemId(subId);
    } else {
      setActiveTab(tab);
      if (subId) setActiveItemId(subId);
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
