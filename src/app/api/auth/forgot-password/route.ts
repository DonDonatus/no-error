// src/app/api/auth/forgot-password/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createTransport } from 'nodemailer';
import { randomBytes, createHash } from 'crypto';
import { prisma } from 'lib/prisma';

// Define email sending function
async function sendPasswordResetEmail(email: string, resetToken: string) {
  console.log('Attempting to send email to:', email);
  
  // Create a reusable transporter object using SMTP transport
  const transporter = createTransport({
    host: process.env.EMAIL_SERVER || 'smtp.gmail.com', // Fallback to Gmail SMTP
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  console.log('Email configuration:', {
    host: process.env.EMAIL_SERVER || 'smtp.gmail.com',
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    authUser: process.env.EMAIL_USER ? '✓ Present' : '✗ Missing',
    authPass: process.env.EMAIL_PASSWORD ? '✓ Present' : '✗ Missing',
  });

  // Create reset URL
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL;
  const resetUrl = `${appUrl}/reset-password?token=${resetToken}`;
  
  console.log('Reset URL:', resetUrl);

  // Setup email data
  const mailOptions = {
    from: `"${process.env.EMAIL_FROM_NAME || 'UOMO MIGLIORE'}" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Password Reset Request",
    text: `Please use the following link to reset your password: ${resetUrl}. This link will expire in 1 hour.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Password Reset Request</h2>
        <p>You requested a password reset. Please click the link below to reset your password:</p>
        <p>
          <a 
            href="${resetUrl}" 
            style="display: inline-block; background-color: #08106c; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;"
          >
            Reset Password
          </a>
        </p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `,
  };

  try {
    // Send mail with defined transport object
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Re-throw to handle in the main function
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    console.log('Password reset requested for:', email);

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    // Always return success even if email doesn't exist for security reasons
    if (!user) {
      console.log('User not found with email:', email);
      return NextResponse.json(
        { message: 'If your email is registered, you will receive a password reset link' }
      );
    }

    // Generate a random reset token
    const resetToken = randomBytes(32).toString('hex');
    const hashedToken = createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // One hour expiration
    const tokenExpiry = new Date();
    tokenExpiry.setHours(tokenExpiry.getHours() + 1);

    console.log('Generated reset token for user:', user.id);

    // Save the token to the database
    await prisma.passwordResetToken.upsert({
      where: { userId: user.id },
      update: {
        token: hashedToken,
        expires: tokenExpiry,
      },
      create: {
        userId: user.id,
        token: hashedToken,
        expires: tokenExpiry,
      },
    });

    // Send the password reset email
    try {
      await sendPasswordResetEmail(user.email, resetToken);
      console.log('Password reset email sent successfully');
    } catch (emailError) {
      console.error('Failed to send password reset email:', emailError);
      // Return success anyway to avoid leaking information about registered emails
    }

    return NextResponse.json({
      message: 'If your email is registered, you will receive a password reset link',
    });
  } catch (error) {
    console.error('Password reset error:', error);
    
    return NextResponse.json(
      { message: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}