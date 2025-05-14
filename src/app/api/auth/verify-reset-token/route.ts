//src/app/api/auth/verify-reset-token/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { prisma } from 'lib/prisma';

export async function GET(request: NextRequest) {
  // Get token from query parameters
  const token = request.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.json(
      { message: 'Token is required' },
      { status: 400 }
    );
  }

  try {
    // Hash the token to compare with stored hash
    const hashedToken = createHash('sha256')
      .update(token)
      .digest('hex');
    
    // Find the token in the database
    const resetToken = await prisma.passwordResetToken.findFirst({
      where: {
        token: hashedToken,
        expires: {
          gt: new Date(),
        },
      },
      include: {
        user: true,
      },
    });

    // If token not found or expired
    if (!resetToken) {
      return NextResponse.json(
        { message: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    // Token is valid
    return NextResponse.json({
      message: 'Token is valid',
      userId: resetToken.userId,
    });
    
  } catch (error) {
    console.error('Error verifying token:', error);
    
    return NextResponse.json(
      { message: 'An error occurred while verifying the token' },
      { status: 500 }
    );
  }
}