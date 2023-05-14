/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img1.doubanio.com',
      },
      {
        protocol: 'https',
        hostname: 'img9.doubanio.com',
      },
      {
        protocol: 'https',
        hostname: 'img2.doubanio.com',
      },
    ],
  },
};

module.exports = nextConfig;
