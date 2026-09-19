import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  FileText,
  Download,
  Printer,
  ExternalLink,
  ArrowLeft,
  Calendar,
  Tag,
  FolderOpen,
  Info
} from 'lucide-react';
import { NOTES_DATA } from '../data/notes';
import { Note } from '../types';

interface NotesReaderProps {
  onOpenSimulation?: (simId: string) => void;
}

const SUBJECT_CATEGORIES = [
  'All',
  'Quantum Mechanics',
  'Quantum Chemistry',
  'Classical Mechanics',
  'Electromagnetism',
  'Mathematical Physics',
  'Electronics',
  'Experimental Physics',
  'Other'
];

export const NotesReader: React.FC<NotesReaderProps> = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  // Filter notes based on subject and search term
  const filteredNotes = useMemo(() => {
    return NOTES_DATA.filter(n => {
      const subject = n.subject || n.category || 'Other';
      const matchSubject =
        selectedSubject === 'All' ||
        subject.toLowerCase() === selectedSubject.toLowerCase();

      const query = searchTerm.toLowerCase().trim();
      const matchSearch =
        !query ||
        n.title.toLowerCase().includes(query) ||
        (n.topic && n.topic.toLowerCase().includes(query)) ||
        n.description.toLowerCase().includes(query) ||
        subject.toLowerCase().includes(query);

      return matchSubject && matchSearch;
    });
  }, [searchTerm, selectedSubject]);

  // Currently opened note in Reader view
  const activeNote = useMemo(() => {
    if (!activeNoteId) return null;
    return NOTES_DATA.find(n => n.id === activeNoteId) || null;
  }, [activeNoteId]);

  // Clean printing handler that targets the PDF directly
  const handlePrintPdf = (pdfUrl: string) => {
    // If the PDF iframe is currently rendered, invoke native iframe print
    const iframe = document.getElementById('pdf-reader-frame') as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      try {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        return;
      } catch {
        // Fallback if cross-origin policy blocks direct window access
      }
    }

    // Direct standalone print window targeting only the PDF document
    const printWindow = window.open(pdfUrl, '_blank');
    if (printWindow) {
      printWindow.addEventListener('load', () => {
        printWindow.print();
      });
    }
  };

  // Helper to format file name
  const getPdfFileName = (pdfUrl: string) => {
    return pdfUrl.split('/').pop() || 'note.pdf';
  };

  return (
    <div className="space-y-8">
      {/* If a note is opened, show the Document-Style PDF Reader */}
      {activeNote ? (
        <div className="space-y-6">
          {/* Reader Top Action Bar */}
          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/80 p-5 md:p-6 backdrop-blur-md space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Back to library button */}
              <button
                id="btn-back-to-library"
                onClick={() => setActiveNoteId(null)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-semibold text-xs transition shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Notes Library</span>
              </button>

              {/* Action Buttons: Download, Print, Open in New Tab */}
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={activeNote.pdfUrl}
                  download={getPdfFileName(activeNote.pdfUrl)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 text-cyan-200 border border-cyan-500/40 text-xs font-semibold font-mono transition"
                  title="Download original PDF file"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>

                <button
                  onClick={() => handlePrintPdf(activeNote.pdfUrl)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold font-mono transition"
                  title="Print PDF document"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-300" />
                  <span>Print Document</span>
                </button>

                <a
                  href={activeNote.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold font-mono transition"
                  title="Open PDF in a fresh browser tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Open in New Tab</span>
                </a>
              </div>
            </div>

            {/* Note Metadata Heading */}
            <div className="pt-3 border-t border-slate-800/80 space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="px-2.5 py-0.5 rounded-md bg-cyan-950/90 text-cyan-300 border border-cyan-500/30 font-semibold">
                  {activeNote.subject || activeNote.category}
                </span>
                {activeNote.topic && (
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700">
                    Topic: {activeNote.topic}
                  </span>
                )}
                {activeNote.date && (
                  <span className="flex items-center gap-1 text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    {activeNote.date}
                  </span>
                )}
                <span className="flex items-center gap-1 text-slate-400">
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  {getPdfFileName(activeNote.pdfUrl)}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold font-display text-slate-100">
                {activeNote.title}
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
                {activeNote.description}
              </p>
            </div>
          </div>

          {/* Genuine Document-Style PDF Viewer Stage */}
          <div className="rounded-2xl border border-slate-700/60 bg-slate-950 p-2 sm:p-3 shadow-2xl space-y-2">
            <div className="relative w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800 h-[72vh] sm:h-[82vh]">
              <iframe
                id="pdf-reader-frame"
                src={`${activeNote.pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
                title={activeNote.title}
                className="w-full h-full border-0 rounded-xl bg-slate-900"
              />
            </div>

            {/* Mobile / Fallback Helper */}
            <div className="px-3 py-2 text-[11px] font-mono text-slate-400 flex flex-wrap items-center justify-between gap-2 border-t border-slate-850">
              <span>Displaying original PDF document layout with native zoom, search, and page navigation.</span>
              <div className="flex items-center gap-3">
                <a
                  href={activeNote.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline inline-flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" /> Fullscreen PDF
                </a>
                <a
                  href={activeNote.pdfUrl}
                  download={getPdfFileName(activeNote.pdfUrl)}
                  className="text-cyan-400 hover:text-cyan-300 underline inline-flex items-center gap-1"
                >
                  <Download className="w-3 h-3" /> Save to Device
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Library View: Overview of All PDF Notes */
        <div className="space-y-8">
          {/* Header Banner */}
          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-6 md:p-8 backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold mb-2">
                  <BookOpen className="w-4 h-4" />
                  Academic PDF Notes Library
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-100">
                  Physics Manuscripts & Study Notes
                </h1>
                <p className="text-sm text-slate-400 max-w-2xl mt-1">
                  Compiled study notes and theoretical manuscripts saved directly as PDF documents. View in the browser, download original files, or print for physical study.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-medium"
                  placeholder="Search notes by title, topic, or keyword..."
                />
              </div>
            </div>

            {/* Category / Subject Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pt-5 mt-5 border-t border-slate-800 scrollbar-none">
              {SUBJECT_CATEGORIES.map(subject => {
                const isSelected = selectedSubject === subject;
                return (
                  <button
                    key={subject}
                    onClick={() => setSelectedSubject(subject)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
                        : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/60'
                    }`}
                  >
                    {subject}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes Document Library Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">
              <span>Available Documents ({filteredNotes.length})</span>
              <span className="font-mono text-cyan-400 text-[11px]">Original PDF Format</span>
            </div>

            {filteredNotes.length === 0 ? (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center space-y-3">
                <FolderOpen className="w-10 h-10 text-slate-600 mx-auto" />
                <h3 className="text-base font-semibold text-slate-300">No notes found matching your search</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting your search terms or clearing the subject filter.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedSubject('All');
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-cyan-400 hover:bg-slate-700 text-xs font-semibold transition"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredNotes.map((note: Note) => (
                  <div
                    key={note.id}
                    className="rounded-2xl border border-slate-800 bg-slate-900/70 hover:border-slate-700 p-6 backdrop-blur-sm transition-all flex flex-col justify-between space-y-4 shadow-sm group hover:shadow-cyan-950/20"
                  >
                    <div className="space-y-3">
                      {/* Subject, Topic, Date Tag Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                        <span className="px-2.5 py-0.5 rounded-md bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 text-[11px] font-semibold">
                          {note.subject || note.category}
                        </span>
                        {note.date && (
                          <span className="flex items-center gap-1 text-[11px] text-slate-400">
                            <Calendar className="w-3 h-3 text-slate-500" />
                            {note.date}
                          </span>
                        )}
                      </div>

                      {/* Topic Sub-heading */}
                      {note.topic && (
                        <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                          <Tag className="w-3 h-3 text-cyan-400" />
                          <span>{note.topic}</span>
                        </div>
                      )}

                      {/* Title */}
                      <h2
                        onClick={() => setActiveNoteId(note.id)}
                        className="text-lg font-bold font-display text-slate-100 group-hover:text-cyan-200 transition cursor-pointer"
                      >
                        {note.title}
                      </h2>

                      {/* Short Description */}
                      <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                        {note.description}
                      </p>
                    </div>

                    {/* Footer Actions: Open / Download / Print */}
                    <div className="pt-4 border-t border-slate-800/80 space-y-3">
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span className="flex items-center gap-1 text-slate-400 truncate max-w-[200px]">
                          <FileText className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span className="truncate">{getPdfFileName(note.pdfUrl)}</span>
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          PDF
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        {/* Open / View Button */}
                        <button
                          onClick={() => setActiveNoteId(note.id)}
                          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition shadow-sm shadow-cyan-500/10"
                          title="Open PDF document in viewer"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Read</span>
                        </button>

                        {/* Download Button */}
                        <a
                          href={note.pdfUrl}
                          download={getPdfFileName(note.pdfUrl)}
                          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition"
                          title="Download original PDF"
                        >
                          <Download className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Download</span>
                        </a>

                        {/* Print Button */}
                        <button
                          onClick={() => handlePrintPdf(note.pdfUrl)}
                          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition"
                          title="Print PDF document"
                        >
                          <Printer className="w-3.5 h-3.5 text-slate-300" />
                          <span>Print</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Simple Guide for Site Maintenance */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold">
              <Info className="w-4 h-4" />
              <span>How to Add New PDF Notes</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Adding new notes to this academic library is completely manual and static-site friendly:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-cyan-400 font-semibold block">Step 1: Add PDF File</span>
                <span className="text-slate-400 block text-[11px]">
                  Place your document inside <code className="text-slate-200">public/notes/pdf/your-note.pdf</code>
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-cyan-400 font-semibold block">Step 2: Add Entry in Data</span>
                <span className="text-slate-400 block text-[11px]">
                  Add a 6-line object to the <code className="text-slate-200">NOTES_DATA</code> array in <code className="text-slate-200">src/data/notes.ts</code>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesReader;
