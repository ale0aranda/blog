'use client';

import Image from 'next/image';

import type { GalleryItem } from './gallery.data';

type Props = {
  index: number;
  item: GalleryItem;
  className?: string;
  imageClassName: string;
  sizes: string;
  onOpen: (index: number) => void;
};

export function GalleryImage({ index, item, className, imageClassName, sizes, onOpen }: Props) {
  return (
    <button
      type="button"
      aria-label={`Open image ${index + 1}`}
      className={[
        'group relative block overflow-hidden rounded-md bg-surface text-left',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent',
        imageClassName,
        className
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={() => onOpen(index)}
    >
      <Image
        fill
        alt={item.alt}
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-102"
        sizes={sizes}
        src={item.src}
      />

      <span className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
    </button>
  );
}
