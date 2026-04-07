import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';
import { DEFINED_FILTER } from '@core/constants';
import { processPostImages } from './process-post-images';

import type {
  PageObjectResponse,
  QueryDatabaseParameters
} from '@notionhq/client/build/src/api-endpoints';
import type { ExtendedRecordMap } from 'notion-types';

const database_id = process.env.NOTION_DATABASE_ID!;
const auth = process.env.NOTION_API_KEY!;
const activeUser = process.env.NOTION_USER_ID!;
const authToken = process.env.NOTION_AUTH_TOKEN!;
const isProduction = process.env.NEXT_PUBLIC_APP_ENV === 'production';

const notion = new Client({ auth });
const notionRenderClient = new NotionAPI({ activeUser, authToken });

function isStatusProperty(
  property: PageObjectResponse['properties'][string]
): property is Extract<PageObjectResponse['properties'][string], { type: 'status' }> {
  return property.type === 'status';
}

export function isPublishedPost(post: PageObjectResponse): boolean {
  const statusPropertyId = DEFINED_FILTER.STATUS_PUBLISHED.property;
  let statusProperty: Extract<
    PageObjectResponse['properties'][string],
    { type: 'status' }
  > | null = null;

  for (const property of Object.values(post.properties)) {
    if (
      isStatusProperty(property) &&
      (property.id === statusPropertyId ||
        encodeURIComponent(property.id) === statusPropertyId)
    ) {
      statusProperty = property;
      break;
    }
  }

  return statusProperty?.status?.name === DEFINED_FILTER.STATUS_PUBLISHED.status.equals;
}

// 포스트 목록 가져오기 (캐싱 없음 - 항상 최신 데이터)
export async function getNotionPosts(): Promise<PageObjectResponse[]> {
  const filter: QueryDatabaseParameters['filter'] = {
    and: []
  };

  if (isProduction) {
    filter.and.push(DEFINED_FILTER.STATUS_PUBLISHED);
  }

  const response = await notion.databases.query({
    database_id,
    filter,
    sorts: [
      {
        property: 'publishDate',
        direction: 'descending'
      }
    ],
    page_size: 20
  });

  return response.results as PageObjectResponse[];
}

// 원본 함수: 단일 포스트 가져오기
async function fetchNotionPost(page_id: string): Promise<{
  notionPage: ExtendedRecordMap;
  post: PageObjectResponse;
}> {
  const response = (await notion.pages.retrieve({
    page_id
  })) as PageObjectResponse;

  if (isProduction && !isPublishedPost(response)) {
    const error = new Error('Post is not published');
    (error as Error & { status?: number }).status = 404;
    throw error;
  }

  const notionPage = await notionRenderClient.getPage(page_id);

  // Process images: download from Notion and upload to S3
  // This runs on-demand when a post is first accessed or revalidated
  try {
    await processPostImages(notionPage, response);
  } catch (error) {
    console.error(`Error processing images for post ${page_id}:`, error);
    // Don't fail the entire request if image processing fails
  }

  return {
    notionPage,
    post: response
  };
}

export const getNotionPost = async (page_id: string) => fetchNotionPost(page_id);
