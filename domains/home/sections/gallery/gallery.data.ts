export const galleryItems = [
  {
    src: '/gallery/.jpeg',
    alt: ''
  },
  {
    src: '/gallery/.jpeg',
    alt: ''
  },
  {
    src: '/gallery/.jpeg',
    alt: ''
  },
  {
    src: '/gallery/.jpeg',
    alt: ''
  }
] as const;

export type GalleryItem = (typeof galleryItems)[number];
