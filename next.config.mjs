/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // GitHub Pages için basePath ve assetPrefix ayarları
  basePath: process.env.NODE_ENV === 'production' ? '/projem-app' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/projem-app' : '',
};

export default nextConfig;
