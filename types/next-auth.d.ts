import NextAuth from "next-auth";




declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      email: string;
      name?: string | null;
      phoneNumber?: string | null;
      profilePic?: string | null;
    };
  }
}


declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    phoneNumber?: string | null;
  }
}



