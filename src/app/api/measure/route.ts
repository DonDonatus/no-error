// src/app/api/measure/route.ts
import { NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HF_TOKEN);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get('image') as Blob;
    
    // Ask the robot to measure
    const result = await hf.imageToText({
      data: imageFile,
      model: "datasciencesage/bodym_measurement_model",
    });
    
    // Turn robot talk into sizes
    const measurements = {
      height: extractNumber(result, 'height'),
      chest: extractNumber(result, 'chest'),
      waist: extractNumber(result, 'waist'),
      hips: extractNumber(result, 'hips'),
    };
    
    return NextResponse.json(measurements);
    
  } catch (error) {
    return NextResponse.json(
      { error: "Robot is sleeping! Try again later." },
      { status: 500 }
    );
  }
}

// Helper - finds numbers in robot talk
function extractNumber(data: any, key: string): number {
  // This depends on how your model returns data
  // Example: might search for "chest: 95cm" in text
  return 0; // Replace with actual parsing
}