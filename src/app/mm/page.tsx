// app/measurements/manual/page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import HelpButton from '@/components/HelpButton';

const ManualMeasurementsPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [measurements, setMeasurements] = useState({
    chest: '',
    neck: '',
    trouserLength: '',
    shoulderWidth: '',
    trouserWaist: '',
    armLength: '',
    hipCircumference: '',
    sleeveLength: '',
  });

  // Fetch existing measurements when the component loads
  useEffect(() => {
    const fetchMeasurements = async () => {
      try {
        const response = await fetch('/api/user/measurements');
        
        if (!response.ok) {
          throw new Error('Failed to fetch measurements');
        }
        
        const data = await response.json();
        
        if (data.success && data.measurements) {
          setMeasurements(data.measurements);
        }
      } catch (error) {
        console.error('Error fetching measurements:', error);
        // Don't set error state here to avoid showing an error on initial load
        // if the user hasn't set measurements yet
      }
    };
    
    fetchMeasurements();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMeasurements(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Send measurements to the API
      const response = await fetch('/api/user/measurements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(measurements)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save measurements');
      }
      
      // Navigate to the account page after successful submission
      router.push('/account');
    } catch (error) {
      console.error('Error updating measurements:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-white min-h-screen py-10">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-[#08106C] mb-6">
            Measurement Details
          </h1>
          
          <p className="text-gray-600 mb-6">
            Please enter your details accurately in inches or centimeters
          </p>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="border rounded-lg p-6 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="chest" className="block text-sm font-medium text-gray-700 mb-1">
                    Chest Circumference:
                  </label>
                  <input
                    type="text"
                    id="chest"
                    name="chest"
                    value={measurements.chest}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#08106C] focus:border-transparent"
                    placeholder="e.g., 40 inches"
                  />
                </div>
                
                <div>
                  <label htmlFor="trouserLength" className="block text-sm font-medium text-gray-700 mb-1">
                    Trouser Length:
                  </label>
                  <input
                    type="text"
                    id="trouserLength"
                    name="trouserLength"
                    value={measurements.trouserLength}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#08106C] focus:border-transparent"
                    placeholder="e.g., 32 inches"
                  />
                </div>
                
                <div>
                  <label htmlFor="trouserWaist" className="block text-sm font-medium text-gray-700 mb-1">
                    Trouser Waist:
                  </label>
                  <input
                    type="text"
                    id="trouserWaist"
                    name="trouserWaist"
                    value={measurements.trouserWaist}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#08106C] focus:border-transparent"
                    placeholder="e.g., 34 inches"
                  />
                </div>
                
                <div>
                  <label htmlFor="hipCircumference" className="block text-sm font-medium text-gray-700 mb-1">
                    Hip Circumference:
                  </label>
                  <input
                    type="text"
                    id="hipCircumference"
                    name="hipCircumference"
                    value={measurements.hipCircumference}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#08106C] focus:border-transparent"
                    placeholder="e.g., 40 inches"
                  />
                </div>
              </div>
              
              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="neck" className="block text-sm font-medium text-gray-700 mb-1">
                    Neck Circumference:
                  </label>
                  <input
                    type="text"
                    id="neck"
                    name="neck"
                    value={measurements.neck}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#08106C] focus:border-transparent"
                    placeholder="e.g., 16 inches"
                  />
                </div>
                
                <div>
                  <label htmlFor="shoulderWidth" className="block text-sm font-medium text-gray-700 mb-1">
                    Shoulder Width:
                  </label>
                  <input
                    type="text"
                    id="shoulderWidth"
                    name="shoulderWidth"
                    value={measurements.shoulderWidth}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#08106C] focus:border-transparent"
                    placeholder="e.g., 18 inches"
                  />
                </div>
                
                <div>
                  <label htmlFor="armLength" className="block text-sm font-medium text-gray-700 mb-1">
                    Arm Length:
                  </label>
                  <input
                    type="text"
                    id="armLength"
                    name="armLength"
                    value={measurements.armLength}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#08106C] focus:border-transparent"
                    placeholder="e.g., 25 inches"
                  />
                </div>
                
                <div>
                  <label htmlFor="sleeveLength" className="block text-sm font-medium text-gray-700 mb-1">
                    Sleeve Length:
                  </label>
                  <input
                    type="text"
                    id="sleeveLength"
                    name="sleeveLength"
                    value={measurements.sleeveLength}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#08106C] focus:border-transparent"
                    placeholder="e.g., 34 inches"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${
                  isSubmitting ? "bg-gray-400" : "bg-[#08106C] hover:bg-[#06095a]"
                } text-white px-8 py-3 rounded-full font-semibold transition-colors w-64 flex items-center justify-center`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  "Save and Submit"
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-4 text-center text-sm text-gray-500">
            All measurements should be taken while standing straight in a relaxed position
          </div>
        </div>
      </div>
      <HelpButton />
    </>
  );
};

export default ManualMeasurementsPage;