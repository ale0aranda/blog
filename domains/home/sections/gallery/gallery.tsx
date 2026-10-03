'use client';

import { useId, useState } from 'react';

import { useTranslations } from 'next-intl';

import { FadeIn } from '@/shared/motion/components/fade-in';

import type { GalleryItem } from './gallery.data';
import { galleryItems } from './gallery.data';
import { GalleryImage } from './gallery-image';
import { GalleryViewer } from './gallery-viewer';

export function Gallery() {
  const t = useTranslations('home.gallery');
  const items: GalleryItem[] = galleryItems.map(({ src, altKey }) => ({
    src,
    alt: t(`images.${altKey}`)
  }));
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const headingId = useId();

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

          <div className="grid h-80 grid-cols-12 grid-rows-6 gap-2 sm:h-96">
            <GalleryImage
              index={0}
              item={items[0]!}
              className="col-span-7 row-span-3"
              imageClassName="h-full"
              sizes="(max-width: 640px) 58vw, 330px"
              onOpen={setActiveIndex}
            />

            <GalleryImage
              index={1}
              item={items[1]!}
              className="col-span-5 row-span-3"
              imageClassName="h-full"
              sizes="(max-width: 640px) 42vw, 230px"
              onOpen={setActiveIndex}
            />

            <GalleryImage
              index={2}
              item={items[2]!}
              className="col-span-4 row-span-3"
              imageClassName="h-full"
              sizes="(max-width: 640px) 34vw, 190px"
              onOpen={setActiveIndex}
            />

            <GalleryImage
              index={3}
              item={items[3]!}
              className="col-span-8 row-span-3"
              imageClassName="h-full"
              sizes="(max-width: 640px) 66vw, 380px"
              onOpen={setActiveIndex}
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
