/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    FRONT_END_URI: "http://localhost:3000", 
    BACKEND_URL: "http://localhost:5000", 
  }
  // swcMinify: true,
}

module.exports = nextConfig
