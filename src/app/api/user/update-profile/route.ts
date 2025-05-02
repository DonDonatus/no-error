// File: app/api/user/update-profile/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'lib/auth';
import prisma from 'lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    // Get authenticated user from session
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get request body
    const body = await request.json();
    const { name, email, password, phone } = body;
    
    // Prepare data to update
    const updateData: any = {};
    
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone) updateData.phoneNumber = phone; // Map phone to phoneNumber for database
    
    // Hash password if provided and it's not the masked placeholder
    if (password && !password.includes('*')) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }
    
    // Update user in database
    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        profilePic: true,
      },
    });
    
    // Format the response to match what the frontend expects
    const formattedUser = {
      name: updatedUser.name || '',
      email: updatedUser.email,
      phone: updatedUser.phoneNumber || '', // Map phoneNumber to phone for frontend
      profilePic: updatedUser.profilePic || '/profile-pic.jpg',
    };
    
    return NextResponse.json({ success: true, user: formattedUser });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
