'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import HelpButton from '@/components/HelpButton';
import { useSession } from 'next-auth/react';

export default function MeasurementsPage() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login');
    },
  });

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

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Fetch existing measurements when component mounts
  useEffect(() => {
    if (status === 'authenticated') {
      fetchMeasurements();
    }
  }, [status]);

  const fetchMeasurements = async () => {
    try {
      const response = await fetch('/api/user/measurements');
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.measurements) {
          setMeasurements(data.measurements);
        }
      }
    } catch (error) {
      console.error('Error fetching measurements:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMeasurements(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await fetch('/api/user/measurements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(measurements),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ 
          text: 'Measurements saved successfully!', 
          type: 'success' 
        });
        
        // Redirect to account page after successful save
        setTimeout(() => {
          router.push('/account');
        }, 1500);
      } else {
        setMessage({ 
          text: data.error || 'Failed to save measurements', 
          type: 'error' 
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ 
        text: 'An error occurred. Please try again.', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white py-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-[#08106C] mb-6 text-center">Measurement Details</h1>
          <p className="text-center mb-8">Please enter your details accurately in inches or centimeters</p>

          {message.text && (
            <div className={`mb-4 p-3 rounded-md ${
              message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="chest" className="block text-sm font-medium text-gray-700 mb-1">
                  Chest Circumference:
                </label>
                <input
                  type="text"
                  id="chest"
                  name="chest"
                  value={measurements.chest}
                  onChange={handleInputChange}
                  placeholder="e.g., 40 inches"
                  className="w-full border border-gray-300 rounded-full px-4 py-2"
                />
              </div>

              <div>
                <label htmlFor="neck" className="block text-sm font-medium text-gray-700 mb-1">
                  Neck Circumference:
                </label>
                <input
                  type="text"
                  id="neck"
                  name="neck"
                  value={measurements.neck}
                  onChange={handleInputChange}
                  placeholder="e.g., 16 inches"
                  className="w-full border border-gray-300 rounded-full px-4 py-2"
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
                  onChange={handleInputChange}
                  placeholder="e.g., 32 inches"
                  className="w-full border border-gray-300 rounded-full px-4 py-2"
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
                  onChange={handleInputChange}
                  placeholder="e.g., 18 inches"
                  className="w-full border border-gray-300 rounded-full px-4 py-2"
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
                  onChange={handleInputChange}
                  placeholder="e.g., 34 inches"
                  className="w-full border border-gray-300 rounded-full px-4 py-2"
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
                  onChange={handleInputChange}
                  placeholder="e.g., 25 inches"
                  className="w-full border border-gray-300 rounded-full px-4 py-2"
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
                  onChange={handleInputChange}
                  placeholder="e.g., 40 inches"
                  className="w-full border border-gray-300 rounded-full px-4 py-2"
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
                  onChange={handleInputChange}
                  placeholder="e.g., 34 inches"
                  className="w-full border border-gray-300 rounded-full px-4 py-2"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#08106C] text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 min-w-[200px]"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Save and Submit'
                )}
              </button>
            </div>
          </form>

          <p className="text-center mt-6 text-gray-600">
            All measurements should be taken while standing straight in a relaxed position
          </p>
        </div>
      </div>
      <HelpButton />
    </>
  );
}