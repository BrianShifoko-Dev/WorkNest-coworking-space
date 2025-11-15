/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // Enable standalone output for flexible deployment
  output: 'standalone',
  // Optimize for production
  poweredByHeader: false,
  compress: true,
  // SEO-friendly trailing slashes
  trailingSlash: false,
}

module.exports = nextConfig

