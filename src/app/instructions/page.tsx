"use client";
import { useRouter } from 'next/navigation';
import Head from 'next/head';

const Instructions: React.FC = () => {
  const router = useRouter();
  
  const handleProceed = (): void => {
    // Navigate to the measurement capture page
    router.push('/capture');
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-white p-4 max-w-md mx-auto">
      <Head>
        <title>Measurement Instructions</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      <div className="w-full text-center mb-6">
        <div className="w-16 h-16 mx-auto mb-2">
          <svg viewBox="0 0 100 100" className="w-full h-full text-indigo-800">
            <path fill="currentColor" d="M20,20 L45,20 L45,45 L20,45 Z M55,20 L80,20 L80,45 L55,45 Z M20,55 L45,55 L45,80 L20,80 Z" />
            <path fill="currentColor" d="M55,55 L65,55 L65,65 L55,65 Z M65,65 L75,65 L75,75 L65,75 Z M55,75 L65,75 L65,85 L55,85 Z M75,55 L85,55 L85,65 L75,65 Z" />
          </svg>
        </div>
        <h1 className="text-indigo-800 text-xl font-bold">Instructions:</h1>
      </div>

      <div className="w-full">
        <ol className="list-decimal pl-8 space-y-4 text-gray-800">
          <li className="text-base">
            Ensure your camera is clean
          </li>
          <li className="text-base">
            Wear tight fitting clothes
          </li>
          <li className="text-base">
            Use a reference object<br />
            i.e an A4 or credit card
          </li>
          <li className="text-base">
            Take photos of side,<br />
            front and back view
          </li>
          <li className="text-base">
            Ensure effective lighting<br />
            in background
          </li>
        </ol>
      </div>

      <div className="w-full mt-8">
        <button 
          onClick={handleProceed}
          className="w-full py-3 bg-indigo-900 text-white rounded-md font-medium text-lg"
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default Instructions;