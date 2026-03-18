'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { href: '#about',      label: 'About'      },
  { href: '#skills',     label: 'Skills'     },
  { href: '#projects',   label: 'Projects'   },
  { href: '#experience', label: 'Experience' },
  { href: '#contact',    label: 'Contact'    },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [active, setActive]       = useState('');
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = document.querySelectorAll('section[id]');
      let cur = '';
      sections.forEach((s) => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - 140) cur = s.id;
      });
      setActive(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setMenuOpen(false);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3 bg-[#08080f]/85 backdrop-blur-xl shadow-[0_1px_0_rgba(108,99,255,0.15)]' : 'py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-8 flex items-center gap-6">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="font-heading text-2xl font-extrabold tracking-tight mr-auto"
          style={{ letterSpacing: '-1px' }}
        >
          RA<span style={{ color: 'var(--accent)' }}>.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                  active === href.slice(1)
                    ? 'text-[color:var(--text-primary)]'
                    : 'text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)]'
                }`}
              >
                {active === href.slice(1) && (
                  <motion.span
                    layoutId="pill"
                    className="absolute inset-0 rounded-full bg-[rgba(108,99,255,0.12)] border border-[var(--border-hover)]"
                  />
                )}
                <span className="relative z-10">{label}</span>
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className="btn btn-outline hidden md:inline-flex text-sm py-2 px-5">
          Hire Me
        </a>

        {/* Hamburger */}
        <button
          className="flex md:hidden flex-col gap-[5px] p-2 rounded-lg hover:bg-white/5 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block w-6 h-[2px] rounded transition-all duration-300 bg-[color:var(--text-secondary)] ${
                menuOpen
                  ? i === 0 ? 'translate-y-[7px] rotate-45' : i === 1 ? 'opacity-0 w-0' : '-translate-y-[7px] -rotate-45'
                  : ''
              }`}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 bg-[#08080f]/97 backdrop-blur-xl flex flex-col items-center justify-center gap-6 z-40"
          >
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={close}
                className="font-heading text-3xl font-semibold text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] transition-colors"
              >
                {label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
