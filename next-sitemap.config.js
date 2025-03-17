module.exports = {
  siteUrl: 'https://app.asylum-labs.io',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/private-page', '/admin', '/server-sitemap.xml'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', crawlDelay: 10 },
      { userAgent: '*', disallow: '/api' },
    ],
    additionalSitemaps: ['https://app.asylum-labs.io/server-sitemap.xml'],
  },
};
