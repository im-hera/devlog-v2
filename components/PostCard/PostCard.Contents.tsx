import { memo } from 'react';
import Image from 'next/image';

import type {
  PageObjectResponse,
  RichTextItemResponse
} from '@notionhq/client/build/src/api-endpoints';
import Link from 'next/link';

const notionColorMap: Record<string, string> = {
  default: '#e3e2e0',
  gray: '#e3e2e0',
  brown: '#eee0da',
  orange: '#fadec9',
  yellow: '#fdecc8',
  green: '#dbeddb',
  blue: '#d3e5ef',
  purple: '#e8deee',
  pink: '#f5e0e9',
  red: '#ffe2dd'
};

interface IPostCardProps {
  className?: string;
  data: PageObjectResponse;
  lastRef?: (node?: Element | null | undefined) => void;
}

const PostCard: React.FC<IPostCardProps> = ({ data, className, lastRef }) => {
  const title = data.properties.title as {
    type: 'title';
    title: Array<RichTextItemResponse>;
    id: string;
  };

  const subTitle = data.properties.subTitle as {
    type: 'rich_text';
    rich_text: Array<RichTextItemResponse>;
    id: string;
  };

  const publishDate = data.properties.publishDate as {
    type: 'date';
    date: DateResponse | null;
    id: string;
  };

  const categories = data.properties.category as {
    type: 'multi_select';
    multi_select: Array<SelectPropertyResponse>;
    id: string;
  };

  return (
    <Link href={`/post/@${data.id}`}>
      <div className={`${className} post-card`} ref={lastRef}>
        {data.cover && <CoverImage cover={data.cover} />}
        <div className="card-contents">
          {categories?.multi_select?.length > 0 && (
            <div className="categories">
              {categories.multi_select.map((category) => (
                <span
                  key={category.id}
                  style={{ backgroundColor: notionColorMap[category.color] || notionColorMap.default }}
                >
                  {category.name}
                </span>
              ))}
            </div>
          )}
          {title?.title?.[0] && (
            <div className="title">
              <p>{title.title[0].plain_text}</p>
            </div>
          )}
          {subTitle?.rich_text?.[0] && (
            <div className="sub-title">
              <p>{subTitle.rich_text[0].plain_text}</p>
            </div>
          )}
          {publishDate && (
            <div className="publish-date">
              <span>{publishDate.date?.start}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default memo(PostCard);

const CoverImage = ({
  cover
}: {
  cover:
    | {
        type: 'external';
        external: {
          url: string;
        };
      }
    | {
        type: 'file';
        file: {
          url: string;
          expiry_time: string;
        };
      };
}) => {
  if (cover.type === 'external') {
    return (
      <div className="cover">
        <Image src={cover.external.url} alt="" fill />
      </div>
    );
  }
  return null;
};
