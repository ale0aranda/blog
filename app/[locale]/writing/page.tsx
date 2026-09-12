import { getAllPosts } from '@/domains/writing/lib/posts';
import { postToContentItem } from '@/domains/writing/lib/to-content-item';
import { WritingView } from '@/domains/writing/view';

type WritingPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function WritingPage({ params }: WritingPageProps) {
  const { locale } = await params;
  const items = getAllPosts(locale).map(postToContentItem);

  return <WritingView items={items} />;
}
