/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
    esmExternals: true,
  },
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true
  },
  swcMinify: true,
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
}

module.exports = nextConfig