#!/usr/bin/env node

// Cloudflare Pages 构建命令
const { execSync } = require('child_process');

try {
  console.log('🚀 Starting Cloudflare Pages build...');

  // 安装依赖
  console.log('📦 Installing dependencies...');
  execSync('npm ci', { stdio: 'inherit' });

  // 构建 Next.js
  console.log('🏗️  Building Next.js...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
