import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      // 允许所有登录，具体权限在业务域验证
      return true
    },

    async jwt({ token, account }) {
      // account 存在说明是首次登录，state 已经在 OAuth 流程中处理
      // 从 token 中提取 state（NextAuth 会把 state 放到 token 里）
      if (account && token) {
        // @ts-ignore  state 存在于初始授权
        const stateStr = token.state as string | undefined
        if (stateStr) {
          // state 格式: "site:focus:redirect:https://focus.saasfarm.net/dashboard"
          const siteMatch = stateStr.match(/site:([^:]+)/)
          const redirectMatch = stateStr.match(/redirect:(.+)/)

          if (siteMatch) {
            token.site = siteMatch[1] // 'focus'
            token.redirect = redirectMatch ? redirectMatch[1] : `https://${siteMatch[1]}.saasfarm.net`
            token.email = token.email || token.sub // 确保有用户标识
          }
        }
      }
      return token
    },

    async session({ session, token }) {
      // 把站点信息传给前端
      // @ts-ignore
      session.site = token.site
      // @ts-ignore
      session.redirect = token.redirect
      return session
    },
  },

  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        domain: '.saasfarm.net', // 关键：共享给所有子域
        secure: process.env.NODE_ENV === 'production'
      }
    }
  },

  pages: {
    signIn: '/login', // 自定义登录页
  }
})

export { handler as GET, handler as POST }
