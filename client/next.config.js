/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    FRONT_END_URI: "http://192.168.99.121:3000", 
    BACKEND_URL: "http://192.168.99.121:5000", 
  }
  // swcMinify: true,
}

module.exports = nextConfig
