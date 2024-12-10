/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'images.unsplash.com',
      'store.storeimages.cdn-apple.com',
      'static.nike.com',
      'images.samsung.com',
      'www.shopaholic.com.pk',
      'static.zara.net'
    ],
    unoptimized: true
  },
  output: 'standalone',
}

module.exports = nextConfig 