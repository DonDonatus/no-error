// FILE: src/app/api/auth/resend-verification/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { sendVerificationEmail } from '@/lib/email';


const prisma = new PrismaClient();


// Schema for resend request
const resendSchema = z.object({
  email: z.string().email("Invalid email address")
});


export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validationResult = resendSchema.safeParse(body);
   
    if (!validationResult.success) {
      return NextResponse.json({
        error: "Invalid input data",
        details: validationResult.error.errors
      }, { status: 400 });
    }
   
    const { email } = validationResult.data;
   
    // Find user with this email
    const user = await prisma.user.findUnique({
      where: { email }
    });
   
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
   
    if (user.emailVerified) {
      return NextResponse.json({
        success: true,
        message: "Email already verified"
      }, { status: 200 });
    }
   
    // Generate new verification token (UUID) and set expiry (24 hours)
    const verificationToken = uuidv4();
    const verificationTokenExpiry = new Date();
    verificationTokenExpiry.setHours(verificationTokenExpiry.getHours() + 24);
   
    // Update user with new verification token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        verificationToken,
        verificationTokenExpiry
      }
    });
   
    // Send verification email
    const emailResult = await sendVerificationEmail(email, verificationToken);
   
    if (!emailResult.success) {
      return NextResponse.json({
        error: "Failed to send verification email"
      }, { status: 500 });
    }
   
    return NextResponse.json({
      success: true,
      message: "Verification email sent successfully"
    }, { status: 200 });
   
  } catch (error) {
    console.error("Resend verification error:", error);
    return NextResponse.json({
      error: "An error occurred while resending verification email"
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

