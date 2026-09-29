'use client';

import { useState } from 'react';

import { FadeIn } from '@/shared/motion/components/fade-in';

import { galleryItems } from './gallery.data';
import { GalleryImage } from './gallery-image';
import { GalleryViewer } from './gallery-viewer';

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <section
        aria-label="Gallery"
        className="mt-10"
      >
        <FadeIn
          y={6}
          className="grid h-80 grid-cols-12 grid-rows-6 gap-2 sm:h-96"
        >
          <GalleryImage
            index={0}
            item={galleryItems[0]}
            className="col-span-7 row-span-3"
            imageClassName="h-full"
            sizes="(max-width: 640px) 58vw, 330px"
            onOpen={setActiveIndex}
          />

          <GalleryImage
            index={1}
            item={galleryItems[1]}
            className="col-span-5 row-span-3"
            imageClassName="h-full"
            sizes="(max-width: 640px) 42vw, 230px"
            onOpen={setActiveIndex}
          />

          <GalleryImage
            index={2}
            item={galleryItems[2]}
            className="col-span-4 row-span-3"
            imageClassName="h-full"
            sizes="(max-width: 640px) 34vw, 190px"
            onOpen={setActiveIndex}
          />

          <GalleryImage
            index={3}
            item={galleryItems[3]}
            className="col-span-8 row-span-3"
            imageClassName="h-full"
            sizes="(max-width: 640px) 66vw, 380px"
            onOpen={setActiveIndex}
          />
        </FadeIn>
      </section>

      <GalleryViewer
        activeIndex={activeIndex}
        items={galleryItems}
        onChange={setActiveIndex}
        onClose={() => setActiveIndex(null)}
      />
    </>
  );
}
