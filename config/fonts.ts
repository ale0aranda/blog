import localFont from 'next/font/local';

export const sfPro = localFont({
  src: [
    { path: '../assets/fonts/sf-pro-display/regular.woff2', weight: '400', style: 'normal' },
    { path: '../assets/fonts/sf-pro-display/bold.woff2', weight: '700', style: 'normal' }
  ],
  variable: '--font-sf-pro',
  display: 'swap'
});

export const sfMono = localFont({
  src: [
    { path: '../assets/fonts/sf-mono/regular.woff2', weight: '400', style: 'normal' },
    { path: '../assets/fonts/sf-mono/bold.woff2', weight: '700', style: 'normal' }
  ],
  variable: '--font-sf-mono',
  display: 'swap'
});
