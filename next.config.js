/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['react-big-calendar', 'moment'],
  experimental: {
    esmExternals: 'loose'
  },
  images: {
    unoptimized: true
  },
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true
  }
}

module.exports = nextConfig