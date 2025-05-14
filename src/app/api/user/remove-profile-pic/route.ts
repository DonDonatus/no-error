// src/app/api/user/remove-profile-pic/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma}from 'lib/prisma';
import { authOptions } from 'lib/auth';


export async function POST(req: Request) {
  try {
    // Verify authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }


    // Update user in database
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { profilePic: null },
      select: {
        id: true,
        profilePic: true
      }
    });


    return NextResponse.json({
      success: true,
      profilePic: updatedUser.profilePic
    });


  } catch (error) {
    console.error('Error removing profile picture:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to remove profile picture',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}


// Explicitly declare that other methods are not allowed
export async function GET() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed' },
    { status: 405 }
  );
}


export async function PUT() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed' },
    { status: 405 }
  );
}


export async function DELETE() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed' },
    { status: 405 }
  );
}



