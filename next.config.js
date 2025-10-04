const withNextIntl = require('next-intl/plugin')('./i18n.ts');

module.exports = withNextIntl({
  env: {
    _next_intl_trailing_slash: 'true'
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  experimental: {
    // Suppression de appDir car il est maintenant stable dans Next.js 14
  }
}); 