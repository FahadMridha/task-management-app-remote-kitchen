import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      id: "task",
      name: "Credentials",
      type: "credentials",

      credentials: {
        email: { label: "email", type: "email", placeholder: "Your email..." },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req): Promise<any> {
        try {
          const res = await fetch(`${process.env.BACKEND_URL}/users/login`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });
          const { data } = await res.json();
          // console.log(data);

          // If no error and we have user data, return it
          if (res.ok && data) {
            return {
              ...data,
            };
          }
        } catch (err: any) {
          throw new Error(err.message);
        }

        // Return null if user data could not be retrieved
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      //   console.log(token, user);
      // Persist the OAuth access_token and or the user id to the token right after signin
      return {
        ...token,
        ...user,
      };
    },
    async session({ session, token }: { session: any; token: any }) {
      //   console.log(token, session);
      return {
        ...session,
        ...token,
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
