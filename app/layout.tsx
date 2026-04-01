import type { Metadata } from 'next';
import { ClientLayout } from './client-layout';

import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'katex/dist/katex.min.css';

export const metadata: Metadata = {
  title: 'im-hera devlog',
  description:
    '백엔드 개발자 문혜라의 개발 블로그 입니다. 제 공간에 와주셔서 감사합니다.',
  openGraph: {
    title: 'im-hera devlog',
    description:
      '백엔드 개발자 문혜라의 개발 블로그 입니다. 제 공간에 와주셔서 감사합니다.',
    type: 'website',
    locale: 'ko_KR',
    url: 'https://im-hera.com',
    siteName: 'im-hera devlog',
    images: [
      {
        url: 'https://im-hera.com/assets/images/hera.png',
        width: 1074,
        height: 674,
        alt: 'im-hera devlog',
        secureUrl: 'https://im-hera.com/assets/images/hera.png',
        type: 'image/png'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: 'https://im-hera.com',
    creator: 'im-hera'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
