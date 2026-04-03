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
NEXTAUTH_SECRET=your-random-secret-here

# JWT (optional, use same as NEXTAUTH_SECRET for simplicity)
JWT_SECRET=your-jwt-secret
```

## Deploy to Cloudflare Pages

1. Connect GitHub repo to Cloudflare Pages
2. Set environment variables
3. Deploy!

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- NextAuth.js
- Google OAuth
- Cloudflare Pages
