// src/components/InteractiveSuitPreview.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SuitPreviewProps {
  material: string;
  color: string;
  button: string;
  lapel: string;
  pocket: string;
  colorMap: Record<string, string>;
  viewAngle: number;
  zoomLevel: number;
}

const InteractiveSuitPreview: React.FC<SuitPreviewProps> = ({
  material,
  color,
  button,
  lapel,
  pocket,
  colorMap,
  viewAngle,
  zoomLevel
}) => {
  // This state will track when assets are loaded
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate asset loading
    const timer = setTimeout(() => setAssetsLoaded(true), 800);
    return () => clearTimeout(timer);
  }, [material, color]);

  return (
    <div 
      className="w-full h-full relative"
      style={{ 
        transformStyle: 'preserve-3d',
        transform: `rotateY(${viewAngle}deg) scale(${zoomLevel})`,
      }}
    >
      {/* Loading indicator */}
      {!assetsLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Base suit */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${assetsLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Base suit layer - changes with color */}
        <div className={`absolute inset-0 rounded-lg ${colorMap[color]}`}>
          <svg viewBox="0 0 300 500" className="w-full h-full">
            {/* Base suit shape */}
            <path 
              d="M150,50 C180,50 210,70 220,110 L230,180 L240,320 L220,460 L180,480 L150,490 L120,480 L80,460 L60,320 L70,180 L80,110 C90,70 120,50 150,50 Z" 
              fill="currentColor" 
              className="drop-shadow-lg"
            />
            
            {/* Collar/Neck area */}
            <path 
              d="M150,50 C160,60 170,70 175,90 L150,120 L125,90 C130,70 140,60 150,50 Z" 
              fill="#fff" 
              className="opacity-70"
            />
          </svg>
        </div>
        
        {/* Texture overlay */}
        <div className={`absolute inset-0 ${
          material === 'wool' ? 'bg-gradient-to-br from-gray-300/20 to-gray-400/20' :
          material === 'cashmere' ? 'bg-gradient-to-br from-gray-200/20 to-gray-300/20' : 
          'bg-gradient-to-br from-gray-100/20 to-gray-200/20'
        } rounded-lg`}></div>
        
        {/* Lapel overlay - changes with lapel style */}
        <div className="absolute inset-0">
          <svg viewBox="0 0 300 500" className="w-full h-full">
            {lapel === 'notch' && (
              <>
                <path 
                  d="M150,120 L130,90 L110,150 L130,210 Z" 
                  fill="#000" 
                  className="opacity-20"
                />
                <path 
                  d="M150,120 L170,90 L190,150 L170,210 Z" 
                  fill="#000" 
                  className="opacity-20"
                />
              </>
            )}
            {lapel === 'peak' && (
              <>
                <path 
                  d="M150,120 L130,90 L90,130 L130,210 Z" 
                  fill="#000" 
                  className="opacity-20"
                />
                <path 
                  d="M150,120 L170,90 L210,130 L170,210 Z" 
                  fill="#000" 
                  className="opacity-20"
                />
              </>
            )}
            {lapel === 'shawl' && (
              <path 
                d="M150,120 C120,140 110,170 120,210 C140,185 160,185 180,210 C190,170 180,140 150,120 Z" 
                fill="#000" 
                className="opacity-20"
              />
            )}
          </svg>
        </div>
        
        {/* Buttons overlay - changes with button style */}
        <div className="absolute inset-0">
          <svg viewBox="0 0 300 500" className="w-full h-full">
            {button === 'single' && (
              <circle cx="150" cy="230" r="6" fill="#222" />
            )}
            {button === 'double' && (
              <>
                <circle cx="140" cy="210" r="5" fill="#222" />
                <circle cx="160" cy="210" r="5" fill="#222" />
                <circle cx="140" cy="240" r="5" fill="#222" />
                <circle cx="160" cy="240" r="5" fill="#222" />
              </>
            )}
            {button === 'threeButton' && (
              <>
                <circle cx="150" cy="200" r="5" fill="#222" />
                <circle cx="150" cy="230" r="5" fill="#222" />
                <circle cx="150" cy="260" r="5" fill="#222" />
              </>
            )}
          </svg>
        </div>
        
        {/* Pockets overlay - changes with pocket style */}
        <div className="absolute inset-0">
          <svg viewBox="0 0 300 500" className="w-full h-full">
            {pocket === 'flap' && (
              <>
                <path d="M110,320 H70 V340 H110 Z" fill="#000" className="opacity-20" />
                <path d="M230,320 H190 V340 H230 Z" fill="#000" className="opacity-20" />
                <path d="M170,280 H130 V300 H170 Z" fill="#000" className="opacity-20" />
              </>
            )}
            {pocket === 'patch' && (
              <>
                <rect x="70" y="320" width="40" height="40" rx="2" fill="#000" className="opacity-20" />
                <rect x="190" y="320" width="40" height="40" rx="2" fill="#000" className="opacity-20" />
                <rect x="130" y="280" width="40" height="30" rx="2" fill="#000" className="opacity-20" />
              </>
            )}
            {pocket === 'jetted' && (
              <>
                <path d="M110,330 H70 V335 H110 Z" fill="#000" className="opacity-30" />
                <path d="M230,330 H190 V335 H230 Z" fill="#000" className="opacity-30" />
                <path d="M170,290 H130 V295 H170 Z" fill="#000" className="opacity-30" />
              </>
            )}
          </svg>
        </div>
        
        {/* Shadow effects for realism */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-black/10 rounded-lg"></div>
        
        {/* Highlight effects for realism */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 rounded-lg"></div>
      </div>
      
      {/* 3D rotation indicator */}
      <div className="absolute bottom-4 right-4 text-xs text-gray-500 bg-white/80 px-2 py-1 rounded-md">
        {Math.round(viewAngle)}°
      </div>
      
      {/* Measurement guide dots - subtle indicators showing key measurement points */}
      <div className="absolute inset-0 pointer-events-none">
        <svg viewBox="0 0 300 500" className="w-full h-full">
          <circle cx="90" cy="150" r="3" fill="#3B82F6" className="opacity-50" />
          <circle cx="210" cy="150" r="3" fill="#3B82F6" className="opacity-50" />
          <circle cx="150" cy="240" r="3" fill="#3B82F6" className="opacity-50" />
        </svg>
      </div>
    </div>
  );
};

export default InteractiveSuitPreview;