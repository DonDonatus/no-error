'use client';
import { useState, useRef } from 'react';
import { Camera } from 'lucide-react';


export default function CameraInterface() {
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);


  const handleProceed = () => {
    // Request camera access
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          setCameraActive(true);
          // The video stream is available in the 'stream' variable
          // Using the ref to access the video element
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error("Camera access denied or error: ", err);
          alert("Camera access denied. Please allow camera access to continue.");
        });
    } else {
      alert("Sorry, your browser doesn't support camera access.");
    }
  };


  return (
    <div className="flex flex-col items-center justify-center max-w-md mx-auto p-6 bg-white rounded shadow">
      <div className="mb-6 text-indigo-800">
        <Camera size={40} className="mx-auto mb-2" />
        <h1 className="text-2xl font-bold text-center">Instructions:</h1>
      </div>


      <ol className="list-decimal pl-6 mb-6 space-y-3 w-full">
        <li className="text-lg">Ensure your camera is clean</li>
        <li className="text-lg">Wear tight fitting clothes</li>
        <li className="text-lg">Use a reference object i.e an A4 or credit card</li>
        <li className="text-lg">Take photos of side, front and back view</li>
        <li className="text-lg">Ensure effective lighting in background</li>
      </ol>


      {cameraActive ? (
        <div className="w-full">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-64 bg-black rounded"
          ></video>
          <button
            onClick={() => setCameraActive(false)}
            className="w-full mt-4 py-3 bg-red-700 text-white font-bold rounded"
          >
            Close Camera
          </button>
        </div>
      ) : (
        <button
          onClick={handleProceed}
          className="w-full py-3 bg-indigo-900 text-white font-bold rounded"
        >
          Proceed
        </button>
      )}
    </div>
  );
}

