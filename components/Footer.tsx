'use client';

export default function Footer() {
  return (
    <footer className="py-6 border-t" style={{ background: 'var(--bg-base)', borderColor: 'var(--border)' }}>
      <div className="max-w-6xl mx-auto px-8 flex items-center justify-between flex-wrap gap-4">
        <span className="font-heading text-xl font-extrabold" style={{ letterSpacing: '-1px' }}>
          RA<span style={{ color: 'var(--accent)' }}>.</span>
        </span>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          © 2026 Rhema Akinleye. Crafted with 💜 and lots of coffee.
        </p>
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="w-10 h-10 flex items-center justify-center rounded-full border text-lg transition-all hover:bg-[color:var(--accent)] hover:border-[color:var(--accent)] hover:text-white hover:-translate-y-1"
          style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
          aria-label="Back to top"
        >
          ↑
        </a>
      </div>
    </footer>
  );
}
