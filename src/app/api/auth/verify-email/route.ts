import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Add this export config to enable dynamic behavior
export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');
   
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'No verification token provided' },
        { status: 400 }
      );
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
      return NextResponse.json(
        { success: false, error: 'Invalid or expired verification token' },
        { status: 400 }
      );
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
   
    return NextResponse.json({ success: true });
   
  } catch (error) {
    console.error("Email verification error:", error);
    return NextResponse.json(
      { success: false, error: 'Verification failed' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}