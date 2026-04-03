/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Cloudflare Pages 兼容性配置
  output: 'standalone',
  // 禁用某些在 Cloudflare Pages 上不兼容的功能
  experimental: {
    // 启用静态生成
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
    ],
  },
  // 确保静态输出
  trailingSlash: true,
}

module.exports = nextConfig
