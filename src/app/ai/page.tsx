"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import HelpButton from '@/components/HelpButton';

const AIMeasurementsPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [sideImage, setSideImage] = useState<string | null>(null);
  const [measurements, setMeasurements] = useState<Record<string, string> | null>(null);

  // Handle image selection
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'front' | 'side') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'front') {
          setFrontImage(reader.result as string);
        } else {
          setSideImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Simulate AI processing
  const processImages = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock AI-generated measurements
      const mockMeasurements = {
        chest: '40 inches',
        neck: '16 inches',
        trouserLength: '32 inches',
        shoulderWidth: '18 inches',
        trouserWaist: '34 inches',
        armLength: '25 inches',
        hipCircumference: '40 inches',
        sleeveLength: '34 inches',
      };
      
      setMeasurements(mockMeasurements);
      setStep(3); // Move to review step
    } catch (error) {
      console.error('Error processing images:', error);
      alert('There was an error processing your images. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Save measurements to API and redirect to account page
  const saveMeasurements = async () => {
    if (!measurements) return;
    
    setIsUploading(true);
    
    try {
      // Save measurements to the API
      const response = await fetch('/api/user/measurements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(measurements)
      });
      
      if (!response.ok) {
        throw new Error('Failed to save measurements');
      }
      
      // Navigate to account page
      router.push('/account');
    } catch (error) {
      console.error('Error saving measurements:', error);
      alert('There was an error saving your measurements. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-white min-h-screen py-10">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-[#08106C] mb-6 text-center">
            AI Measurement System
          </h1>
          
          {/* Progress indicator */}
          <div className="mb-10">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-[#08106C] text-white' : 'bg-gray-200'}`}>
                  1
                </div>
                <span className="text-xs mt-1">Upload</span>
              </div>
              <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-[#08106C]' : 'bg-gray-200'}`}></div>
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-[#08106C] text-white' : 'bg-gray-200'}`}>
                  2
                </div>
                <span className="text-xs mt-1">Process</span>
              </div>
              <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-[#08106C]' : 'bg-gray-200'}`}></div>
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-[#08106C] text-white' : 'bg-gray-200'}`}>
                  3
                </div>
                <span className="text-xs mt-1">Review</span>
              </div>
            </div>
          </div>

          {/* Step 1: Upload Photos */}
          {step === 1 && (
            <div className="bg-gray-50 rounded-lg p-6 shadow">
              <h2 className="text-xl font-semibold mb-4 text-[#08106C]">Upload Your Photos</h2>
              <p className="text-gray-600 mb-6">
                Take and upload two photos of your body - one from the front and one from the side.
                For accurate measurements, please wear form-fitting clothing and stand straight.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Front image upload */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
                  {frontImage ? (
                    <div className="relative w-full">
                      <img 
                        src={frontImage} 
                        alt="Front view" 
                        className="w-full h-64 object-cover rounded" 
                      />
                      <button 
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                        onClick={() => setFrontImage(null)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <p className="text-center text-gray-500 mb-4">Front View</p>
                      <label className="bg-[#08106C] text-white px-4 py-2 rounded cursor-pointer hover:bg-[#06084d] transition">
                        Upload Front Photo
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => handleImageUpload(e, 'front')}
                        />
                      </label>
                    </>
                  )}
                </div>

                {/* Side image upload */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
                  {sideImage ? (
                    <div className="relative w-full">
                      <img 
                        src={sideImage} 
                        alt="Side view" 
                        className="w-full h-64 object-cover rounded" 
                      />
                      <button 
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                        onClick={() => setSideImage(null)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <p className="text-center text-gray-500 mb-4">Side View</p>
                      <label className="bg-[#08106C] text-white px-4 py-2 rounded cursor-pointer hover:bg-[#06084d] transition">
                        Upload Side Photo
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => handleImageUpload(e, 'side')} 
                        />
                      </label>
                    </>
                  )}
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button
                  className={`px-6 py-2 rounded ${frontImage && sideImage ? 'bg-[#08106C] text-white hover:bg-[#06084d]' : 'bg-gray-200 text-gray-500 cursor-not-allowed'} transition`}
                  disabled={!frontImage || !sideImage}
                  onClick={() => setStep(2)}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Process Photos */}
          {step === 2 && (
            <div className="bg-gray-50 rounded-lg p-6 shadow">
              <h2 className="text-xl font-semibold mb-4 text-[#08106C]">Process Your Photos</h2>
              <p className="text-gray-600 mb-6">
                Our AI will analyze your photos to calculate accurate body measurements.
                This process takes just a few seconds.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-200 p-2 text-center text-gray-700 font-medium">Front View</div>
                  <img src={frontImage!} alt="Front view" className="w-full h-64 object-cover" />
                </div>
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-200 p-2 text-center text-gray-700 font-medium">Side View</div>
                  <img src={sideImage!} alt="Side view" className="w-full h-64 object-cover" />
                </div>
              </div>

              {isProcessing ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-t-[#08106C] border-r-[#08106C] border-b-transparent border-l-transparent mb-4"></div>
                  <p className="text-gray-600">Processing your images...</p>
                </div>
              ) : (
                <div className="flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-2 rounded border border-gray-300 hover:bg-gray-100 transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={processImages}
                    className="px-6 py-2 rounded bg-[#08106C] text-white hover:bg-[#06084d] transition"
                  >
                    Process Images
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Review Measurements */}
          {step === 3 && measurements && (
            <div className="bg-gray-50 rounded-lg p-6 shadow">
              <h2 className="text-xl font-semibold mb-4 text-[#08106C]">Your Measurements</h2>
              <p className="text-gray-600 mb-6">
                Our AI has processed your photos and calculated your body measurements.
                Please review them below.
              </p>

              <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
                {Object.entries(measurements).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b pb-2">
                    <span className="text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      These measurements will be used to provide you with accurate size recommendations across our catalog.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2 rounded border border-gray-300 hover:bg-gray-100 transition"
                >
                  Back
                </button>
                <button
                  onClick={saveMeasurements}
                  disabled={isUploading}
                  className={`px-6 py-2 rounded ${isUploading ? 'bg-gray-400' : 'bg-[#08106C] hover:bg-[#06084d]'} text-white transition flex items-center`}
                >
                  {isUploading && (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {isUploading ? 'Saving...' : 'Save Measurements'}
                </button>
              </div>
            </div>
          )}

          {/* Help Button */}
          <div className="fixed bottom-8 right-8">
            <HelpButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default AIMeasurementsPage;