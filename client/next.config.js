/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API: 'http://localhost:5000'
  }
}

module.exports = nextConfig
