// FILE: src/app/verification-pending/page.tsx
"use client";


import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Mail } from "lucide-react";


export default function VerificationPending() {
  const [isResending, setIsResending] = useState(false);
  const [resendSuccessful, setResendSuccessful] = useState(false);
  const [resendError, setResendError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);


  // Get email from sessionStorage on component mount
  useEffect(() => {
    const storedEmail = sessionStorage.getItem('signupEmail');
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);


  // Handle resend verification email
  const handleResendVerification = async () => {
    if (!userEmail) {
      setResendError("Email not found. Please try signing up again.");
      return;
    }
   
    setIsResending(true);
    setResendError(null);
   
    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail }),
      });
     
      const result = await response.json();
     
      if (!response.ok) {
        setResendError(result.error || "Failed to resend verification email");
        return;
      }
     
      // Success state
      setResendSuccessful(true);
     
      // Reset after 5 seconds
      setTimeout(() => {
        setResendSuccessful(false);
      }, 5000);
     
    } catch (error) {
      setResendError("Failed to resend verification email. Please try again.");
    } finally {
      setIsResending(false);
    }
  };


  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-md border rounded-lg shadow-lg overflow-hidden">
        <CardContent className="p-8">
          <div className="flex flex-col items-center text-center">
           
            {/* Email icon */}
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-6">
              <Mail size={40} className="text-[#08106c]" />
            </div>
           
            <h1 className="font-['Open_Sans',Helvetica] font-bold text-2xl md:text-3xl text-black mb-4">
              Verify Your Email
            </h1>
           
            <p className="font-['Montserrat',Helvetica] text-gray-600 mb-3 max-w-sm">
              We've sent a verification link to:
            </p>
           
            {userEmail && (
              <p className="font-['Montserrat',Helvetica] font-medium text-black mb-8 break-words max-w-sm">
                {userEmail}
              </p>
            )}
           
            <p className="font-['Montserrat',Helvetica] text-gray-600 mb-8 max-w-sm">
              Please check your inbox and click the link to complete your registration.
            </p>


            {resendSuccessful && (
              <div className="mb-6 flex items-center text-green-600 bg-green-50 p-3 rounded-md w-full">
                <Check size={20} className="mr-2" />
                <span>Verification email sent successfully!</span>
              </div>
            )}


            {resendError && (
              <div className="mb-6 text-red-500 bg-red-50 p-3 rounded-md w-full">
                {resendError}
              </div>
            )}
           
            <div className="flex flex-col w-full space-y-4">
              <Button
                onClick={handleResendVerification}
                disabled={isResending || resendSuccessful}
                className="w-full h-12 bg-[#08106c] hover:bg-[#08106c]/90 font-['Open_Sans',Helvetica] font-bold"
              >
                {isResending ? "Sending..." : resendSuccessful ? "Email Sent!" : "Resend Verification Email"}
              </Button>
             
              <Link href="/signin" className="w-full">
                <Button variant="outline" className="w-full h-12 border-[#08106c] text-[#08106c] hover:bg-[#08106c]/10 font-['Open_Sans',Helvetica]">
                  Already Verified? Sign In
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

