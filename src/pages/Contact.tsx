import React, { useState } from 'react';
import { Mail, Github, MapPin, Send, MessageSquare, ExternalLink, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { PERSONAL_DATA } from '../data/personal';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const errors: FormErrors = {};

    if (!formState.name.trim()) {
      errors.name = 'Please provide your name.';
    }

    if (!formState.email.trim()) {
      errors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email.trim())) {
      errors.email = 'Please enter a valid email address (e.g. name@domain.com).';
    }

    if (!formState.subject.trim()) {
      errors.subject = 'Please enter a subject or topic.';
    }

    if (!formState.message.trim()) {
      errors.message = 'Please enter your message.';
    } else if (formState.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError(null);

    if (!validate()) {
      return;
    }

    const web3FormsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    const formspreeId = import.meta.env.VITE_FORMSPREE_FORM_ID;
    const customEndpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;

    // Check if a static site form service is configured
    if (!web3FormsKey && !formspreeId && !customEndpoint) {
      setStatus('error');
      setGlobalError(
        'Contact service is not configured yet. Please configure VITE_WEB3FORMS_ACCESS_KEY or VITE_FORMSPREE_FORM_ID in your environment variables. In the meantime, you can email directly at ' +
          PERSONAL_DATA.contact.email
      );
      return;
    }

    setStatus('loading');

    try {
      if (web3FormsKey) {
        // Web3Forms API submission
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: web3FormsKey,
            name: formState.name.trim(),
            email: formState.email.trim(),
            subject: formState.subject.trim(),
            message: formState.message.trim(),
            from_name: `${formState.name.trim()} (Academic Portfolio)`,
          }),
        });

        const data = await response.json().catch(() => ({}));
        if (!response.ok || !data.success) {
          throw new Error(
            data.message || 'Web3Forms service could not process the submission. Please verify your access key or try again.'
          );
        }
      } else {
        // Formspree or custom static-form endpoint
        const endpoint = customEndpoint || `https://formspree.io/f/${formspreeId}`;
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: formState.name.trim(),
            email: formState.email.trim(),
            subject: formState.subject.trim(),
            message: formState.message.trim(),
          }),
        });

        const data = await response.json().catch(() => ({}));
        if (!response.ok || data.ok === false) {
          const errMsg = Array.isArray(data.errors)
            ? data.errors.map((item: { message: string }) => item.message).join(', ')
            : data.error || data.message || 'The form submission service returned an error. Please try again.';
          throw new Error(errMsg);
        }
      }

      // Successful verified submission from the service
      setStatus('success');
    } catch (err: unknown) {
      setStatus('error');
      const message =
        err instanceof Error
          ? err.message
          : 'Network error occurred while transmitting your message. Please check your connection or email directly.';
      setGlobalError(message);
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setGlobalError(null);
    setFieldErrors({});
    setFormState({ name: '', email: '', subject: '', message: '' });
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
                    Email
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
          </div>
        </div>

        {/* Right: Message Form */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-bold font-display text-slate-100">
              Send a Message
            </h2>

            {status === 'success' ? (
              <div
                role="status"
                aria-live="polite"
                className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3"
              >
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h3 className="text-sm font-bold text-emerald-200">Message Delivered Successfully</h3>
                <p className="text-xs text-emerald-300/80 leading-relaxed max-w-md mx-auto">
                  Thank you for reaching out! Your message was delivered through the contact service. A response will be sent to{' '}
                  <span className="font-mono text-emerald-200 font-semibold">{formState.email}</span> as soon as possible.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-2 rounded-xl bg-emerald-900/50 hover:bg-emerald-800/60 text-emerald-200 text-xs font-mono font-medium transition border border-emerald-500/30 inline-flex items-center gap-2"
                  >
                    <span>Send Another Message</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Global Error Banner */}
                {status === 'error' && globalError && (
                  <div
                    role="alert"
                    className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-3"
                  >
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <div className="font-semibold text-rose-200">Unable to Send Message</div>
                      <p className="text-rose-300/90 leading-relaxed">{globalError}</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-xs font-mono text-slate-300 block">
                      Your Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      aria-required="true"
                      aria-invalid={!!fieldErrors.name}
                      aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                      disabled={status === 'loading'}
                      value={formState.name}
                      onChange={e => {
                        setFormState({ ...formState, name: e.target.value });
                        if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: undefined });
                      }}
                      placeholder="e.g. Marie Curie"
                      className={`w-full bg-slate-950 border ${
                        fieldErrors.name ? 'border-rose-500/70 focus:border-rose-500' : 'border-slate-700 focus:border-cyan-500'
                      } rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none transition disabled:opacity-50`}
                    />
                    {fieldErrors.name && (
                      <span id="name-error" className="text-[11px] text-rose-400 font-mono block">
                        {fieldErrors.name}
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-xs font-mono text-slate-300 block">
                      Your Email <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      aria-required="true"
                      aria-invalid={!!fieldErrors.email}
                      aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                      disabled={status === 'loading'}
                      value={formState.email}
                      onChange={e => {
                        setFormState({ ...formState, email: e.target.value });
                        if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: undefined });
                      }}
                      placeholder="e.g. marie@physics.org"
                      className={`w-full bg-slate-950 border ${
                        fieldErrors.email ? 'border-rose-500/70 focus:border-rose-500' : 'border-slate-700 focus:border-cyan-500'
                      } rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none transition disabled:opacity-50`}
                    />
                    {fieldErrors.email && (
                      <span id="email-error" className="text-[11px] text-rose-400 font-mono block">
                        {fieldErrors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-subject" className="text-xs font-mono text-slate-300 block">
                    Subject / Discussion Topic <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    aria-required="true"
                    aria-invalid={!!fieldErrors.subject}
                    aria-describedby={fieldErrors.subject ? 'subject-error' : undefined}
                    disabled={status === 'loading'}
                    value={formState.subject}
                    onChange={e => {
                      setFormState({ ...formState, subject: e.target.value });
                      if (fieldErrors.subject) setFieldErrors({ ...fieldErrors, subject: undefined });
                    }}
                    placeholder="e.g. Question on 1D Schrödinger simulation or laboratory data analysis"
                    className={`w-full bg-slate-950 border ${
                      fieldErrors.subject ? 'border-rose-500/70 focus:border-rose-500' : 'border-slate-700 focus:border-cyan-500'
                    } rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none transition disabled:opacity-50`}
                  />
                  {fieldErrors.subject && (
                    <span id="subject-error" className="text-[11px] text-rose-400 font-mono block">
                      {fieldErrors.subject}
                    </span>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-xs font-mono text-slate-300 block">
                    Message <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    aria-required="true"
                    aria-invalid={!!fieldErrors.message}
                    aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                    disabled={status === 'loading'}
                    rows={5}
                    value={formState.message}
                    onChange={e => {
                      setFormState({ ...formState, message: e.target.value });
                      if (fieldErrors.message) setFieldErrors({ ...fieldErrors, message: undefined });
                    }}
                    placeholder="Write your thoughts, physics question, or project inquiry..."
                    className={`w-full bg-slate-950 border ${
                      fieldErrors.message ? 'border-rose-500/70 focus:border-rose-500' : 'border-slate-700 focus:border-cyan-500'
                    } rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none transition disabled:opacity-50 resize-none`}
                  />
                  {fieldErrors.message && (
                    <span id="message-error" className="text-[11px] text-rose-400 font-mono block">
                      {fieldErrors.message}
                    </span>
                  )}
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed text-slate-950 font-bold text-xs transition shadow-md shadow-cyan-500/20 cursor-pointer"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Transmitting Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Message</span>
                    </>
                  )}
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
