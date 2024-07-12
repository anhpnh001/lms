/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['utfs.io', 'via.placeholder.com'],
  },
  experimental: {
    serverActions: true,
  },
}

export default nextConfig
