import React, { useState } from 'react';
import { Mail, Github, Linkedin, MapPin, Send, MessageSquare, ExternalLink, CheckCircle2 } from 'lucide-react';
import { PERSONAL_DATA } from '../../data/personal';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-6 md:p-8 backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold mb-2">
          <MessageSquare className="w-4 h-4" />
          Get In Touch
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-100">
          Contact & Academic Inquiries
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl mt-1.5 leading-relaxed">
          I welcome conversations about physics coursework, mathematical derivations, simulation algorithms, or collaborative student projects.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Contact Info & Links */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-6">
            <h2 className="text-lg font-bold font-display text-slate-100">
              Direct Channels
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              {PERSONAL_DATA.contact.note}
            </p>

            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    Email (Placeholder)
                  </div>
                  <a
                    href={`mailto:${PERSONAL_DATA.contact.email}`}
                    className="text-xs font-mono text-cyan-300 hover:underline truncate block"
                  >
                    {PERSONAL_DATA.contact.email}
                  </a>
                </div>
              </div>

              {/* GitHub */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Github className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    GitHub Profile
                  </div>
                  <a
                    href={PERSONAL_DATA.contact.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-slate-200 hover:text-cyan-300 flex items-center gap-1 truncate"
                  >
                    <span>raju-saha1546</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    LinkedIn (Placeholder)
                  </div>
                  <a
                    href={PERSONAL_DATA.contact.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-slate-300 hover:text-cyan-300 flex items-center gap-1 truncate"
                  >
                    <span>linkedin.com/in/raju-physics</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    Academic Location
                  </div>
                  <div className="text-xs font-mono text-slate-300">
                    {PERSONAL_DATA.contact.location}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-slate-400 space-y-1">
              <span className="text-cyan-300 font-semibold font-mono">Editable Placeholder Notice:</span>
              <p>
                All email and external social links are editable placeholders configured in <code className="text-cyan-300">src/data/personal.ts</code>.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Message Form */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-bold font-display text-slate-100">
              Send a Message
            </h2>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h3 className="text-sm font-bold text-emerald-200">Message Dispatched</h3>
                <p className="text-xs text-emerald-300/80">
                  Thank you for reaching out! In this static build, queries can also be sent directly to the email address on the left.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={e => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Marie Curie"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">Your Email</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={e => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. marie@physics.org"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">Subject / Discussion Topic</label>
                  <input
                    type="text"
                    required
                    value={formState.subject}
                    onChange={e => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="e.g. Question on 1D Schrödinger simulation or laboratory data analysis"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formState.message}
                    onChange={e => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Write your thoughts, physics question, or project inquiry..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition shadow-md shadow-cyan-500/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
