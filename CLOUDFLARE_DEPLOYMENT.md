# Cloudflare Pages 部署指南

## 📋 前置要求

- Cloudflare 账户
- GitHub 仓库：https://github.com/xxjzone01-cyber/auth-saasfarm
- Google OAuth 凭证

## 🚀 部署步骤

### 1. 连接 GitHub 仓库

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Workers & Pages** → **Create application** → **Pages**
3. 选择 **Connect to Git**
4. 授权 GitHub 并选择 `xxjzone01-cyber/auth-saasfarm` 仓库

### 2. 配置构建设置

在 **Build settings** 中设置：

```
Framework preset: Next.js
Build command: npm run build
Build output directory: .next
Node.js version: 18 或 20
```

**⚠️ 重要**：如果使用自定义构建命令，使用：

```bash
Build command: npm run build
Build output directory: .next
```

### 3. 配置环境变量

在 **Environment variables** 中添加以下变量：

#### Production（生产环境）
```bash
GOOGLE_CLIENT_ID=your-actual-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-actual-google-client-secret
NEXTAUTH_URL=https://auth.saasfarm.net
NEXTAUTH_SECRET=your-secure-random-secret-at-least-32-chars
NODE_ENV=production
```

#### Preview（预览环境，可选）
```bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_URL=https://*.pages.dev
NEXTAUTH_SECRET=your-preview-secret
NODE_ENV=production
```

### 4. 配置自定义域名

#### 4.1 添加 DNS 记录

1. 在 Cloudflare DNS 中添加：
   - Type: `CNAME`
   - Name: `auth`
   - Target: `auth-saasfarm.pages.dev`（你的 Pages 项目域名）
   - Proxy status: ✅ Proxied（橙色云朵）

#### 4.2 绑定自定义域名

1. 在 Pages 项目设置中 → **Custom domains**
2. 点击 **Set up a custom domain**
3. 输入：`auth.saasfarm.net`
4. 等待 DNS 传播（通常 2-5 分钟）

## 🔍 故障排查

### 问题 1：构建失败

**症状**：Cloudflare Pages 显示 "Build failed"

**解决方案**：
1. 检查 `package.json` 中的依赖是否完整
2. 确认 Node.js 版本（推荐 18.x）
3. 查看构建日志，查看具体错误

### 问题 2：502 Bad Gateway

**症状**：访问网站返回 502 错误

**解决方案**：
1. 检查环境变量是否正确配置
2. 确认 `NEXTAUTH_URL` 与实际访问域名一致
3. 检查 Cloudflare Pages 函数日志

### 问题 3：登录后无法跳转

**症状**：Google 登录成功但没有跳转

**解决方案**：
1. 检查 Google OAuth 回调 URL 设置
2. 确认回调 URL 格式：`https://auth.saasfarm.net/api/auth/callback/google`
3. 检查浏览器控制台的错误信息

### 问题 4：Cookie 跨域问题

**症状**：登录后 token 无法传递到子域

**解决方案**：
1. 确认 `route.ts` 中的 cookie domain 配置为 `.saasfarm.net`
2. 检查 HTTPS 是否启用（Cloudflare 默认启用）
3. 确认 `secure: true` 在生产环境

## 🧪 测试清单

部署完成后，按以下步骤测试：

- [ ] 访问 https://auth.saasfarm.net 能看到首页 "🔐 SaaS Farm Auth Hub"
- [ ] 访问 https://auth.saasfarm.net/login?site=focus 显示登录页
- [ ] 点击 "Continue with Google" 能唤起 Google OAuth
- [ ] 登录成功后能跳转到 focus.saasfarm.net?token=xxx
- [ ] Token 能在子域正确解析
- [ ] 跨域 cookie 正常工作

## 📞 获取帮助

如果遇到问题：

1. 查看 Cloudflare Pages 构建日志
2. 查看函数执行日志
3. 检查浏览器控制台错误
4. 确认所有环境变量已正确设置

## 🔄 自动部署

每次推送到 `main` 分支会自动触发部署，无需手动操作。

## 📝 注意事项

1. **环境变量**：不要在代码中硬编码敏感信息
2. **NEXTAUTH_SECRET**：使用至少 32 个字符的随机字符串
3. **Google OAuth**：确保 Google Console 中的授权域名配置正确
4. **HTTPS**：生产环境必须使用 HTTPS
