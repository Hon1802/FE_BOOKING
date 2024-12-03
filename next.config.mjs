/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    BASE_URL: process.env.BASE_URL
  },
  images: {
    domains: [process.env.IMAGE_URL || "https://achautravel.com/upload/images"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  }
}

export default nextConfig
