'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2 } from 'lucide-react';

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const SOCIALS = [
  { label: 'GitHub',   Icon: GithubIcon,   href: 'https://github.com/Rema2003' },
  { label: 'LinkedIn', Icon: LinkedInIcon, href: 'https://www.linkedin.com/in/akinleye-rhema-26a73a230' },
  { label: 'Twitter',  Icon: TwitterIcon,  href: 'https://x.com/i_am_remaa' },
];

function validate(name: string, value: string) {
  if (!value.trim()) return false;
  if (name === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  return true;
}

export default function Contact() {
  const [fields, setFields]     = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors]     = useState<Record<string, boolean>>({});
  const [sending, setSending]   = useState(false);
  const [success, setSuccess]   = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFields((f) => ({ ...f, [name]: value }));
    setErrors((err) => ({ ...err, [name]: !validate(name, value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, boolean> = {};
    let ok = true;
    (Object.keys(fields) as Array<keyof typeof fields>).forEach((k) => {
      if (!validate(k, fields[k])) { newErrors[k] = true; ok = false; }
    });
    setErrors(newErrors);
    if (!ok) return;

    setSending(true);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'YOUR_ACCESS_KEY_HERE',
          name: fields.name,
          email: fields.email,
          subject: fields.subject,
          message: fields.message,
        })
      });

      if (response.ok) {
        setSuccess(true);
        setFields({ name: '', email: '', subject: '', message: '' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
      setTimeout(() => setSuccess(false), 5000);
    }
  };

  return (
    <section id="contact" className="py-28" style={{ background: 'var(--bg-surface)' }}>
      <div className="max-w-6xl mx-auto px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }} viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-label mb-3 inline-block">Get in touch</span>
          <h2 className="font-heading text-[clamp(2rem,5vw,3.2rem)] font-extrabold mt-2" style={{ letterSpacing: '-1px' }}>
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }} viewport={{ once: true }}
          >
            <p className="text-[color:var(--text-secondary)] leading-relaxed mb-8 text-[0.95rem]">
              I&apos;m always open to new opportunities, collaborations, or just a friendly chat. Drop me a message!
            </p>

            <div className="flex flex-col gap-4 mb-8">
              {[
                { icon: '📧', label: 'Email', value: 'akinleyerhema@gmail.com', href: 'mailto:akinleyerhema@gmail.com' },
                { icon: '📍', label: 'Location', value: 'Nigeria 🇳🇬' },
              ].map(({ icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-11 h-11 flex items-center justify-center rounded-[var(--radius-md)] text-xl flex-shrink-0"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                    {icon}
                  </div>
                  <div>
                    <p className="text-[0.7rem] uppercase tracking-widest mb-0.5" style={{ color: 'var(--text-muted)' }}>{label}</p>
                    {href
                      ? <a href={href} className="text-sm hover:text-[color:var(--accent-light)] transition-colors" style={{ color: 'var(--text-secondary)' }}>{value}</a>
                      : <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{value}</p>
                    }
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {SOCIALS.map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all hover:border-[color:var(--accent)] hover:text-[color:var(--accent-light)] hover:bg-[rgba(108,99,255,0.1)] hover:-translate-y-0.5"
                  style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                >
                  <Icon /> {label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }} viewport={{ once: true }}
            onSubmit={handleSubmit}
            noValidate
            className="p-8 flex flex-col gap-5 rounded-[var(--radius-xl)] border"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {(['name', 'email'] as const).map((key) => (
                <div key={key} className="flex flex-col gap-1.5">
                  <label className="text-[0.78rem] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                    {key === 'name' ? 'Your Name' : 'Your Email'}
                  </label>
                  <div className="relative">
                    <input
                      type={key === 'email' ? 'email' : 'text'}
                      name={key}
                      value={fields[key]}
                      onChange={handleChange}
                      placeholder={key === 'name' ? 'John Doe' : 'john@example.com'}
                      className={`form-input ${errors[key] ? 'invalid' : ''}`}
                      required
                    />
                    {key === 'email' && fields.email.length > 0 && !errors.email && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4ecca3]" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[0.78rem] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Subject</label>
              <input
                type="text" name="subject" value={fields.subject} onChange={handleChange}
                placeholder="Project Collaboration"
                className={`form-input ${errors.subject ? 'invalid' : ''}`} required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[0.78rem] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Message</label>
              <textarea
                name="message" value={fields.message} onChange={handleChange} rows={5}
                placeholder="Tell me about your project or just say hi..."
                className={`form-input resize-y ${errors.message ? 'invalid' : ''}`} required
              />
            </div>

            <button type="submit" disabled={sending} className="btn btn-primary w-full justify-center">
              {sending ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</> : 'Send Message →'}
            </button>

            {success && (
              <motion.p
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                className="text-sm text-center py-3 rounded-[var(--radius-md)]"
                style={{ color: '#4ecca3', background: 'rgba(78,204,163,0.1)', border: '1px solid rgba(78,204,163,0.25)' }}
              >
                🎉 Message sent! I&apos;ll get back to you soon.
              </motion.p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
