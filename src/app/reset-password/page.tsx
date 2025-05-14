"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";

interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

export default function ResetPassword() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ResetPasswordFormData>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const [tokenChecked, setTokenChecked] = useState(false);

  // Check if token is valid on component mount
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setTokenValid(false);
        setErrorMessage("Invalid or missing reset token");
        setTokenChecked(true);
        return;
      }

      try {
        const response = await fetch(`/api/auth/verify-reset-token?token=${token}`);
        const data = await response.json();
        
        setTokenValid(response.ok);
        if (!response.ok) {
          setErrorMessage(data.message || "Invalid or expired token");
        }
      } catch (error) {
        setTokenValid(false);
        setErrorMessage("Failed to verify token");
        console.error(error);
      } finally {
        setTokenChecked(true);
      }
    };

    verifyToken();
  }, [token]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (data.password !== data.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      setStatus("loading");
      
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          token,
          password: data.password 
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to reset password');
      }
      
      // Set success state
      setStatus("success");
      setErrorMessage(null);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to reset password. Please try again.");
      console.error(error);
    }
  };

  // Show loading state while checking token
  if (!tokenChecked) {
    return (
      <main className="flex h-screen w-full bg-white">
        <div className="relative w-full max-w-[767px] h-full">
          <img
            className="h-full w-full object-cover"
            alt="Man in suit"
            src="/images/image1.png"
          />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <p className="text-lg mb-2">Verifying reset token...</p>
          </div>
        </div>
      </main>
    );
  }

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

      {/* Right side - Reset password form */}
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

          <h1 className="font-bold text-[40px] text-center mb-2">Reset Password</h1>
          
          <Card className="w-full max-w-[412px] border-none shadow-none">
            <CardContent className="p-0 space-y-6">
              {!tokenValid ? (
                <div className="flex flex-col items-center space-y-6 py-4">
                  <XCircle size={64} className="text-red-500" />
                  <div className="text-center">
                    <h2 className="text-xl font-bold mb-2">Invalid Token</h2>
                    <p className="mb-6">
                      {errorMessage || "Your password reset link is invalid or has expired."}
                    </p>
                  </div>
                  <Button 
                    onClick={() => router.push('/forgot-password')} 
                    className="w-full h-11 bg-[#08106c] rounded-[10px] text-[22px] font-bold"
                  >
                    Request New Reset Link
                  </Button>
                </div>
              ) : status === "success" ? (
                <div className="flex flex-col items-center space-y-6 py-4">
                  <CheckCircle size={64} className="text-green-500" />
                  <div className="text-center">
                    <h2 className="text-xl font-bold mb-2">Password Reset Successful</h2>
                    <p className="mb-6">
                      Your password has been successfully reset. You can now sign in with your new password.
                    </p>
                  </div>
                  <Button 
                    onClick={() => router.push('/signin')} 
                    className="w-full h-11 bg-[#08106c] rounded-[10px] text-[22px] font-bold"
                  >
                    Sign In
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <p className="text-center mb-4">
                    Please enter your new password below
                  </p>
                  
                  {/* New Password */}
                  <div className="relative">
                    <label className="absolute left-0 top-1/2 -translate-y-1/2 z-10 pl-2">
                      New Password:
                    </label>
                    <Input
                      {...register("password", { 
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters"
                        }
                      })}
                      className="pl-[130px] pr-10 h-[42px] rounded-[5px] border-black"
                      type={showPassword ? "text" : "password"}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                  )}

                  {/* Confirm Password */}
                  <div className="relative">
                    <label className="absolute left-0 top-1/2 -translate-y-1/2 z-10 pl-2">
                      Confirm Password:
                    </label>
                    <Input
                      {...register("confirmPassword", { 
                        required: "Please confirm your password",
                        validate: value => value === watch('password') || "Passwords do not match"
                      })}
                      className="pl-[150px] pr-10 h-[42px] rounded-[5px] border-black"
                      type={showConfirmPassword ? "text" : "password"}
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                  )}

                  {errorMessage && (
                    <p className="text-red-500 text-sm text-center">{errorMessage}</p>
                  )}

                  <Button 
                    type="submit" 
                    disabled={status === "loading"}
                    className="w-full h-11 bg-[#08106c] rounded-[10px] text-[22px] font-bold"
                  >
                    {status === "loading" ? "Resetting..." : "Reset Password"}
                  </Button>

                  <div className="text-center text-lg">
                    <Link href="/signin" className="text-[#08106c] hover:underline">
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