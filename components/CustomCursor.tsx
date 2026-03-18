'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef     = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = 0, mouseY = 0;
    let outX = 0, outY = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = mouseX + 'px';
        dotRef.current.style.top  = mouseY + 'px';
      }
    };

    const animate = () => {
      outX += (mouseX - outX) * 0.12;
      outY += (mouseY - outY) * 0.12;
      if (outlineRef.current) {
        outlineRef.current.style.left = outX + 'px';
        outlineRef.current.style.top  = outY + 'px';
      }
      raf = requestAnimationFrame(animate);
    };

    const onEnter = () => {
      if (outlineRef.current) {
        outlineRef.current.style.width  = '52px';
        outlineRef.current.style.height = '52px';
        outlineRef.current.style.borderColor = 'var(--accent-cyan)';
      }
    };

    const onLeave = () => {
      if (outlineRef.current) {
        outlineRef.current.style.width  = '36px';
        outlineRef.current.style.height = '36px';
        outlineRef.current.style.borderColor = 'rgba(108,99,255,0.6)';
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    animate();

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}     className="cursor-dot"     aria-hidden="true" />
      <div ref={outlineRef} className="cursor-outline" aria-hidden="true" />
    </>
  );
}
