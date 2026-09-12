import type { Metadata } from 'next';

import { site } from '@/config/site';

import { routing } from '@/i18n/routing';

import { getAllPosts, getPostBySlug } from '@/domains/writing/lib/posts';
import { PostView } from '@/domains/writing/post/post-view';

type PostPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllPosts(locale).map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  const post = (() => {
    try {
      return getPostBySlug(locale, slug);
    } catch {
      return null;
    }
  })();

  if (!post) return {};

  const url = `${site.url}/${locale}/writing/${slug}`;
  const image = post.frontmatter.image
    ? post.frontmatter.image.startsWith('http')
      ? post.frontmatter.image
      : `${site.url}${post.frontmatter.image}`
    : undefined;

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    alternates: {
      canonical: url,
      languages: {
        en: `${site.url}/en/writing/${slug}`,
        es: `${site.url}/es/writing/${slug}`
      }
    },
    openGraph: {
      type: 'article',
      url,
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      publishedTime: post.frontmatter.date,
      authors: [site.author],
      tags: post.frontmatter.tags,
      ...(image && { images: [{ url: image }] })
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      ...(image && { images: [image] })
    }
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { locale, slug } = await params;

  return <PostView locale={locale} slug={slug} />;
}
