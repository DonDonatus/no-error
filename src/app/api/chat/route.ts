import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    // Get the messages from the request
    const body = await req.json();
    const messages = body.messages;
    
    console.log("Received messages:", JSON.stringify(messages));
    
    // Check if we have messages and API key
    if (!messages || !Array.isArray(messages)) {
      console.error("Invalid or missing messages array");
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }
    
    // Check if we have an API key
    if (!process.env.GROQ_API_KEY) {
      console.error("Missing GROQ_API_KEY in environment variables");
      return NextResponse.json({ error: "API key configuration error" }, { status: 500 });
    }
    
    console.log("Calling Groq API...");
    
    // Make request to Groq API
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-8b-8192',
        messages: messages, // Make sure this is properly passed
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    console.log("Groq API response received:", response.status);
    
    // Return the response
    const assistantMessage = response.data.choices[0].message;
    return NextResponse.json({ reply: assistantMessage });
    
  } catch (error: any) {
    console.error("Groq API error:", error.response?.data || error.message);
    
    // More detailed error logging
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", JSON.stringify(error.response.data));
    }
    
    // Handle different error scenarios
    if (error.response?.status === 401) {
      return NextResponse.json({ error: "Authentication error with AI service" }, { status: 401 });
    }
    
    return NextResponse.json({ 
      error: "Failed to process your request: " + (error.message || "Unknown error")
    }, { status: 500 });
  }
}