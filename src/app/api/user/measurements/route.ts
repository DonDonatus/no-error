// app/api/user/measurements/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Note: In a real application, you would use a database like MongoDB, PostgreSQL, or a service like Firebase
// This is a simplified in-memory storage for demonstration purposes
let userMeasurements: Record<string, any> = {};

export async function GET(request: NextRequest) {
  try {
    // In a real application, you would fetch from your database
    // and verify the user's session/authentication
    
    // For demo purposes, we'll return the stored measurements or dummy data
    const userId = '123'; // In a real app, get this from the authenticated session
    
    const measurements = userMeasurements[userId] || {
      chest: '40 inches',
      neck: '16 inches',
      trouserLength: '32 inches',
      shoulderWidth: '18 inches',
      trouserWaist: '34 inches',
      armLength: '25 inches',
      hipCircumference: '40 inches',
      sleeveLength: '34 inches',
    };
    
    return NextResponse.json({ success: true, measurements }, { status: 200 });
  } catch (error) {
    console.error('Error fetching measurements:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch measurements' 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate measurement data
    const requiredFields = [
      'chest', 'neck', 'trouserLength', 'shoulderWidth', 
      'trouserWaist', 'armLength', 'hipCircumference', 'sleeveLength'
    ];
    
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ 
          success: false, 
          error: `Missing required field: ${field}` 
        }, { status: 400 });
      }
    }
    
    // In a real app, get userId from authenticated session
    const userId = '123';
    
    // Save the measurements
    userMeasurements[userId] = data;
    
    // In a real application, you would save to your database here
    // await db.measurements.upsert({ userId, ...data });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Measurements saved successfully' 
    }, { status: 200 });
  } catch (error) {
    console.error('Error saving measurements:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to save measurements' 
    }, { status: 500 });
  }
}