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
    async signIn({ user, account, state }) {
      // 允许所有登录，具体权限在业务域验证
      return true
    },

    async jwt({ token, account, state }) {
      // 从 state 参数解析目标站点
      if (account && state) {
        const stateStr = state as string
        // state 格式: "site:focus:redirect:https://focus.saasfarm.net/dashboard"
        const siteMatch = stateStr.match(/site:([^:]+)/)
        const redirectMatch = stateStr.match(/redirect:(.+)/)

        if (siteMatch) {
          token.site = siteMatch[1] // 'focus'
          token.redirect = redirectMatch ? redirectMatch[1] : `https://${siteMatch[1]}.saasfarm.net`
          token.email = token.email || token.sub // 确保有用户标识
        }
      }
      return token
    },

    async session({ session, token }) {
      // 把站点信息传给前端
      session.site = token.site
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
