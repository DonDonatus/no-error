// app/measurements/page.tsx
"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import HelpButton from '@/components/HelpButton';

const MeasurementOptionsPage = () => {
  const router = useRouter();
  const [selected, setSelected] = React.useState<string | null>(null);
 
  const handleSelect = (option: string) => {
    setSelected(option);
  };
 
  const handleContinue = () => {
    if (selected === 'manual') {
      router.push('/mm');
    } else if (selected === 'ai') {
      router.push('/ai');
    }
  };
 
  return (
    <>
      <Header />
      <div className="bg-white min-h-screen py-10">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <h1 className="text-3xl font-bold text-center text-[#08106C] mb-10">
            Measurement Options
          </h1>
         
          {/* Options Container */}
          <div className="space-y-8">
            {/* Manual Option Card */}
            <div
              onClick={() => handleSelect('manual')}
              className={`border rounded-lg overflow-hidden cursor-pointer ${
                selected === 'manual' ? 'ring-2 ring-[#08106C]' : ''
              }`}
            >
              <div className="flex flex-col md:flex-row">
                <div className="p-8 md:w-1/2">
                  <h2 className="text-xl font-semibold">Upload Sizes Manually</h2>
                  <p className="mt-2 text-gray-600">
                    For users who have knowledge of their sizes, they can manually input their options
                  </p>
                </div>
               
                <div className="md:w-1/2 h-55 md:h-40 bg-gray-200 relative">
                  {/* Placeholder for image */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    <img src="/images/manual.png" alt="Manual measurement" className="h-full w-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
           
            {/* AI Option Card */}
            <div
              onClick={() => handleSelect('ai')}
              className={`border rounded-lg overflow-hidden cursor-pointer ${
                selected === 'ai' ? 'ring-2 ring-[#08106C]' : ''
              }`}
            >
              <div className="flex flex-col md:flex-row">
                <div className="p-8 md:w-1/2">
                  <h2 className="text-xl font-semibold">Measure with AI</h2>
                  <p className="mt-2 text-gray-600">
                    Using your mobile device to take pictures for the AI to precisely analyse and take measurements
                  </p>
                </div>
               
                <div className="md:w-1/2 h-55 md:h-40 bg-gray-200 relative">
                  {/* Placeholder for image */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    <img src="/images/AI.png" alt="AI measurement" className="h-full w-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
         
          {/* Continue Button */}
          {selected && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={handleContinue}
                className="bg-[#08106C] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#06095a] transition-colors"
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
      <HelpButton />
    </>
  );
};

export default MeasurementOptionsPage;