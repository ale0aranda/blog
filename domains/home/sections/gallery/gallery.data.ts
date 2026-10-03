export const galleryItems = [
  {
    src: '/gallery/teo-dreaming-of-snacks.jpeg',
    altKey: 'teo'
  },
  {
    src: '/gallery/the-sun-third-wheeling.jpeg',
    altKey: 'sun'
  },
  {
    src: '/gallery/love-in-blue.jpeg',
    altKey: 'painting'
  },
  {
    src: '/gallery/us-in-the-mirror.jpeg',
    altKey: 'mirror'
  }
] as const;

export type GalleryItem = {
  src: (typeof galleryItems)[number]['src'];
  alt: string;
};
