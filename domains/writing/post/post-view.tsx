import { notFound } from 'next/navigation';

import { MDXRemote } from 'next-mdx-remote/rsc';

import { formatDate } from '@/shared/lib/date';
import { FadeIn } from '@/shared/motion/components/fade-in';
import { blogPostingJsonLd, JsonLd } from '@/shared/seo';

import { rehypePlugins, remarkPlugins } from '../lib/plugins';
import { getPostBySlug } from '../lib/posts';
import { mdxComponents } from './internal/mdx-components';
import { PostBackLink } from './internal/post-back-link';

type PostViewProps = {
  locale: string;
  slug: string;
};

export function PostView({ locale, slug }: PostViewProps) {
  const post = (() => {
    try {
      return getPostBySlug(locale, slug);
    } catch {
      notFound();
    }
  })();

  const date = formatDate(new Date(post.frontmatter.date), locale);

  return (
    <>
      <JsonLd data={blogPostingJsonLd(post, locale)} />
      <div className="mx-auto flex w-full max-w-2xl flex-col px-6 py-20">
        <PostBackLink />

        <FadeIn as="header" animate="mount" className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-fg">{post.frontmatter.title}</h1>

          {post.frontmatter.description && (
            <p className="mt-3 text-lg text-muted">{post.frontmatter.description}</p>
          )}

          <div className="mt-5 flex items-center gap-2 font-mono text-xs text-muted">
            <time dateTime={post.frontmatter.date}>{date}</time>

            {post.readingTime && (
              <>
                <span aria-hidden="true">·</span>
                <span>{post.readingTime}</span>
              </>
            )}
          </div>
        </FadeIn>

        <FadeIn
          as="div"
          animate="mount"
          className="prose prose-post max-w-none prose-pre:bg-surface prose-pre:border prose-pre:border-border"
        >
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins,
                rehypePlugins
              }
            }}
          />
        </FadeIn>
      </div>
    </>
  );
}
