import { buildActivityItemsByCategory } from '@/domains/home/content/activity-items';
import { HomePage } from '@/domains/home/view';
import { getAllPosts } from '@/domains/writing/lib/posts';
import { postToContentItem } from '@/domains/writing/lib/to-content-item';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function Page({ params }: PageProps) {
  const { locale } = await params;

  const writingItems = getAllPosts(locale).map(postToContentItem);
  const activityItemsByCategory = buildActivityItemsByCategory(writingItems);

  return <HomePage activityItemsByCategory={activityItemsByCategory} />;
}
