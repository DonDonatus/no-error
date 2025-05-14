// app/api/test-db/route.ts
import { NextResponse } from "next/server";
import {prisma} from "lib/prisma";

export async function GET() {
  try {
    console.log("Testing database connection");
    
    // Try to count users as a simple database test
    const count = await prisma.user.count();
    console.log("Database connection successful. User count:", count);
    
    return NextResponse.json({ 
      success: true, 
      message: "Database connection successful", 
      userCount: count 
    }, { status: 200 });
  } catch (error) {
    console.error("Database test failed:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Database connection failed", 
        details: (error as Error).message 
      },
      { status: 500 }
    );
  }
}