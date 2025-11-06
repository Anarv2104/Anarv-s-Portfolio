import { NextRequest, NextResponse } from "next/server";

// Placeholder chatbot - will use Node.js runtime, can switch to edge when implementing AI features

export async function POST(request: NextRequest) {
  // Placeholder for future AI chatbot implementation
  return NextResponse.json({ 
    message: "Chatbot endpoint ready for implementation" 
  }, { status: 200 });
}

export async function GET() {
  return NextResponse.json({ 
    status: "Chatbot API is ready",
    description: "Real-time AI assistant endpoint"
  }, { status: 200 });
}