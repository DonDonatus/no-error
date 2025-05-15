// src/app/verify-email/page.tsx
'use client';


import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';


export default function VerifyEmailPage() {
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();


  useEffect(() => {
    const token = searchParams.get('token');
   
    if (token) {
      verifyToken(token);
    }
  }, [searchParams]);


  const verifyToken = async (token: string) => {
    setVerificationStatus('verifying');
   
    try {
      const response = await fetch(`/api/verify-email?token=${token}`);
      const data = await response.json();


      if (!response.ok) {
        throw new Error(data.error || 'Verification failed');
      }


      setVerificationStatus('success');
      // Redirect to signin after 3 seconds
      setTimeout(() => {
        router.push('/signin');
      }, 3000);
    } catch (err) {
      setVerificationStatus('error');
      setError(err instanceof Error ? err.message : 'Verification failed');
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Email Verification
          </h2>
        </div>
       
        <div className="bg-white p-8 rounded shadow-md">
          {verificationStatus === 'idle' && (
            <p className="text-center text-gray-600">Checking verification token...</p>
          )}
         
          {verificationStatus === 'verifying' && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Verifying your email...</p>
            </div>
          )}
         
          {verificationStatus === 'success' && (
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Email Verified!</h3>
              <p className="mt-1 text-sm text-gray-600">
                Your email has been successfully verified. You'll be redirected to the sign in page shortly.
              </p>
              <div className="mt-4">
                <Link href="/signin" className="text-indigo-600 hover:text-indigo-500 text-sm font-medium">
                  Go to sign in now
                </Link>
              </div>
            </div>
          )}
         
          {verificationStatus === 'error' && (
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Verification Failed</h3>
              <p className="mt-1 text-sm text-gray-600">{error}</p>
              <div className="mt-4">
                <Link href="/signup" className="text-indigo-600 hover:text-indigo-500 text-sm font-medium">
                  Try signing up again
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

