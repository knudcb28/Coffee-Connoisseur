const { SERVER_FILES_MANIFEST } = require('next/dist/shared/lib/constants');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
}

module.exports = {
  images: {
    domains: ['images.unsplash.com'],
  },
  
};