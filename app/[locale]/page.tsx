import { HomePage } from '@/domains/home/view';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function Page({ params }: PageProps) {
  return <HomePage />;
}
