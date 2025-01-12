/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['react-big-calendar', 'moment'],
  experimental: {
    esmExternals: 'loose',
    optimizeCss: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true
  }
}

module.exports = nextConfig