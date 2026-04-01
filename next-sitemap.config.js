/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://im-hera.com',
  generateRobotsTxt: true,
  exclude: ['/server-sitemap-index.xml'],
  robotsTxtOptions: {
    additionalSitemaps: ['https://im-hera.com/server-sitemap-index.xml']
  }
};
