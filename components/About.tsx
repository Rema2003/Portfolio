'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const TAGS = ['🚀 Problem Solver', '🤖 AI Engineer', '🌍 Open Source', '⚡ Performance First'];

function Counter({ end, duration = 1500 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const step = duration / end;
        let cur = 0;
        const timer = setInterval(() => {
          cur++;
          setCount(cur);
          if (cur >= end) clearInterval(timer);
        }, step);
      }
    }, { threshold: 0.5 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}</span>;
}

const STATS = [
  { count: 3,  suffix: '+', label: 'Years Exp.'    },
  { count: 10, suffix: '+', label: 'Projects'      },
  { count: 15, suffix: '+', label: 'Technologies'  },
];

export default function About() {
  return (
    <section id="about" className="py-28" style={{ background: 'var(--bg-surface)' }}>
      <div className="max-w-6xl mx-auto px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }} viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-label mb-3 inline-block">Get to know me</span>
          <h2 className="font-heading text-[clamp(2rem,5vw,3.2rem)] font-extrabold mt-2" style={{ letterSpacing: '-1px' }}>
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Avatar + Stats */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }} viewport={{ once: true }}
            className="flex flex-col items-center gap-8"
          >
            <div className="relative">
              <div
                className="avatar-glow absolute inset-[-20px] rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.25) 0%, transparent 70%)' }}
              />
              <div
                className="relative w-48 h-48 rounded-full flex flex-col items-center justify-center overflow-hidden"
                style={{
                  background: 'linear-gradient(var(--bg-card), var(--bg-card)) padding-box, var(--gradient-primary) border-box',
                  border: '2px solid transparent',
                }}
              >
                <img 
                  src="/profile.jpg" 
                  alt="Rhema Akinleye" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-4 flex-wrap justify-center">
              {STATS.map(({ count, suffix, label }) => (
                <div key={label} className="card px-5 py-4 text-center min-w-[90px]">
                  <div className="font-heading text-3xl font-extrabold gradient-text leading-none">
                    <Counter end={count} />{suffix}
                  </div>
                  <div className="text-[0.7rem] uppercase tracking-widest mt-1" style={{ color: 'var(--text-muted)' }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }} viewport={{ once: true }}
          >
            <h3 className="font-alt text-2xl font-bold mb-5 leading-snug" style={{ color: 'var(--text-primary)' }}>
              A developer who loves turning ideas into reality
            </h3>
            <p className="text-[color:var(--text-secondary)] leading-relaxed mb-4 text-[0.95rem]">
              I&apos;m <strong className="text-[color:var(--text-primary)] font-semibold">Rhema Akinleye</strong>, a Full-Stack &amp; AI Engineer with a passion for crafting beautiful, high-performance digital experiences. I work across the full stack — from elegantly architected APIs to pixel-perfect, animated UIs.
            </p>
            <p className="text-[color:var(--text-secondary)] leading-relaxed mb-4 text-[0.95rem]">
              My recent focus is on integrating AI and LLMs into production applications — building intelligent systems that are both powerful and intuitive.
            </p>
            <p className="text-[color:var(--text-secondary)] leading-relaxed mb-6 text-[0.95rem]">
              When I&apos;m not coding, I&apos;m exploring new technologies, contributing to open source, or levelling up my problem-solving skills. Let&apos;s build something awesome together.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {TAGS.map((tag) => (
                <span key={tag} className="text-sm px-4 py-1.5 rounded-full border transition-colors hover:border-[color:var(--accent)] hover:text-[color:var(--accent-light)]"
                  style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                  {tag}
                </span>
              ))}
            </div>
            <a href="#contact" className="btn btn-primary">Let&apos;s Connect</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
