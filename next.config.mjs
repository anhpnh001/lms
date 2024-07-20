/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // remotePatterns: ['utfs.io', 'via.placeholder.com'],
    remotePatterns: [
      {
        hostname: 'utfs.io',
        protocol: 'https',
      },
      {
        hostname: 'via.placeholder.com',
        protocol: 'https',
      },
    ],
  },
}

export default nextConfig
