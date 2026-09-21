import Image from 'next/image';
import type { ComponentPropsWithoutRef } from 'react';

import type { MDXComponents } from 'mdx/types';

import { Link } from '@/i18n/navigation';

import { CodeBlock } from './code-block';

const staticRoutes = ['/', '/projects', '/writing'] as const;
type StaticRoute = (typeof staticRoutes)[number];

function isStaticRoute(href: string): href is StaticRoute {
  return staticRoutes.includes(href as StaticRoute);
}

export const mdxComponents: MDXComponents = {
  a: ({ href = '', children, ...props }: ComponentPropsWithoutRef<'a'>) => {
    if (isStaticRoute(href)) {
      return (
        <Link
          href={href}
          {...props}
        >
          {children}
        </Link>
      );
    }

    if (href.startsWith('#')) {
      return (
        <a
          href={href}
          {...props}
        >
          {children}
        </a>
      );
    }

    const isExternal =
      href.startsWith('http://')
      || href.startsWith('https://')
      || href.startsWith('mailto:')
      || href.startsWith('tel:');

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <a
        href={href}
        {...props}
      >
        {children}
      </a>
    );
  },

  img: ({
    src = '',
    alt = '',
    ...props
  }: Omit<ComponentPropsWithoutRef<typeof Image>, 'src' | 'alt'> & {
    src?: string;
    alt?: string;
  }) => (
    <span className="relative block aspect-video w-full overflow-hidden rounded-xl">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        {...props}
      />
    </span>
  ),

  pre: CodeBlock
};
