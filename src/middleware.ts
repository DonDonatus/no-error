import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";


export default withAuth({
  pages: {
    signIn: "/signin", // Redirect here if unauthorized
  },
  callbacks: {
    authorized: ({ token }) => {
      // ALL routes except public ones require auth
      return !!token; // True = allow, False = block
    },
  },
});


// Apply to EVERY route except:
// - Public routes (signin, signup, home)
// - Static files (_next, images, favicon)
export const config = {
  matcher: ["/((?!signin|signup|forgot-password|$|_next|images|favicon.ico).*)"],
};



