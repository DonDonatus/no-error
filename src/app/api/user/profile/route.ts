// File: app/api/user/profile/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'lib/auth';
import {prisma} from 'lib/prisma'; // Adjust based on your database setup

export async function GET() {
  try {
    // Get authenticated user from session
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Fetch user data from database
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true, // Using phoneNumber instead of phone to match your schema
        profilePic: true,
        // Don't include password for security
      },
    });
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Format the response to match what the frontend expects
    const formattedUser = {
      name: user.name || '',
      email: user.email,
      phone: user.phoneNumber || '', // Map phoneNumber to phone for frontend
      profilePic: user.profilePic || '/profile-pic.jpg', // Default if no profile pic
    };
    
    return NextResponse.json({ success: true, user: formattedUser });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}