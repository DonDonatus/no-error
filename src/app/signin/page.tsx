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
import { useState } from "react";

interface SignInFormData {
  email: string;
  password: string;
  remember: boolean;
}

export default function Signin() {
  const { register, handleSubmit } = useForm<SignInFormData>();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: SignInFormData) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.ok) {
      router.push("/homepage");
    } else {
      setError("Invalid email or password");
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

                {/* Password */}
                <div className="relative">
                  <label className="absolute left-0 top-1/2 -translate-y-1/2 z-10 pl-2">
                    Password:
                  </label>
                  <Input
                    {...register("password")}
                    className="pl-[100px] h-[42px] rounded-[5px] border-black"
                    type="password"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" className="h-[27px] w-[31px]" />
                  <label htmlFor="remember">Remember me?</label>
                </div>

                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <Button type="submit" className="w-full h-11 bg-[#08106c] rounded-[10px] text-[22px]">
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
