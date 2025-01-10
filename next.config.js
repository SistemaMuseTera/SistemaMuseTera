/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['react-big-calendar', 'moment'],
  experimental: {
    esmExternals: 'loose'
  },
  output: 'standalone',
  trailingSlash: true
}

module.exports = nextConfig