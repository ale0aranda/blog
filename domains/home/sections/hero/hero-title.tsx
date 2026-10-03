'use client';

import type { CSSProperties } from 'react';

import { useTranslations } from 'next-intl';

export function HeroTitle() {
  const t = useTranslations('home.hero');
  const name = t('name');

  return (
    <>
      <h1
        aria-label={name}
        className="hero-title inline-flex cursor-default font-bold text-4xl text-fg tracking-tight"
      >
        <span aria-hidden="true">
          {Array.from(name).map((letter, index) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: static character positions
              key={index}
              className="hero-title-letter inline-block whitespace-pre"
              style={
                {
                  '--letter-delay': `${index * 35}ms`
                } as CSSProperties
              }
            >
              {letter}
            </span>
          ))}
        </span>
      </h1>

      <span
        aria-hidden="true"
        className="h-7 w-px bg-border"
      />

      <style jsx>{`
        .hero-title:hover .hero-title-letter {
          animation: letter-wave 600ms both;
          animation-delay: var(--letter-delay);
        }

        @keyframes letter-wave {
          0%,
          100% {
            transform: translateY(0);
          }

          40% {
            transform: translateY(-3px);
          }

          70% {
            transform: translateY(1px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-title:hover .hero-title-letter {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}
