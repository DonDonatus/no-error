//src /app/api/auth/reset-password/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { prisma } from 'lib/prisma';
import { hash } from 'bcrypt';

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    // Validate input
    if (!token || !password) {
      return NextResponse.json(
        { message: 'Token and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

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
    });

    // If token not found or expired
    if (!resetToken) {
      return NextResponse.json(
        { message: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await hash(password, 10);

    // Update the user's password
    await prisma.user.update({
      where: {
        id: resetToken.userId,
      },
      data: {
        password: hashedPassword,
      },
    });

    // Delete the used token
    await prisma.passwordResetToken.delete({
      where: {
        id: resetToken.id,
      },
    });

    return NextResponse.json({
      message: 'Password has been reset successfully',
    });
    
  } catch (error) {
    console.error('Error resetting password:', error);
    
    return NextResponse.json(
      { message: 'An error occurred while resetting your password' },
      { status: 500 }
    );
  }
}