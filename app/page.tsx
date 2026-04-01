import { unstable_noStore as noStore } from 'next/cache';
import Home from '@components/Home';
import { getNotionPosts } from '@/lib/notion';
import { createApiSuccessResponse } from '@core/utils';

export default async function HomePage() {
  noStore();

  const posts = await getNotionPosts();
  const data = createApiSuccessResponse(posts);

  return <Home initialPosts={data} />;
}
