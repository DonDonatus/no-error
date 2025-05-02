'use client';


import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Link from 'next/link';
import HelpButton from '@/components/HelpButton';


export default function AccountPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const profilePicMenuRef = useRef<HTMLDivElement>(null);
 
  // User state
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    profilePic: ''
  });
 
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });


  // Loading states
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState('');


  // Profile picture menu state
  const [showProfilePicMenu, setShowProfilePicMenu] = useState(false);


  // Measurements state
  const [measurements, setMeasurements] = useState<Record<string, string>>({});
  const [loadingMeasurements, setLoadingMeasurements] = useState(true);


  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/user/profile');
       
        if (!response.ok) throw new Error('Failed to fetch user data');
       
        const data = await response.json();
       
        if (data.success && data.user) {
          setUser({
            name: data.user.name || '',
            email: data.user.email || '',
            password: '••••••••••••••••',
            phone: data.user.phone || '',
            profilePic: data.user.profilePic || ''
          });
         
          setFormData({
            name: data.user.name || '',
            email: data.user.email || '',
            password: '',
            phone: data.user.phone || ''
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
   
    fetchUserData();
  }, []);


  // Fetch measurements on mount
  useEffect(() => {
    const fetchMeasurements = async () => {
      try {
        setLoadingMeasurements(true);
        const response = await fetch('/api/user/measurements');
       
        if (!response.ok) throw new Error('Failed to fetch measurements');
       
        const data = await response.json();
       
        if (data.success && data.measurements) {
          const filteredMeasurements: Record<string, string> = {};
          Object.entries(data.measurements).forEach(([key, value]) => {
            if (value !== null && value !== '') {
              filteredMeasurements[key] = `${value} inches`;
            }
          });
          setMeasurements(filteredMeasurements);
        }
      } catch (error) {
        console.error('Error fetching measurements:', error);
      } finally {
        setLoadingMeasurements(false);
      }
    };
   
    fetchMeasurements();
  }, []);


  // Reset form data when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setFormData({
          name: user.name,
          email: user.email,
          password: user.password,
          phone: user.phone
        });
        setUpdateSuccess(false);
        setUpdateError('');
      }


      if (profilePicMenuRef.current && !profilePicMenuRef.current.contains(event.target as Node)) {
        setShowProfilePicMenu(false);
      }
    }


    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [user]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    setUpdateSuccess(false);
    setUpdateError('');
  };


  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
   
    try {
      setUpdating(true);
     
      const formData = new FormData();
      formData.append('profilePic', file);
     
      const response = await fetch('/api/user/upload-profile-pic', {
        method: 'POST',
        body: formData,
      });
     
      if (!response.ok) throw new Error('Failed to upload profile picture');
     
      const data = await response.json();
     
      if (data.success && data.profilePicUrl) {
        setUser(prev => ({ ...prev, profilePic: data.profilePicUrl }));
        setUpdateSuccess(true);
        setTimeout(() => setUpdateSuccess(false), 3000);
       
        // Trigger update in header without reload
        window.dispatchEvent(new CustomEvent('profilePicUpdated', {
          detail: { profilePic: data.profilePicUrl, username: user.name }
        }));
      } else {
        throw new Error(data.message || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      setUpdateError('Failed to upload profile picture');
      setTimeout(() => setUpdateError(''), 3000);
    } finally {
      setUpdating(false);
      setShowProfilePicMenu(false);
    }
  };


  const handleRemoveProfilePic = async () => {
    try {
      setUpdating(true);
      setUpdateError('');
     
      const response = await fetch('/api/user/remove-profile-pic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
 
      const data = await response.json();
     
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to remove profile picture');
      }
 
      setUser(prev => ({ ...prev, profilePic: '' }));
      setUpdateSuccess(true);
     
      window.dispatchEvent(new CustomEvent('profilePicUpdated', {
        detail: { profilePic: '', username: user.name }
      }));
 
    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : 'Failed to remove profile picture';
     
      setUpdateError(errorMessage);
    } finally {
      setUpdating(false);
      setShowProfilePicMenu(false);
    }
  };


  const handleProfilePicClick = () => {
    setShowProfilePicMenu(!showProfilePicMenu);
  };


  const handleUpdateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
   
    try {
      setUpdating(true);
     
      const dataToUpdate = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password || undefined
      };
     
      const response = await fetch('/api/user/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToUpdate)
      });
     
      if (!response.ok) throw new Error('Failed to update account');
     
      const data = await response.json();
     
      if (data.success) {
        setUser(prev => ({
          ...prev,
          name: formData.name,
          email: formData.email,
          password: '••••••••••••••••',
          phone: formData.phone
        }));
       
        setFormData(prev => ({
          ...prev,
          password: ''
        }));
       
        setUpdateSuccess(true);
        setTimeout(() => setUpdateSuccess(false), 3000);
       
        // Update username in header if changed
        if (formData.name !== user.name) {
          window.dispatchEvent(new CustomEvent('profilePicUpdated', {
            detail: { profilePic: user.profilePic, username: formData.name }
          }));
        }
      } else {
        throw new Error(data.message || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Error updating account:', error);
      setUpdateError('Failed to update account');
      setTimeout(() => setUpdateError(''), 3000);
    } finally {
      setUpdating(false);
    }
  };


  const getInitials = () => {
    if (!user.name) return '';
    const parts = user.name.split(' ');
    let initials = parts[0].charAt(0).toUpperCase();
    if (parts.length > 1) {
      initials += parts[parts.length - 1].charAt(0).toUpperCase();
    }
    return initials;
  };


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
             
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#08106C]"></div>
                </div>
              ) : (
                <>
                  {/* Updated Profile Picture Section */}
                  <div className="flex flex-col items-center mb-6 relative">
                    <div
                      className="w-32 h-32 rounded-full overflow-hidden mb-2 relative group cursor-pointer"
                      onClick={handleProfilePicClick}
                    >
                      {user.profilePic ? (
                        <img
                          src={user.profilePic}
                          alt="Profile"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/default-profile.svg";
                            setUser(prev => ({ ...prev, profilePic: '' }));
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-4xl font-semibold text-gray-600">
                          {getInitials()}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    </div>
                    <h2 className='text-2xl font-normal text-[#08106C] mb-2'>{user.name.toLocaleUpperCase()}</h2>
                    <button
                      onClick={handleProfilePicClick}
                      className="border h-7 border-gray-300 bg-white font-medium px-2 py-1 rounded-full text-sm hover:bg-gray-100"
                      disabled={updating}
                    >
                      {user.profilePic ? 'Change Profile Pic' : 'Add Profile Pic'}
                    </button>
                   
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                   
                    {showProfilePicMenu && (
                      <div
                        ref={profilePicMenuRef}
                        className="absolute top-40 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200"
                      >
                        <div className="py-1">
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {user.profilePic ? 'Change Photo' : 'Add Photo'}
                          </button>
                         
                          {user.profilePic && (
                            <button
                              onClick={handleRemoveProfilePic}
                              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                              Remove Photo
                            </button>
                          )}
                         
                        </div>
                      </div>
                     
                    )}
                   
                  </div>


                  {/* Account Form */}
                  <form ref={formRef} onSubmit={handleUpdateAccount} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-850 mb-1">
                        Username
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name.toUpperCase()}
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
                        placeholder="Enter new password to change"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {user.password && !formData.password ? "Leave blank to keep your current password" : ""}
                      </p>
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


                    {updateSuccess && (
                      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md">
                        Information updated successfully!
                      </div>
                    )}


                    {updateError && (
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md">
                        {updateError}
                      </div>
                    )}


                    <div className="flex justify-center pt-4">
                      <button
                        type="submit"
                        disabled={updating}
                        className="bg-[#08106C] text-white font-semibold px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full md:w-auto disabled:opacity-50"
                      >
                        {updating ? 'Updating...' : 'Update'}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>


            {/* Measurement Details Section */}
            <div className="w-full md:w-5/12 bg-white rounded-lg border border-gray-100 shadow-sm p-6 flex flex-col">
              <h1 className="text-2xl font-bold text-[#08106C] mb-6 text-center">Measurement Details</h1>
             
              {loadingMeasurements ? (
                <div className="flex-grow flex items-center justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#08106C]"></div>
                </div>
              ) : Object.keys(measurements).length === 0 ? (
                <div className="flex-grow flex flex-col items-center justify-center">
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
                <div className="flex flex-col h-full">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {Object.entries(measurements).map(([key, value]) => (
                      <div key={key} className="mb-4">
                        <label className="block text-sm font-medium text-850 mb-1">
                          {getMeasurementLabel(key)}
                        </label>
                        <div className="w-full border border-gray-300 rounded-full px-4 py-2 bg-gray-50">
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                 
                  <div className="mt-auto pt-4">
                    <div className="flex justify-center">
                      <Link href="/measurements">
                        <button
                          type="button"
                          className="bg-[#08106C] text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Change Measurements
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <HelpButton />
    </>
  );
}



