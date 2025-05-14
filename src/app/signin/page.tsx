"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

interface SignInFormData {
  email: string;
  password: string;
  remember: boolean;
}

export default function Signin() {
  const { register, handleSubmit, watch } = useForm<SignInFormData>();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: SignInFormData) => {
    try {
      // Pass the remember option directly to next-auth
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: "/homepage",
        // The next-auth built-in way to handle "remember me"
        // When true, this will extend the session lifetime
        remember: data.remember,
      });

      if (res?.ok) {
        router.push("/homepage");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("An error occurred during sign in");
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

      {/* Right side - Sign in form */}
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

          <h1 className="font-bold text-[40px] text-center mb-2">Sign in</h1>
          <p className="text-lg text-center mb-8">Enter email and password to sign in</p>

          <Card className="w-full max-w-[412px] border-none shadow-none">
            <CardContent className="p-0 space-y-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email */}
                <div className="relative">
                  <label className="absolute left-0 top-1/2 -translate-y-1/2 z-10 pl-2">
                    Email:
                  </label>
                  <Input
                    {...register("email")}
                    className="pl-[80px] h-[42px] rounded-[5px] border-black"
                    type="email"
                  />
                </div>

                {/* Password with eye toggle */}
                <div className="relative">
                  <label className="absolute left-0 top-1/2 -translate-y-1/2 z-10 pl-2">
                    Password:
                  </label>
                  <Input
                    {...register("password")}
                    className="pl-[100px] pr-10 h-[42px] rounded-[5px] border-black"
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

                {/* Remember me and Forgot Password on the same line */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remember" 
                      className="h-[23px] w-[23px] "
                      {...register("remember")}
                    />
                    <label htmlFor="remember">Remember me?</label>
                  </div>
                  <Link href="/forgot-password" className="text-[#08106c] hover:underline">
                    Forgot Password?
                  </Link>
                </div>

                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <Button type="submit" className="w-full h-11 bg-[#08106c] rounded-[10px] text-[22px] font-bold">
                  Sign in
                </Button>

                <div className="text-center text-lg">
                  <span>No account?</span>{" "}
                  <Link href="/signup" className="font-bold text-[#08106c]">
                    Sign up here
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}