# Auth SaaS Farm
Central authentication hub for all saasfarm.net sub-domain services.

## How it works

1. User clicks "Login" on a service (e.g. focus.saasfarm.net)
2. Redirect to `auth.saasfarm.net/login?site=focus&redirect=https://focus.saasfarm.net/dashboard`
3. User logs in with Google
4. Auth issues a JWT token and redirects back to service with token
5. Service verifies token and lets user in

## Environment Variables

```bash
# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# NextAuth
NEXTAUTH_URL=https://auth.saasfarm.net
NEXTAUTH_SECRET=your-random-secret-here (minimum 32 characters)

# Node Environment
NODE_ENV=production
```

## Deploy to Cloudflare Pages

**📖 详细的部署指南请查看：[CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md)**

### Quick Start

1. Connect GitHub repo to Cloudflare Pages
2. Set framework preset to **Next.js**
3. Configure environment variables (see above)
4. Add custom domain: `auth.saasfarm.net`
5. Deploy!

### Build Settings

```
Framework preset: Next.js
Build command: npm run build
Build output directory: .next
Node.js version: 18.x
```

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- NextAuth.js
- Google OAuth
- Cloudflare Pages

## Troubleshooting

如果遇到问题，请查看详细的故障排查指南：[CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md#故障排查)
