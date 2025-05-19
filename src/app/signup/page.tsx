"use client";


import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";


// Password schema with strict requirements
const passwordSchema = z
  .string()
  .min(8, "Must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[0-9]/, "Must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Must contain at least one special character");


// Form validation schema with improved phone validation
const formSchema = z.object({
  name: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().regex(/^\+1 \(\d{3}\) \d{3}-\d{4}$/, "Invalid US phone format"),
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
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


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
  const emailValue = watch("email", "");


 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const onSubmit = async (data: SignupFormData) => {
    try {
      setIsLoading(true);
      setServerError(null);


      // Store email in sessionStorage to use for resending verification if needed
      sessionStorage.setItem('signupEmail', data.email);


      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });


      const result = await response.json();


      if (!response.ok) {
        setServerError(result.error || "Failed to create account");
        setIsLoading(false);
        return;
      }


      // Redirect to verification pending page
      router.push("/verification-pending");
     
    } catch (error) {
      setServerError("An error occurred during signup");
      setIsLoading(false);
    }
  };


  return (
    <main className="flex flex-col md:flex-row w-full min-h-screen">
      {/* Left side - Background Image */}
      {/* Background image for all screens - positioned absolutely behind content */}
      <div className="fixed inset-0 -z-10 md:hidden">
        <div className="absolute inset-0 bg-black/20"></div> {/* Optional overlay for better text contrast */}
        <img
          src="/images/signup.png"
          alt="Man in suit"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 backdrop-blur-sm md:hidden"></div>
      </div>


      {/* Original image container for larger screens */}
      <div className="hidden md:block md:w-1/2 h-screen sticky top-0">
        <div className="relative w-full h-full">
          <img
            src="/images/signup.png"
            alt="Man in suit"
            className="w-full h-full object-cover"
          />
        </div>
      </div>


      {/* Right side - Sign up form */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-4 md:px-8 z-10 min-h-screen">
        <div className="w-full max-w-[90%] md:max-w-[599px] flex flex-col items-center mt-[15vh] md:mt-0 pb-8">
          {/* Logo for large screens */}
          <div className="relative w-full max-w-full h-48 sm:h-56 md:h-64 hidden sm:block top-5">
            <img
              className="h-full w-full object-contain"
              alt="Large screen logo"
              src="/images/image3.png"
            />
          </div>
 
          {/* Logo for small screens */}
          <div className="relative w-full max-w-[100%] sm:hidden h-[180px] -mb-6 -mt-16">
            <img
              className="h-full w-full object-contain"
              alt="Small screen logo"
              src="/images/image3.png"
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
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    validate: (value) => {
                      const digits = value.replace(/\D/g, "");
                      return digits.length === 10 || "Phone number must be 10 digits";
                    },
                  })}
                  className="pl-20 h-12 rounded-md border-black text-base"
                  type="tel"
                  placeholder="(123) 456-7890"
                  maxLength={14} // matches formatted length
                  onChange={(e) => {
                    const input = e.target as HTMLInputElement;
                    const digits = input.value.replace(/\D/g, "").slice(0, 10);

                    let formatted = digits;
                    if (digits.length > 6) {
                      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
                    } else if (digits.length > 3) {
                      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
                    } else if (digits.length > 0) {
                      formatted = `(${digits}`;
                    }

                    input.value = formatted;
                  }}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>
                )}
              </div>





                {/* Password input with visibility toggle */}
                <div className="relative">
                  <div className="relative">
                    <label className="absolute left-0 top-1/2 -translate-y-1/2 font-['Montserrat',Helvetica] font-thin text-black text-base z-10 pl-4">
                      Password:
                    </label>
                    <Input
                      {...register("password")}
                      className="pl-24 pr-12 h-12 rounded-md border-black text-base"
                      type={showPassword ? "text" : "password"}
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
                    disabled={isLoading || passwordScore < 3} // Disable if password is weak or loading
                  >
                    {isLoading ? "Signing Up..." : "Sign Up"}
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

