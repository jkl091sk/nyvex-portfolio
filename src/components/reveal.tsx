'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

/**
 * Progressive-enhancement scroll reveal.
 *
 * Text MUST be readable in server-rendered HTML, on older mobile browsers,
 * when JavaScript has not loaded, and when IntersectionObserver is unavailable.
 * Never use initial opacity: 0 or visibility: hidden here.
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // No animation is better than missing content. This supports reduced
    // motion, missing APIs, JS failures and browsers with weak GPU support.
    if (
      typeof IntersectionObserver === 'undefined' ||
      typeof node.animate !== 'function' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const mobile = window.matchMedia('(max-width: 768px)').matches;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        // Animation only nudges ALREADY-VISIBLE content: opacity never hits 0.
        node.animate(
          [
            { opacity: 0.88, transform: `translate3d(0, ${mobile ? 10 : 18}px, 0)` },
            { opacity: 1, transform: 'translate3d(0, 0, 0)' },
          ],
          {
            duration: mobile ? 460 : 650,
            delay: Math.min(Math.max(delay * 1000, 0), mobile ? 100 : 400),
            easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)',
            fill: 'none',
          },
        );
      },
      { threshold: 0.08, rootMargin: '0px 0px -12px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);

  // Deliberately a plain div, not motion.div with SSR opacity:0.
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
