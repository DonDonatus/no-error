import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'lib/auth';
import { prisma } from 'lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';

// Set the maximum file size (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
  secure: true // Use HTTPS
});

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
    
    // Convert file to base64 for Cloudinary upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString('base64');
    const dataURI = `data:${file.type};base64,${base64Image}`;
    
    // Generate a unique public_id for the image
    const uniqueId = uuidv4();
    
    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        dataURI,
        {
          public_id: `profile-pics/${uniqueId}`,
          overwrite: true,
          transformation: [
            { width: 400, height: 400, crop: "limit" }, // Resize image to reasonable dimensions
            { quality: "auto" } // Optimize quality automatically
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
    });
    
    // Get the secure URL from the result
    const profilePicUrl = (uploadResult as any).secure_url;
    
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