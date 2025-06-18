import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// configure and export NextAuth handlers
export const { handlers, signIn, signOut, auth } = NextAuth({
  // use JWT for session management
  session: {
    strategy: "jwt",
  },

  // define authentication providers
  providers: [
    CredentialsProvider({
      name: "credentials", // name shown on sign-in page
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<(User & { role: string }) | null> {
        // check for missing input
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // look up user by email in the database
          const [user] = await db
            .select({
              id: users.id,
              fullName: users.fullName,
              email: users.email,
              password: users.password,
              role: users.role,
            })
            .from(users)
            .where(eq(users.email, credentials.email.toString()))
            .limit(1);

          if (!user) {
            // no user found
            return null;
          }

          // validate the password using bcrypt
          const isPasswordValid = await compare(
            credentials.password.toString(),
            user.password
          );

          if (!isPasswordValid) {
            // password not match
            return null;
          }

          // authentication successful, return the user object
          return {
            id: user.id.toString(),
            name: user.fullName,
            email: user.email,
            role: user.role,
          } as User & { role: string };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  // custom auth-related pages
  pages: {
    signIn: "/sign-in",
    error: "/auth/error",
  },
  // callback functions to customize token and session behavior
  callbacks: {
    // called when a JWT token is created or updated
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.role = (user as any).role;
      }
      return token;
    },

    // called whenever a session is checked or created
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },
});
