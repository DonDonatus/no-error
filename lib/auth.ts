// lib/auth.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/signin",
    signOut: "/signin",
    error: "/signin",
  },
  // Improve token security and handling
  jwt: {
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
  // Add explicit cookie settings
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          // Normalize email to lowercase for consistent lookup
          const normalizedEmail = credentials.email.toLowerCase().trim();

          const user = await prisma.user.findUnique({
            where: { email: normalizedEmail },
          });

          if (!user) {
            console.log(`User not found: ${normalizedEmail}`);
            return null;
          }

          // Add a try/catch specifically around password comparison
          let isPasswordValid = false;
          try {
            isPasswordValid = await compare(
              credentials.password,
              user.password
            );
          } catch (error) {
            console.error("Password comparison error:", error);
            return null;
          }

          if (!isPasswordValid) {
            console.log(`Invalid password for user: ${normalizedEmail}`);
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            phoneNumber: user.phoneNumber,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        } finally {
          // Ensure database operations are properly completed
          // This is optional but can help with connection management
          await prisma.$disconnect();
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        const u = user as any;
        return {
          ...token,
          id: u.id,
          email: u.email,
          phoneNumber: u.phoneNumber,
        };
      }
      
      // Return previous token if the access token has not expired yet
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.phoneNumber = token.phoneNumber as string;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};