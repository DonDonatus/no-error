// FILE: src/app/api/auth/verify-email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';


const prisma = new PrismaClient();


export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');
   
    if (!token) {
      return NextResponse.redirect(new URL('/verification-failed', request.url));
    }
   
    const now = new Date();
   
    // Find user with matching verification token that hasn't expired
    const user = await prisma.user.findFirst({
      where: {
        verificationToken: token,
        verificationTokenExpiry: {
          gt: now // Check if token hasn't expired
        }
      }
    });
   
    if (!user) {
      // If no user found with valid token, redirect to failure page
      return NextResponse.redirect(new URL('/verification-failed', request.url));
    }
   
    // Update user record to set emailVerified to true and clear the verification token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        verificationToken: null,
        verificationTokenExpiry: null
      }
    });
   
    // Redirect to signin page on success// In verify-email/route.ts
    return NextResponse.redirect(new URL('/signin?verified=true', request.url));
   
  } catch (error) {
    console.error("Email verification error:", error);
    return NextResponse.redirect(new URL('/verification-failed', request.url));
  } finally {
    await prisma.$disconnect();
  }
}

