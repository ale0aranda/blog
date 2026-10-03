'use client';

import { useId, useState } from 'react';

import { useTranslations } from 'next-intl';

import { FadeIn } from '@/shared/motion/components/fade-in';

import type { GalleryItem } from './gallery.data';
import { galleryItems } from './gallery.data';
import { GalleryOrbit } from './gallery-orbit';
import { GalleryViewer } from './gallery-viewer';

export function Gallery() {
  const t = useTranslations('home.gallery');
  const headingId = useId();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const items: GalleryItem[] = galleryItems.map(({ src, altKey }) => ({
    src,
    alt: t(`images.${altKey}`)
  }));

  return (
    <>
      <section
        aria-labelledby={headingId}
        className="mt-10"
      >
        <FadeIn y={6}>
          <h2
            className="mb-4 font-mono font-semibold text-fg text-xs uppercase tracking-widest"
            id={headingId}
          >
            {t('title')}
          </h2>

          <div className="relative left-1/2 w-screen max-w-3xl -translate-x-1/2 px-4">
            <GalleryOrbit
              items={items}
              onOpen={setActiveIndex}
              paused={activeIndex !== null}
            />
          </div>
        </FadeIn>
      </section>

      <GalleryViewer
        activeIndex={activeIndex}
        items={items}
        onChange={setActiveIndex}
        onClose={() => setActiveIndex(null)}
      />
    </>
  );
}
