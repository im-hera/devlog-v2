'use client';

import dynamic from 'next/dynamic';
import { NotionRenderer } from 'react-notion-x';
import { useTheme } from '@/contexts/ThemeContext';
import Image from 'next/image';
import { useGetPost } from '@core/queries/posts';
import Comment from '@components/Comment';
import Link from 'next/link';
import { customMapImageUrl } from '@core/utils/notion-client/customImageMap';
import { ErrorBoundary } from 'react-error-boundary';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import type { ExtendedRecordMap } from 'notion-types';
import type {
  PageObjectResponse,
  RichTextItemResponse
} from '@notionhq/client/build/src/api-endpoints';
import type { Response } from '@interfaces/index';

interface IPostProps {
  className?: string;
  id: string;
  data: Response<{
    notionPage: ExtendedRecordMap;
    post: PageObjectResponse;
  }>;
}

dayjs.locale('ko');

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then((m) => m.Code)
);
const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
);

function sanitizeRecordMap(recordMap: ExtendedRecordMap): ExtendedRecordMap {
  const sanitizedBlocks = Object.fromEntries(
    Object.entries(recordMap.block ?? {}).filter(([, blockValue]) => {
      const block = blockValue?.value;

      if (!block) {
        return true;
      }

      return ![
        'collection_view',
        'collection_view_page'
      ].includes(block.type);
    })
  );

  return {
    ...recordMap,
    block: sanitizedBlocks
  };
}

function PostRenderFallback({
  error
}: {
  error: Error;
}) {
  return (
    <div className="post-render-error" role="alert">
      <p>본문을 렌더링하는 중 문제가 발생했어요.</p>
      <pre>{error.message}</pre>
    </div>
  );
}

const Post: React.FC<IPostProps> = ({ id, data, className }) => {
  const { mode } = useTheme();

  const { data: postData } = useGetPost(id, {
    initialData: data
  });

  const cover = postData?.data.post.cover as {
    type: 'external';
    external: {
      url: string;
    };
  };

  const title = postData?.data.post.properties.title as {
    type: 'title';
    title: Array<RichTextItemResponse>;
    id: string;
  };

  const subTitle = postData?.data.post.properties.subTitle as {
    type: 'rich_text';
    rich_text: Array<RichTextItemResponse>;
    id: string;
  };

  const pulishedDate = postData?.data.post.properties.publishDate as {
    type: 'date';
    date: { start: string; end: string };
    id: string;
  };

  const linkMapper = (pageId: string) => `@${pageId}`;
  const sanitizedRecordMap = postData?.data.notionPage
    ? sanitizeRecordMap(postData.data.notionPage)
    : undefined;

  return (
    <div className={`post-wrapper ${className}`}>
      <div className="article-header">
        {cover?.external?.url && (
          <div className="cover-wrap">
            <div className="cover">
              <Image src={cover.external.url} alt="" fill />
            </div>
          </div>
        )}
        {title?.title?.[0] && (
          <div className="post-title-wrap">
            <h1>{title.title[0].plain_text}</h1>
            {subTitle?.rich_text?.[0] && <h2>{subTitle.rich_text[0].plain_text}</h2>}
            <div className="post-options">
              {pulishedDate?.date?.start && (
                <p className="post-date">
                  im-hera ·{' '}
                  {dayjs(pulishedDate.date.start).format('YYYY년 M월 D일')}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      {sanitizedRecordMap && (
        <div className="post-content-wrap">
          <ErrorBoundary
            FallbackComponent={PostRenderFallback}
            onError={(error) => {
              console.error('[Post] NotionRenderer crashed:', error);
            }}
          >
            <NotionRenderer
              recordMap={sanitizedRecordMap}
              darkMode={mode === 'dark'}
              components={{ Code, Equation, nextLink: Link, nextImage: Image }}
              mapPageUrl={linkMapper}
              mapImageUrl={customMapImageUrl}
              disableHeader
            />
          </ErrorBoundary>
        </div>
      )}

      <Comment />
    </div>
  );
};

export default Post;
