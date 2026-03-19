'use client';

import { motion } from 'framer-motion';

const PROJECTS = [
  {
    image: '/project-adaptive.png',
    title: 'Adaptive Learning',
    desc: 'Architected an AI-powered microservices learning platform. Built a dynamic Next.js React frontend, a Node.js/Express core API for handling user telemetry, and a custom Python/FastAPI machine learning engine that interfaces with LLMs to dynamically scale educational difficulty based on real-time student performance.',
    tags: ['Next.js', 'React', 'Node.js', 'Python', 'MongoDB', 'Express', 'FastAPI'],
    github: 'https://github.com/Rema2003/Adaptive-learning',
    live: '',
  },
];

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);
const ExtIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export default function Projects() {
  return (
    <section id="projects" className="py-28" style={{ background: 'var(--bg-surface)' }}>
      <div className="max-w-6xl mx-auto px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }} viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-label mb-3 inline-block">What I&apos;ve built</span>
          <h2 className="font-heading text-[clamp(2rem,5vw,3.2rem)] font-extrabold mt-2" style={{ letterSpacing: '-1px' }}>
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="card p-7 flex flex-col gap-4 group relative overflow-hidden"
            >
              {/* gradient overlay on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-[var(--radius-lg)]"
                style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.07), rgba(0,212,255,0.04))' }}
              />

              {/* Image Cover */}
              {(p as any).image ? (
                <div className="w-[calc(100%+3.5rem)] h-48 -mt-7 -mx-7 mb-2 bg-[#08080f] overflow-hidden relative rounded-t-[calc(var(--radius-lg)-1px)]">
                  <img src={(p as any).image} alt={p.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] to-transparent" />
                </div>
              ) : (
                <span className="text-4xl relative z-10">{(p as any).emoji}</span>
              )}

              <div className="flex items-center justify-between relative z-10 w-full mt-2">
                <h3 className="font-heading text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {p.title}
                </h3>

                <div className="flex gap-2">
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center rounded-full border transition-colors duration-200 hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-white"
                      style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: 'var(--text-secondary)' }}
                    >
                      <GithubIcon />
                    </a>
                  )}
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center rounded-full border transition-colors duration-200 hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-white"
                      style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: 'var(--text-secondary)' }}
                    >
                      <ExtIcon />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-sm leading-relaxed flex-1 relative z-10 mt-2" style={{ color: 'var(--text-secondary)' }}>
                {p.desc}
              </p>
              <div className="flex flex-wrap gap-2 relative z-10 mt-1">
                {p.tags.map((t) => <span key={t} className="project-tag">{t}</span>)}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }} viewport={{ once: true }}
          className="text-center mt-10 text-sm"
          style={{ color: 'var(--text-muted)' }}
        >
          More projects coming soon — or{' '}
          <a href="#contact" className="text-[color:var(--accent-light)] border-b border-[rgba(108,99,255,0.4)] hover:text-[color:var(--accent-cyan)] transition-colors">
            reach out
          </a>{' '}
          to discuss what we can build together.
        </motion.p>
      </div>
    </section>
  );
}
