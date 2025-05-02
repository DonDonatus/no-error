"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";


// Password schema with strict requirements
const passwordSchema = z
  .string()
  .min(8, "Must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[0-9]/, "Must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Must contain at least one special character");


// Form validation schema
const formSchema = z.object({
  name: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().regex(/^\(\d{3}\)\s\d{3}-\d{4}$/, "Invalid phone format"),
  password: passwordSchema,
});


type SignupFormData = z.infer<typeof formSchema>;


const calculatePasswordScore = (password: string): number => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
};


export default function Signup() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [passwordScore, setPasswordScore] = useState(0);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);


  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(formSchema),
  });


  const phoneValue = watch("phoneNumber", "");
  const passwordValue = watch("password", "");


  // Handle phone number formatting
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    let formattedPhone = "";


    if (digits.length > 0) {
      formattedPhone += digits.substring(0, Math.min(3, digits.length));
      if (digits.length > 3) {
        formattedPhone = `(${formattedPhone}) ${digits.substring(3, Math.min(6, digits.length))}`;
        if (digits.length > 6) {
          formattedPhone += `-${digits.substring(6, Math.min(10, digits.length))}`;
        }
      }
    }


    setValue("phoneNumber", formattedPhone, { shouldValidate: true });
  };


  const onSubmit = async (data: SignupFormData) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });


      const result = await response.json();


      if (!response.ok) {
        setServerError(result.error || "Failed to create account");
        return;
      }


      router.push("/signin");
    } catch (error) {
      setServerError("An error occurred during signup");
    }
  };


  return (
    <main className="flex h-screen w-full bg-white overflow-hidden">
      {/* Left side - Image - Hidden on mobile */}
      <div className="relative hidden md:block md:w-1/2 lg:w-7/12 h-full">
        <img
          className="h-full w-full object-cover"
          alt="Man in suit"
          src="/images/signup.png"
        />
      </div>


      {/* Right side - Sign up form */}
      <div className="flex flex-1 flex-col items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto">
        <div className="w-full max-w-md flex flex-col items-center">
          {/* Logo - More reasonably sized */}
          <div className="relative mb-4 w-full max-w-full h-24 sm:h-28 md:h-32">
            <img
              className="h-full w-full object-contain"
              alt="Company logo"
              src="/images/image 3.png"
            />
          </div>


          {/* Sign up heading */}
          <h1 className="font-['Open_Sans',Helvetica] font-bold text-black text-3xl sm:text-3xl md:text-4xl text-center mb-2">
            Sign Up
          </h1>


          <p className="font-['Montserrat',Helvetica] font-light text-black text-base sm:text-lg text-center mb-6">
            Enter details to sign up
          </p>


          {serverError && (
            <p className="text-red-500 mb-3 text-sm">{serverError}</p>
          )}


          <Card className="w-full border-none shadow-none">
            <CardContent className="p-0 space-y-4">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Username input */}
                <div className="relative">
                  <label className="absolute left-0 top-1/2 -translate-y-1/2 font-['Montserrat',Helvetica] font-thin text-black text-base z-10 pl-4">
                    Username:
                  </label>
                  <Input
                    {...register("name")}
                    className="pl-24 h-12 rounded-md border-black text-base"
                    type="text"
                    placeholder="Enter your username"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>


                {/* Email input */}
                <div className="relative">
                  <label className="absolute left-0 top-1/2 -translate-y-1/2 font-['Montserrat',Helvetica] font-thin text-black text-base z-10 pl-4">
                    Email:
                  </label>
                  <Input
                    {...register("email")}
                    className="pl-20 h-12 rounded-md border-black text-base"
                    type="email"
                    placeholder="someone@gmail.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>


                {/* Phone input */}
                <div className="relative">
                  <label className="absolute left-0 top-1/2 -translate-y-1/2 font-['Montserrat',Helvetica] font-thin text-black text-base z-10 pl-4">
                    Phone:
                  </label>
                  <Input
                    {...register("phoneNumber")}
                    className="pl-20 h-12 rounded-md border-black text-base"
                    type="tel"
                    placeholder="(123) 456-7890"
                    value={phoneValue}
                    onChange={handlePhoneChange}
                    maxLength={14}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>
                  )}
                </div>


                {/* Password input */}
                <div className="relative">
                  <div className="relative">
                    <label className="absolute left-0 top-1/2 -translate-y-1/2 font-['Montserrat',Helvetica] font-thin text-black text-base z-10 pl-4">
                      Password:
                    </label>
                    <Input
                      {...register("password")}
                      className="pl-24 h-12 rounded-md border-black text-base"
                      type="password"
                      placeholder={isPasswordFocused ? "" : "At least 8 characters"}
                      onFocus={() => setIsPasswordFocused(true)}
                      onBlur={() => {
                        // Only hide if password is empty
                        if (!passwordValue) {
                          setIsPasswordFocused(false);
                        }
                      }}
                      onChange={(e) => {
                        const val = e.target.value;
                        setValue("password", val);
                        setPasswordScore(calculatePasswordScore(val));
                      }}
                    />
                  </div>
                 
                  {/* Password requirements - Only shown when password input is focused or has value */}
                  {(isPasswordFocused || passwordValue) && (
                    <div className="mt-2 bg-gray-50 p-3 rounded-md w-full">
                      <p className="font-medium mb-1 text-sm">Password must contain:</p>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center">
                          <span className={`mr-2 text-lg ${passwordValue && passwordValue.length >= 8 ? "text-green-500" : "text-gray-400"}`}>•</span>
                          <span className={passwordValue && passwordValue.length >= 8 ? "text-green-500" : ""}>At least 8 characters</span>
                        </li>
                        <li className="flex items-center">
                          <span className={`mr-2 text-lg ${/[A-Z]/.test(passwordValue) ? "text-green-500" : "text-gray-400"}`}>•</span>
                          <span className={/[A-Z]/.test(passwordValue) ? "text-green-500" : ""}>1 uppercase letter</span>
                        </li>
                        <li className="flex items-center">
                          <span className={`mr-2 text-lg ${/[0-9]/.test(passwordValue) ? "text-green-500" : "text-gray-400"}`}>•</span>
                          <span className={/[0-9]/.test(passwordValue) ? "text-green-500" : ""}>1 number</span>
                        </li>
                        <li className="flex items-center">
                          <span className={`mr-2 text-lg ${/[^A-Za-z0-9]/.test(passwordValue) ? "text-green-500" : "text-gray-400"}`}>•</span>
                          <span className={/[^A-Za-z0-9]/.test(passwordValue) ? "text-green-500" : ""}>1 special character</span>
                        </li>
                      </ul>
                     
                      {/* Password strength bar - Show only when typing */}
                      {passwordValue && (
                        <div className="mt-3">
                          <div className="h-2 w-full bg-gray-200 rounded">
                            <div
                              className={`h-full rounded transition-all duration-300 ${
                                passwordScore === 0
                                  ? "w-0"
                                  : passwordScore === 1
                                  ? "w-1/4 bg-red-500"
                                  : passwordScore === 2
                                  ? "w-1/2 bg-yellow-500"
                                  : passwordScore === 3
                                  ? "w-3/4 bg-blue-500"
                                  : "w-full bg-green-500"
                              }`}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                 
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                  )}
                </div>


                {/* Sign up button */}
                <div>
                  <Button
                    type="submit"
                    className="w-full h-12 bg-[#08106c] hover:bg-[#08106c]/90 rounded-md font-['Open_Sans',Helvetica] font-bold text-xl"
                    disabled={passwordScore < 3} // Disable if password is weak
                  >
                    Sign Up
                  </Button>
                </div>


                {/* Sign in link */}
                <div className="text-center font-['Montserrat',Helvetica] text-base sm:text-lg mt-2">
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
}



