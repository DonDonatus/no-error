'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic'; // Disable static generation

function EmailVerifier() {
  const [status, setStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) verifyToken(token);
    else {
      setStatus('error');
      setError('Missing verification token.');
    }
  }, [searchParams]);

  const verifyToken = async (token: string) => {
    setStatus('verifying');
    try {
      const res = await fetch(`/api/auth/verify-email?token=${token}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Verification failed');

      setStatus('success');
      setTimeout(() => router.push('/signin?verified=true'), 3000);
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Verification failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded shadow-md p-8 space-y-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Email Verification</h2>

        {status === 'idle' && <p className="text-gray-600">Waiting to verify token...</p>}

        {status === 'verifying' && (
          <div>
            <div className="animate-spin h-12 w-12 border-b-2 border-indigo-600 rounded-full mx-auto mb-4" />
            <p className="text-gray-600">Verifying your email...</p>
          </div>
        )}

        {status === 'success' && (
          <div>
            <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Email Verified!</h3>
            <p className="text-sm text-gray-600 mt-1">
              You'll be redirected to sign in shortly.
            </p>
            <Link href="/signin" className="mt-4 inline-block text-indigo-600 hover:underline text-sm">
              Go to sign in now
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div>
            <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Verification Failed</h3>
            <p className="text-sm text-red-600 mt-1">{error}</p>
            <Link href="/signup" className="mt-4 inline-block text-indigo-600 hover:underline text-sm">
              Try signing up again
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailPageWrapper() {
  return (
    <Suspense fallback={<p className="text-center mt-12 text-gray-600">Loading...</p>}>
      <EmailVerifier />
    </Suspense>
  );
}



