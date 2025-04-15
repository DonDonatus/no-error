// app/account/page.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Link from 'next/link';
import HelpButton from '@/components/HelpButton';

export default function AccountPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  // Actual user state that will be displayed
  const [user, setUser] = useState({
    name: 'EBO BINEY',
    email: 'ebobiney@gmail.com',
    password: '****************',
    phone: '+233 247 124 437',
    profilePic: '/profile-pic.jpg' // Default profile pic
  });
  
  // Form state for tracking form input changes before submission
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    password: user.password,
    phone: user.phone
  });

  // State for measurements
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

  // Loading state for measurements
  const [loadingMeasurements, setLoadingMeasurements] = useState(true);

  // Fetch measurements when the component mounts
  useEffect(() => {
    const fetchMeasurements = async () => {
      try {
        setLoadingMeasurements(true);
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
      } finally {
        setLoadingMeasurements(false);
      }
    };
    
    fetchMeasurements();
  }, []);

  // Reset form data when user clicks outside the form
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        // Reset form data to match user data
        setFormData({
          name: user.name,
          email: user.email,
          password: user.password,
          phone: user.phone
        });
      }
    }

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [user]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  // Handle file selection for profile picture
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a URL for the selected image
      const imageUrl = URL.createObjectURL(file);
      setUser({...user, profilePic: imageUrl});
      
      // In a real app, you would upload the image to your server here
      // uploadImageToServer(file).then(serverUrl => {
      //   setUser({...user, profilePic: serverUrl});
      // });
    }
  };

  // Trigger file input click when button is clicked
  const handleChangeProfilePic = () => {
    fileInputRef.current?.click();
  };

  const handleUpdateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update the actual user state with form data
    setUser({
      ...user,
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone
    });
    
    // Handle account update logic here
    console.log('Account updated:', formData);
    // In a real app, you would send this data to your API
  };

  // Function to display readable measurement labels
  const getMeasurementLabel = (key: string): string => {
    const labels: Record<string, string> = {
      chest: 'Chest Circumference',
      neck: 'Neck Circumference',
      trouserLength: 'Trouser Length',
      shoulderWidth: 'Shoulder Width',
      trouserWaist: 'Trouser Waist',
      armLength: 'Arm Length',
      hipCircumference: 'Hip Circumference',
      sleeveLength: 'Sleeve Length'
    };
    
    return labels[key] || key;
  };

  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-white py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 justify-between">
            {/* Account Details Section */}
            <div className="w-full md:w-5/12 bg-white rounded-lg">
              <h1 className="text-2xl font-bold text-[#08106C] mb-6 text-center">Account Details</h1>
              
              {/* Profile Picture Section */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-2 relative group">
                  <img 
                    src={user.profilePic} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://via.placeholder.com/150";
                    }}
                  />
                  <div 
                    className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={handleChangeProfilePic}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-2xl font-normal text-[#08106C] mb-2">{user.name}</h2>
                <button 
                  onClick={handleChangeProfilePic}
                  className="border h-7 border-gray-300 bg-white font-medium px-2 py-2-2 rounded-full text-sm hover:bg-gray-100"
                >
                  Change Profile pic
                </button>
                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {/* Account Form */}
              <form ref={formRef} onSubmit={handleUpdateAccount} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-850 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-full px-4 py-2"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-850 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-full px-4 py-2"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-850 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-full px-4 py-2"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-850 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-full px-4 py-2"
                  />
                </div>

                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    className="bg-[#08106C] text-white font-semibold px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full md:w-auto"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>

            {/* Measurement Details Section */}
            <div className="w-full md:w-5/12 bg-white rounded-lg border-gray-100 shadow-sm p-6 flex flex-col">
              <h1 className="text-2xl font-bold text-[#08106C] mb-6 text-center">Measurement Details</h1>
              
              {loadingMeasurements ? (
                <div className="flex-grow flex items-center justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#08106C]"></div>
                </div>
              ) : Object.keys(measurements).length === 0 ? (
                <div className="flex-grow flex items-center justify-center flex-col">
                  <p className="text-gray-500 mb-4">No measurements found</p>
                  <Link href="/measurements">
                    <button
                      type="button"
                      className="bg-[#08106C] text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-900 focus:outline-none"
                    >
                      Add Measurements
                    </button>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4 flex-grow">
                    {Object.entries(measurements).map(([key, value]) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-850 mb-1">
                          {getMeasurementLabel(key)}
                        </label>
                        <div className="w-full border border-gray-300 rounded-full px-4 py-2 bg-gray-50">
                          {value || 'Not set'}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-center pt-4 mt-6">
                    <Link href="/measurements">
                      <button
                        type="button"
                        className="bg-[#08106C] text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Change Measurements
                      </button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <HelpButton />
    </>
  );
}