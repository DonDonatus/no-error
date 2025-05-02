// File: app/api/user/upload-profile-pic/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'lib/auth';
import prisma from 'lib/prisma';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { mkdir } from 'fs/promises';

// Set the maximum file size (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

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
    
    // Parse form data
    const formData = await request.formData();
    const file = formData.get('profilePic') as File;
    
    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file provided' },
        { status: 400 }
      );
    }
    
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, message: 'File size exceeds 5MB limit' },
        { status: 400 }
      );
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, message: 'File must be an image' },
        { status: 400 }
      );
    }
    
    // Read file as array buffer
    const buffer = await file.arrayBuffer();
    
    // Generate a unique filename
    const fileName = `${uuidv4()}${path.extname(file.name)}`;
    
    // Set the upload directory and create it if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    try {
      // Try to ensure the directory exists
      await mkdir(uploadDir, { recursive: true });
    } catch (err) {
      console.error('Error creating upload directory:', err);
    }
    
    // Write file to disk
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, Buffer.from(buffer));
    
    // Create the URL for the uploaded file
    const profilePicUrl = `/uploads/${fileName}`;
    
    // Update user profile in database
    await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        profilePic: profilePicUrl,
      },
    });
    
    return NextResponse.json({ success: true, profilePicUrl });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to upload profile picture' },
      { status: 500 }
    );
  }
}