import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import type { PluggableList } from 'unified';

export const remarkPlugins: PluggableList = [remarkGfm];

export const rehypePlugins: PluggableList = [
  rehypeSlug,
  [
    rehypeAutolinkHeadings,
    {
      behavior: 'wrap',
      properties: {
        className: ['anchor-link']
      }
    }
  ],
  [
    rehypePrettyCode,
    {
      theme: {
        light: 'github-light',
        dark: 'github-dark',
        dracula: 'dracula',
        sepia: 'solarized-light'
      },
      defaultColor: false,
      keepBackground: false
    }
  ]
];
