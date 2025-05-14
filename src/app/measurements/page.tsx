"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import HelpButton from '@/components/HelpButton';


type MeasurementOption = 'manual' | 'ai' | null;


const MeasurementOptionsPage = () => {
  const router = useRouter();
  const [selected, setSelected] = useState<MeasurementOption>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);
 
  // Handle window resize and component mounting
  useEffect(() => {
    setIsMounted(true);
    setWindowWidth(window.innerWidth);
   
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
   
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
 
  const handleSelect = (option: MeasurementOption) => {
    setSelected(option);
  };
 
  const handleContinue = () => {
    if (selected === 'manual') {
      router.push('/mm');
    } else if (selected === 'ai') {
      router.push('/ai');
    }
  };


  // Calculate image height based on screen size
  const getImageHeight = (): number => {
    if (windowWidth < 640) return 180; // Small mobile
    if (windowWidth < 768) return 200; // Mobile
    return 220; // Tablet and above
  };
 
  // Don't render content until component is mounted (prevents hydration issues)
  if (!isMounted) {
    return null;
  }
 
  return (
    <>
      <Header />
      <div className="bg-white min-h-screen py-6 sm:py-8 md:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#08106C] mb-6 sm:mb-8 md:mb-10">
            Measurement Options
          </h1>
         
          {/* Options Container */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            {/* Manual Option Card */}
            <div
              onClick={() => handleSelect('manual')}
              className={`border rounded-lg overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300 ${
                selected === 'manual' ? 'ring-2 ring-[#08106C]' : ''
              }`}
            >
              <div className="flex flex-col md:flex-row">
                <div className="p-4 sm:p-6 md:p-8 md:w-1/2 flex flex-col justify-center">
                  <h2 className="text-lg sm:text-xl font-semibold">Upload Sizes Manually</h2>
                  <p className="mt-2 text-gray-600 text-sm sm:text-base">
                    For users who have knowledge of their sizes, they can manually input their options
                  </p>
                </div>
               
                <div className="relative md:w-1/2 h-48 sm:h-52 md:h-56">
                  <div className="absolute inset-0">
                    <img
                      src="/images/manual.png"
                      alt="Manual measurement"
                      className="h-full w-full object-cover"
                      style={{ objectPosition: 'center' }}
                    />
                  </div>
                </div>
              </div>
            </div>
           
            {/* AI Option Card */}
            <div
              onClick={() => handleSelect('ai')}
              className={`border rounded-lg overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300 ${
                selected === 'ai' ? 'ring-2 ring-[#08106C]' : ''
              }`}
            >
              <div className="flex flex-col md:flex-row">
                <div className="p-4 sm:p-6 md:p-8 md:w-1/2 flex flex-col justify-center">
                  <h2 className="text-lg sm:text-xl font-semibold">Measure with AI</h2>
                  <p className="mt-2 text-gray-600 text-sm sm:text-base">
                    Using your mobile device to take pictures for the AI to precisely analyse and take measurements
                  </p>
                </div>
               
                <div className="relative md:w-1/2 h-48 sm:h-52 md:h-56">
                  <div className="absolute inset-0">
                    <img
                      src="/images/AI.png"
                      alt="AI measurement"
                      className="h-full w-full object-cover"
                      style={{ objectPosition: 'center' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
         
          {/* Continue Button */}
          <div className={`mt-6 sm:mt-8 md:mt-10 flex justify-center transition-opacity duration-300 ${selected ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <button
              onClick={handleContinue}
              className="bg-[#08106C] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-[#06095a] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#08106C]"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      <HelpButton />
    </>
  );
};


export default MeasurementOptionsPage;

