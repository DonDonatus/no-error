"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

interface signupFormData {
  email: string;
  password: string;
  remember: boolean;
}

export const signup= (): JSX.Element => {
  const { register, handleSubmit } = useForm<signupFormData>();

  const onSubmit = (data: signupFormData) => {
    console.log(data);
  };

  return (
    <main className="flex h-screen w-full bg-white">
      {/* Left side - Image */}
      <div className="relative w-full max-w-[767px] h-full">
        <img
          className="h-full w-full object-cover"
          alt="Man in suit"
          src="/images/signup.png"
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

          {/* Sign in heading */}
          <h1 className="font-['Open_Sans',Helvetica] font-bold text-black text-[40px] text-center mb-2">
            Sign Up
          </h1>

          <p className="font-['Montserrat',Helvetica] font-light text-black text-lg text-center mb-8">
            Enter details to sign up
          </p>

          <Card className="w-full max-w-[412px] border-none shadow-none">
            <CardContent className="p-0 space-y-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                 {/* USERNAME input */}
                 <div className="relative">
                  <label className="absolute left-0 top-1/2 -translate-y-1/2 font-['Montserrat',Helvetica] font-thin text-black text-[17px] z-10 pl-2">
                    Username:
                  </label>
                  <Input
                    {...register("email")}
                    className="pl-[100px] h-[42px] rounded-[5px] border-black"
                    type="name"
                    placeholder="Enter your username"
                  />
                </div>


                {/* Email input */}
                <div className="relative">
                  <label className="absolute left-0 top-1/2 -translate-y-1/2 font-['Montserrat',Helvetica] font-thin text-black text-[17px] z-10 pl-2">
                    Email:
                  </label>
                  <Input
                    {...register("email")}
                    className="pl-[80px] h-[42px] rounded-[5px] border-black"
                    type="email"
                    placeholder="someone@gmail.com"
                  />
                </div>


                {/* Password input */}
                <div className="relative">
                  <label className="absolute left-0 top-1/2 -translate-y-1/2 font-['Montserrat',Helvetica] font-thin text-black text-[17px] z-10 pl-2">
                    Password:
                  </label>
                  <Input
                    {...register("password")}
                    className="pl-[100px] h-[42px] rounded-[5px] border-black"
                    type="password"
                  />
                </div>

                {/* Remember me checkbox */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    className="h-[27px] w-[31px] rounded-[3px] border-black"
                  />
                  <label
                    htmlFor="remember"
                    className="font-['Montserrat',Helvetica] font-light text-black text-[17px]"
                  >
                    Remember me?
                  </label>
                </div>

                {/* Sign in button */}
                <div>
                  <Link href="/signin">
                <Button
                  type="submit"
                  className="w-full h-11 bg-[#08106c] hover:bg-[#08106c]/90 rounded-[10px] font-['Open_Sans',Helvetica] font-bold text-[22px]"
                >
                  Sign Up
                </Button>
                </Link>
                </div>

                {/* Sign up link */}
                <div className="text-center font-['Montserrat',Helvetica] text-lg">
                  <span className="font-light text-black">Already have an account?</span>{" "}
                  <Link href="/signin" className="font-bold text-[#08106c]">
                    Sign in
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default signup;