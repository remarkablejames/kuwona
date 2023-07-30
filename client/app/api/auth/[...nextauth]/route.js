import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email", placeholder: "your email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // fetch user from API
        const res = await fetch("http://127.0.0.1:8002/api/login/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
          cache: "no-cache",
        });

        const user = await res.json();
        console.log("IN ROUTE", user.user);

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          // console.log('user:', user);
          return { ...user.user, accessToken: user.token };
        } else {
          console.log("INSPECTING ERRORS");
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session }) {
      //   console.log("IN JWT", token, user, session);
      if (user) {
        token = { ...token, ...user };
      }
      return token;
    },
    async session({ session, token, user }) {
      //   console.log("IN SESSION", session, token, user);

      return { ...session, token: token.accessToken };
    },
  },
  pages: {
    signIn: "/auth/login",
    // signOut: "/auth/logout",
    // error: "/auth/error", // Error code passed in query string as ?error=
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    // max age of 30 minute
    maxAge: 30 * 60,
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
