/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  apiPath: 'http://192.168.1.51:3000',
  apiImage : 'http://192.168.1.51:3000',
  images: {
    domains: ['192.168.1.51'],
  },
}

module.exports = nextConfig
