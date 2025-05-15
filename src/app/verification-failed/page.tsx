// FILE: src/app/verification-failed/page.tsx
"use client";


import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";


export default function VerificationFailed() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-md border rounded-lg shadow-lg overflow-hidden">
        <CardContent className="p-8">
          <div className="flex flex-col items-center text-center">
            {/* Logo */}
            <div className="w-48 h-48 mb-6">
              <img
                src="/icons/logoh.svg"
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
           
            {/* Error icon */}
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 text-red-500">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
           
            <h1 className="font-['Open_Sans',Helvetica] font-bold text-2xl md:text-3xl text-black mb-4">
              Verification Failed
            </h1>
           
            <p className="font-['Montserrat',Helvetica] text-gray-600 mb-8 max-w-sm">
              The email verification link is invalid or has expired. Please try signing up again.
            </p>
           
            <div className="flex flex-col w-full space-y-4">
              <Link href="/signup" className="w-full">
                <Button className="w-full h-12 bg-[#08106c] hover:bg-[#08106c]/90 font-['Open_Sans',Helvetica] font-bold">
                  Try Again
                </Button>
              </Link>
             
              <Link href="/" className="w-full">
                <Button variant="outline" className="w-full h-12 border-[#08106c] text-[#08106c] hover:bg-[#08106c]/10 font-['Open_Sans',Helvetica]">
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

