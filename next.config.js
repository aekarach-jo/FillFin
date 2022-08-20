/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  apiPath: 'http://192.168.1.54:8000',
  socketPath: 'http://192.168.1.54:5000',
  // apiImage : 'http://192.168.1.51:3000',
  images: {
    domains: ['192.168.1.54'],
  }
  // exportTrailingSlash: true
}

module.exports = nextConfig
