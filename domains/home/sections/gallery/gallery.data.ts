export const galleryItems = [
  {
    src: '/gallery/teo-dreaming-of-snacks.jpeg',
    alt: 'Teo, patiently waiting for a snack.'
  },
  {
    src: '/gallery/the-sun-third-wheeling.jpeg',
    alt: 'The sun wanted to be in our selfie too.'
  },
  {
    src: '/gallery/love-in-blue.jpeg',
    alt: 'Painting a little love into the afternoon.'
  },
  {
    src: '/gallery/us-in-the-mirror.jpeg',
    alt: 'Me, her, and a little world inside the mirror.'
  }
] as const;

export type GalleryItem = (typeof galleryItems)[number];
