'use client';

import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { FiSearch } from 'react-icons/fi';
import Header from '@/components/Header'; // Assuming you have a Header component
import { IconBaseProps,IconType } from 'react-icons';
import { link } from 'fs';

interface IconWrapperProps extends IconBaseProps {
  icon: IconType;
}

const IconWrapper: React.FC<IconWrapperProps> = ({ icon, ...props }) => {
  // Use the as keyword to force TypeScript to accept this
  const Icon = icon as React.ComponentType<IconBaseProps>;
  return <Icon {...props} />;
};
export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Browse topics data with image paths
  const browseTopics = [
    { 
      title: 'Payments', 
      icon: '/icons/payment.svg',
      link: '#',
      width: 80,
      height: 80
    },
    { 
      title: 'Cancel order', 
      icon: '/icons/cancel.svg',
      link: '#',
      width: 80,
      height: 80
    },
    { 
      title: 'Taxes', 
      icon: '/icons/tax.svg',
      link: '#',
      width: 80,
      height: 80
    },
    { 
      title: 'Chat with Willow', 
      icon: '/icons/chat.svg',
      link: '/willow',
      width: 80,
      height: 80,
   
    }
  ];

  

  return (
    <div className="min-h-screen bg-gray-50">
      <Header /> {/* Assuming you have a Header component for the navbar */}
      {/* Your existing navbar would render here */}
      
      <Head>
        <title>Help Center</title>
        <meta name="description" content="Get help with our services" />
      </Head>



      {/* Blue header section */}
      <div className="w-full bg-[#08106C] text-white py-5">
   {/* Header row with icon and button */}
        <div className="w-full px-3 mt-5 ">
          <div className="relative flex justify-between items-center mb-8">
            {/* Support icon on the very far left */}
            <div className="absolute left-0 w-10 h-10"> 
              <img src='/icons/support.svg' alt="Support Icon" className="w-full h-full" />
            </div>
            
            {/* Submit button on the very far right */}
            <div className="absolute right-2">
              <button className="bg-[#08106C] text-white px-8 py-3 rounded-full hover:bg-white hover:text-[#08106C] border-2 border-white transition-colors font-medium">
                Submit request
              </button>
            </div>
          </div>
        </div>

    {/* Keep the existing centered content unchanged */}
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-6">How can we help you?</h1>
      
      {/* Search Bar */}
      <div className="relative w-full max-w-2xl">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-4 pl-12 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
        />
         <IconWrapper icon={FiSearch} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
        
      </div>
    </div>
  </div>

      {/* Content section */}
      <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Browse by Topic section with images */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-[#08106C]">Browse by topic</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            {browseTopics.map((topic, index) => (
              <a 
                key={index} 
                href={topic.link}
                className="group bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all text-center flex flex-col items-center"
              >
                <div className="relative w-120 h-100 mb-4 p-4 pt-10">
                  <Image 
                    src={topic.icon} 
                    alt={topic.title}
                    width={topic.width}
                    height={topic.height}
                    className="object-contain"
                  />
                </div>
                <span className="font-bold text-gray-800 group-hover:text-[#08106C] transition-colors">
                  {topic.title}
                </span>
              </a>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}