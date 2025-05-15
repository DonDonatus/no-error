// FILE: src/app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';
import { sendVerificationEmail } from '@/lib/email';


const prisma = new PrismaClient();


// Password schema with strict requirements
const passwordSchema = z
  .string()
  .min(8, "Must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[0-9]/, "Must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Must contain at least one special character");


// Form validation schema
const formSchema = z.object({
  name: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().regex(/^\+1 \(\d{3}\) \d{3}-\d{4}$/, "Invalid US phone format"),
  password: passwordSchema,
});


export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validationResult = formSchema.safeParse(body);
   
    if (!validationResult.success) {
      return NextResponse.json({
        error: "Invalid input data",
        details: validationResult.error.errors
      }, { status: 400 });
    }
   
    const { name, email, phoneNumber, password } = validationResult.data;
   
    // Check if user with this email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
   
    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }
   
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
   
    // Generate verification token (UUID) and set expiry (24 hours)
    const verificationToken = uuidv4();
    const verificationTokenExpiry = new Date();
    verificationTokenExpiry.setHours(verificationTokenExpiry.getHours() + 24);
   
    // Send verification email
    const emailResult = await sendVerificationEmail(email, verificationToken);
   
    if (!emailResult.success) {
      return NextResponse.json({
        error: "Failed to send verification email"
      }, { status: 500 });
    }
   
    // Create temporary user record in database
    // Note: We're creating the user in the database but with emailVerified=false
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phoneNumber,
        password: hashedPassword,
        emailVerified: false,
        verificationToken,
        verificationTokenExpiry,
      }
    });
   
    return NextResponse.json({
      success: true,
      message: "Registration successful! Please check your email to verify your account."
    }, { status: 201 });
   
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({
      error: "An error occurred during registration"
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

