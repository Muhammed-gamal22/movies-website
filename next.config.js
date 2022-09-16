/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    customKey: process.env.NEXT_PUPLIC_API_KEY,
  },
  images: {
    domains: ["image.tmdb.org"],
  },
};

module.exports = nextConfig;
