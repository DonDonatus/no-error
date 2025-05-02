import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'lib/auth';
import prisma from 'lib/prisma';
import { put } from '@vercel/blob';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { mkdir } from 'fs/promises';

// Check if running on Vercel
const isVercel = process.env.VERCEL === '1';

export const config = {
  runtime: isVercel ? 'edge' : 'nodejs',
};

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const formData = await request.formData();
    const file = formData.get('profilePic') as File;
    
    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file provided' },
        { status: 400 }
      );
    }
    
    // Validate file (5MB max, image only)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: 'File size exceeds 5MB limit' },
        { status: 400 }
      );
    }
    
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, message: 'File must be an image' },
        { status: 400 }
      );
    }

    let profilePicUrl: string;

    if (isVercel) {
      // Vercel Production - Use Blob Storage
      const { url } = await put(`profile-pics/${file.name}`, file, {
        access: 'public',
      });
      profilePicUrl = url;
    } else {
      // Local Development - Use Filesystem
      const buffer = await file.arrayBuffer();
      const fileName = `${uuidv4()}${path.extname(file.name)}`;
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (err) {
        console.error('Error creating upload directory:', err);
      }
      
      const filePath = path.join(uploadDir, fileName);
      await writeFile(filePath, Buffer.from(buffer));
      profilePicUrl = `/uploads/${fileName}`;
    }

    // Update user in database
    await prisma.user.update({
      where: { email: session.user.email },
      data: { profilePic: profilePicUrl },
    });

    return NextResponse.json({ 
      success: true, 
      profilePicUrl,
      storageType: isVercel ? 'vercel-blob' : 'local-filesystem'
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, message: 'Upload failed' },
      { status: 500 }
    );
  }
}