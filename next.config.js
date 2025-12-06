/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  pageExtensions: ['ts', 'tsx'],
  reactStrictMode: true,
  trailingSlash: true,

};

module.exports = nextConfig;
