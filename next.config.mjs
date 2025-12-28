/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // GitHub Pages için basePath ve assetPrefix ayarları
  basePath: '/projem-app',
  assetPrefix: '/projem-app',
  trailingSlash: true,
};

export default nextConfig;
