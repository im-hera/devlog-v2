import type { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  title: 'hera devlog',
  description:
    '백엔드 개발자 문혜라의 개발 블로그 입니다. 제 공간에 와주셔서 감사합니다.',
  openGraph: {
    title: 'hera devlog',
    description:
      '백엔드 개발자 문혜라의 개발 블로그 입니다. 제 공간에 와주셔서 감사합니다.',
    type: 'website',
    locale: 'ko_KR',
    url: 'https://im-hera.com',
    siteName: 'hera devlog',
    images: [
      {
        url: 'https://im-hera.com/assets/images/hera.png',
        width: 1074,
        height: 674,
        alt: 'hera devlog',
        secureUrl: 'https://im-hera.com/assets/images/hera.png',
        type: 'image/png'
      }
    ]
  },
  twitter: {
    handle: 'hera',
    site: 'https://im-hera.com',
    cardType: 'summary_large_image'
  }
};

export default config;
