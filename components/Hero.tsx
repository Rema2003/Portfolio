'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const ROLES = [
  'Full-Stack Engineer',
  'AI Developer',
  'Problem Solver',
  'Open Source Contributor',
  'Creative Coder',
];

function useTyping(words: string[]) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting) {
      if (text.length < word.length) {
        timeout = setTimeout(() => setText(word.slice(0, text.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setDeleting(true), 1800);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(text.slice(0, -1)), 45);
      } else {
        setDeleting(false);
        setWordIdx((i) => (i + 1) % words.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIdx, words]);

  return text;
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const typedText = useTyping(ROLES);

  /* ── Particle Canvas ─────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const COLORS = ['rgba(108,99,255,', 'rgba(0,212,255,', 'rgba(139,133,255,'];

    let raf: number;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    class Particle {
      x = Math.random() * canvas!.width;
      y = Math.random() * canvas!.height;
      size = Math.random() * 2 + 0.5;
      sx = (Math.random() - 0.5) * 0.35;
      sy = -(Math.random() * 0.5 + 0.2);
      alpha = Math.random() * 0.4 + 0.1;
      color = COLORS[Math.floor(Math.random() * COLORS.length)];
      life = Math.random() * 300;
      max = Math.random() * 300 + 200;

      reset(init = false) {
        this.x = Math.random() * canvas!.width;
        this.y = init ? Math.random() * canvas!.height : canvas!.height + 10;
        this.life = 0;
      }
      update() {
        this.x += this.sx; this.y += this.sy; this.life++;
        if (this.life > this.max || this.y < -10) this.reset();
      }
      draw() {
        const t = this.life / this.max;
        const a = this.alpha * (t < 0.1 ? t / 0.1 : t > 0.8 ? (1 - t) / 0.2 : 1);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + a + ')';
        ctx.fill();
      }
    }

    const particles = Array.from({ length: 80 }, () => new Particle());
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: 'easeOut' as const },
  });

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden text-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Orbs */}
      <div className="orb w-[500px] h-[500px] top-[-10%] left-[-10%] z-0" style={{ background: 'rgba(108,99,255,0.18)' }} />
      <div className="orb w-[350px] h-[350px] bottom-0 right-[-5%] z-0" style={{ background: 'rgba(0,212,255,0.12)', animationDelay: '-3s' }} />
      <div className="orb w-[250px] h-[250px] top-[40%] left-[60%] z-0" style={{ background: 'rgba(108,99,255,0.1)', animationDelay: '-6s' }} />

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-6 py-24">
        <motion.p {...fadeUp(0.2)} className="font-mono text-[color:var(--accent-cyan)] text-sm tracking-widest mb-4">
          Hello, World! 👋
        </motion.p>

        <motion.h1
          {...fadeUp(0.4)}
          className="font-heading text-[clamp(3rem,8vw,6rem)] font-extrabold leading-tight mb-5"
          style={{ letterSpacing: '-2px' }}
        >
          Rhema <span className="gradient-text">Akinleye</span>
        </motion.h1>

        <motion.div {...fadeUp(0.6)} className="text-[clamp(1.1rem,3vw,1.5rem)] text-[color:var(--text-secondary)] mb-6 min-h-[2.2rem]">
          I&apos;m a{' '}
          <span className="font-semibold text-[color:var(--accent-light)]">{typedText}</span>
          <span className="cursor-blink text-[color:var(--accent)]"> |</span>
        </motion.div>

        <motion.p {...fadeUp(0.8)} className="text-[color:var(--text-secondary)] text-base leading-relaxed max-w-xl mx-auto mb-8">
          Full-Stack &amp; AI Engineer building scalable applications and intelligent systems. Passionate about clean code, creative problem-solving, and building things that matter.
        </motion.p>

        <motion.div {...fadeUp(1.0)} className="flex gap-4 justify-center flex-wrap">
          <a href="#projects" className="btn btn-primary">View My Work</a>
          <a href="#contact" className="btn btn-ghost">Get In Touch</a>
        </motion.div>

        <motion.div {...fadeUp(1.2)} className="flex flex-col items-center gap-2 mt-16 text-[color:var(--text-muted)] text-[0.7rem] tracking-widest uppercase">
          <div className="scroll-line w-px h-12" style={{ background: 'linear-gradient(to bottom, var(--accent), transparent)' }} />
          <span>Scroll Down</span>
        </motion.div>
      </div>
    </section>
  );
}
