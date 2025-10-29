import { headers } from "next/headers";
import NextAuth, { DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import { createApolloClient } from "./lib/apollo";
import { gql } from "@apollo/client";
import { cookies } from "next/headers";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
    } & DefaultSession["user"];
    accessToken?: string;
  }

  interface JWT {
    sub?: string;
    accessToken?: string;
  }
}

const GOOGLE_AUTH_MUTATION = gql`
  mutation GoogleAuth($input: GoogleAuthInput!) {
    googleAuth(input: $input) {
      success
      token
      user {
        _id
        email
        first_name
        last_name
      }
    }
  }
`;

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const apollo = createApolloClient();

          const { data } = await apollo.mutate({
            mutation: GOOGLE_AUTH_MUTATION,
            variables: {
              input: {
                email: user.email || "",
                provider: "google",
                google_id: account.providerAccountId || "",
                picture: user.image || "",
                access_token: account.access_token || "",
                id_token: account.id_token || "",
              },
            },
          });

          const cookieStore = cookies();
          if (data?.googleAuth?.success) {
            cookieStore.set("token", data.googleAuth.token);
            return true;
          } else {
            return false;
          }
        } catch (error: any) {
          console.error("Auth error details:", {
            message: error.message,
            graphQLErrors: error.graphQLErrors,
            networkError: error.networkError,
            stack: error.stack,
          });
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = (token.sub as string) || "";
        session.accessToken = (token.accessToken as string) || "";
      }
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/auth/sign-in",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
});
