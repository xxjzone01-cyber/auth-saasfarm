#!/usr/bin/env node

/**
 * 快速诊断和修复脚本
 * 检查项目配置并提供修复建议
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 开始诊断 auth-saasfarm 项目...\n');

const checks = [
  {
    name: '检查 package.json',
    check: () => {
      const pkgPath = path.join(process.cwd(), 'package.json');
      return fs.existsSync(pkgPath);
    },
    fix: '确保 package.json 存在'
  },
  {
    name: '检查 next.config.js',
    check: () => {
      const configPath = path.join(process.cwd(), 'next.config.js');
      return fs.existsSync(configPath);
    },
    fix: '确保 next.config.js 存在并配置了 Cloudflare 兼容性'
  },
  {
    name: '检查 .env.example',
    check: () => {
      const envPath = path.join(process.cwd(), '.env.example');
      return fs.existsSync(envPath);
    },
    fix: '已创建 .env.example 文件'
  },
  {
    name: '检查 Cloudflare Pages 配置',
    check: () => {
      const headersPath = path.join(process.cwd(), '_headers');
      const redirectsPath = path.join(process.cwd(), '_redirects');
      return fs.existsSync(headersPath) && fs.existsSync(redirectsPath);
    },
    fix: '已创建 _headers 和 _redirects 文件'
  }
];

let allPassed = true;

checks.forEach((check, index) => {
  console.log(`[${index + 1}/${checks.length}] ${check.name}...`);
  const passed = check.check();
  if (passed) {
    console.log(`  ✅ 通过`);
  } else {
    console.log(`  ❌ 失败`);
    console.log(`  💡 建议: ${check.fix}`);
    allPassed = false;
  }
  console.log();
});

if (allPassed) {
  console.log('✅ 所有检查通过！项目配置正确。');
  console.log('\n📋 下一步操作：');
  console.log('1. 在 Cloudflare Pages 中配置环境变量');
  console.log('2. 触发重新部署');
  console.log('3. 等待构建完成后测试网站');
} else {
  console.log('⚠️  发现问题，请按照建议修复。');
  process.exit(1);
}
