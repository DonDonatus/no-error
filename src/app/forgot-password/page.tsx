"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CheckCircle } from "lucide-react";

interface ForgotPasswordFormData {
  email: string;
}

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>();
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setStatus("loading");
      
      // Call the API route to send password reset email
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to send reset link');
      }
      
      // Set success state
      setStatus("success");
      setErrorMessage(null);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to send reset link. Please try again.");
      console.error(error);
    }
  };

  return (
    <main className="flex h-screen w-full bg-white">
      {/* Left side - Image */}
      <div className="relative w-full max-w-[767px] h-full">
        <img
          className="h-full w-full object-cover"
          alt="Man in suit"
          src="/images/image1.png"
        />
      </div>

      {/* Right side - Forgot password form */}
      <div className="flex flex-1 flex-col items-center justify-center px-8">
        <div className="w-full max-w-[599px] flex flex-col items-center">
          {/* Logo */}
          <div className="relative mb-6 w-full max-w-[650px] h-[200px]">
            <img
              className="h-full w-full object-contain"
              alt="Company logo"
              src="/images/image 3.png"
            />
          </div>

          <h1 className="font-bold text-[40px] text-center mb-2">Forgot Password</h1>
          <p className="text-lg text-center mb-8">
            Enter your email address and we'll send you a link to reset your password
          </p>

          <Card className="w-full max-w-[412px] border-none shadow-none">
            <CardContent className="p-0 space-y-6">
              {status === "success" ? (
                <div className="flex flex-col items-center space-y-6 py-4">
                  <CheckCircle size={64} className="text-green-500" />
                  <div className="text-center">
                    <h2 className="text-xl font-bold mb-2">Check your email</h2>
                    <p className="mb-6">
                      We've sent a password reset link to your email address. Please check your inbox.
                    </p>
                  </div>
                  <Button 
                    onClick={() => router.push('/signin')} 
                    className="w-full h-11 bg-[#08106c] rounded-[10px] text-[22px] font-bold"
                  >
                    Return to Sign In
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Email */}
                  <div className="relative">
                    <label className="absolute left-0 top-1/2 -translate-y-1/2 z-10 pl-2">
                      Email:
                    </label>
                    <Input
                      {...register("email", { 
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                      className="pl-[80px] h-[42px] rounded-[5px] border-black"
                      type="email"
                    />
                  </div>
                  
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                  )}

                  {errorMessage && (
                    <p className="text-red-500 text-sm text-center">{errorMessage}</p>
                  )}

                  <Button 
                    type="submit" 
                    disabled={status === "loading"}
                    className="w-full h-11 bg-[#08106c] rounded-[10px] text-[22px] font-bold"
                  >
                    {status === "loading" ? "Sending..." : "Send Reset Link"}
                  </Button>

                  <div className="flex justify-center">
                    <Link href="/signin" className="flex items-center text-[#08106c] hover:underline">
                      <ArrowLeft size={16} className="mr-1" />
                      Back to Sign In
                    </Link>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}