/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable image optimization for cPanel compatibility
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

