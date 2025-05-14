// src/components/MeasurementForm.tsx
'use client';

import { useState } from 'react';
import { BodyMeasurements, MeasurementError } from '../types/measurement';

export default function MeasurementForm() {
  const [image, setImage] = useState<File | null>(null);
  const [results, setResults] = useState<BodyMeasurements | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTakePhoto = async () => {
    if (!image) return;
    
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('image', image);
      
      const response = await fetch('/api/measure', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.log("Oops! Robot didn't work!", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2>📏 Take Your Photo</h2>
      
      <input 
        type="file" 
        onChange={(e) => setImage(e.target.files?.[0] || null)} 
        accept="image/*"
      />
      
      <button 
        onClick={handleTakePhoto}
        disabled={isLoading}
        className="bg-blue-500 text-white p-2 rounded"
      >
        {isLoading ? "Measuring..." : "Get Sizes"}
      </button>
      
      {results && (
        <div className="mt-4">
          <h3>Your Perfect Fit:</h3>
          <ul>
            {Object.entries(results).map(([key, value]) => (
              <li key={key}>{key}: {value} cm</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}