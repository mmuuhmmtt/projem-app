/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // GitHub Pages için basePath ve assetPrefix ayarları
  basePath: '/AI-ChatHub-v1',
  assetPrefix: '/AI-ChatHub-v1',
  trailingSlash: true,
};

export default nextConfig;
