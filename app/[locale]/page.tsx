import { HomePage } from '@/domains/home/view';
import { getAllPosts } from '@/domains/writing/lib/posts';
import { postToContentItem } from '@/domains/writing/lib/to-content-item';

type HomeRouteProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomeRoute({ params }: HomeRouteProps) {
  const { locale } = await params;
  const writingItems = getAllPosts(locale).map(postToContentItem);

  return <HomePage writingItems={writingItems} />;
}
