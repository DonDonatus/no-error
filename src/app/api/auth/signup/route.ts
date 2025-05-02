import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { z } from "zod";


const prisma = new PrismaClient();


// Password validation schema (matches frontend)
const passwordSchema = z
  .string()
  .min(8)
  .regex(/[A-Z]/)
  .regex(/[0-9]/)
  .regex(/[^A-Za-z0-9]/);


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, phoneNumber } = body;


    // Validate password on server side
    try {
      passwordSchema.parse(password);
    } catch (err) {
      return NextResponse.json(
        { error: "Password does not meet security requirements" },
        { status: 400 }
      );
    }


    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });


    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }


    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12); // Increased salt rounds


    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        role: "CUSTOMER",
      },
    });


    // Return response without password
    const { password: _, ...userWithoutPassword } = user;
   
    return NextResponse.json(
      {
        message: "User created successfully",
        user: userWithoutPassword
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}



