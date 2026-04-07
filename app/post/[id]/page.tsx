import Post from '@components/Post';
import { getNotionPost } from '@/lib/notion';
import { createApiSuccessResponse } from '@core/utils';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type {
  RichTextItemResponse
} from '@notionhq/client/build/src/api-endpoints';

export const dynamic = 'force-dynamic';

interface PostPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params
}: PostPageProps): Promise<Metadata> {
  const { id } = await params;
  const postId = getCleanId(id);

  try {
    const postData = await getNotionPost(postId);
    const data = createApiSuccessResponse(postData);

    const cover = data?.data.post.cover as {
      type: 'external';
      external: {
        url: string;
      };
    };

    const title = data?.data.post.properties.title as {
      type: 'title';
      title: Array<RichTextItemResponse>;
      id: string;
    };

    const subTitle = data?.data.post.properties.subTitle as {
      type: 'rich_text';
      rich_text: Array<RichTextItemResponse>;
      id: string;
    };

    const titleText = title?.title[0]?.plain_text || 'im-hera devlog';
    const descriptionText =
      subTitle?.rich_text[0]?.plain_text || 'im-hera devlog';
    const imageUrl = cover?.external?.url;

    return {
      title: titleText,
      description: descriptionText,
      openGraph: {
        url: `https://im-hera.com/post/${id}`,
        title: titleText,
        description: descriptionText,
        images: imageUrl
          ? [
              {
                url: imageUrl,
                secureUrl: imageUrl,
                width: 1074,
                height: 674,
                alt: titleText,
                type: 'image/png'
              }
            ]
          : undefined,
        siteName: 'im-hera devlog'
      },
      twitter: {
        card: 'summary_large_image',
        site: `https://im-hera.com/post/${id}`,
        creator: 'im-hera'
      }
    };
  } catch (e) {
    return {
      title: 'im-hera devlog',
      description: 'im-hera devlog'
    };
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;

  const postId = getCleanId(id);
  let postData;

  try {
    postData = await getNotionPost(postId);
  } catch (error) {
    if ((error as Error & { status?: number }).status === 404) {
      notFound();
    }

    throw error;
  }

  const data = createApiSuccessResponse(postData);

  return <Post id={postId} data={data} />;
}

const getCleanId = (id: string) =>
  decodeURIComponent(id).startsWith('@') ? decodeURIComponent(id).slice(1) : id;
