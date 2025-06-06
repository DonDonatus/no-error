import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from 'lib/auth';
import { prisma } from 'lib/prisma';

// Add this export config to enable dynamic behavior
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
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
        phoneNumber: true,
        profilePic: true,
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