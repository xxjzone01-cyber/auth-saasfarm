# Cloudflare Pages 部署指南

## 📋 环境变量配置

需要在 Cloudflare Pages 中配置以下环境变量：

```
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
NEXTAUTH_URL=https://auth.saasfarm.net
NEXTAUTH_SECRET
NODE_ENV=production
```

**配置步骤：**
1. 访问 Cloudflare Pages 项目设置
2. 进入 Environment variables
3. 添加以上环境变量（具体值从开发者处获取）
4. 触发重新部署

## 🔗 快速链接

- Cloudflare Pages 设置: https://dash.cloudflare.com/5cbfc2dac9b0828eb60202bcb1315e46/pages/view/auth-saasfarm/settings
- Cloudflare Pages 部署: https://dash.cloudflare.com/5cbfc2dac9b0828eb60202bcb1315e46/pages/view/auth-saasfarm/deployments

## 🧪 验证

部署完成后访问：
- https://auth.saasfarm.net
- https://auth.saasfarm.net/login?site=focus
