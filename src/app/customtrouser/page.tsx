// src/app/customtrouser/page.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Custom hook for animations
const useAnimation = () => {
  const [animationComplete, setAnimationComplete] = useState(true);
 
  useEffect(() => {
    setTimeout(() => setAnimationComplete(true), 1800);
  }, []);
 
  return animationComplete;
};

// Premium Trouser Materials
const materials = [
  {
    id: 'wool',
    name: 'Premium Wool',
    colors: ['charcoal', 'navy', 'black', 'stone'],
    texture: "bg-gradient-to-br from-gray-300 to-gray-400"
  },
  {
    id: 'cotton',
    name: 'Egyptian Cotton',
    colors: ['khaki', 'beige', 'navy', 'black'],
    texture: "bg-gradient-to-br from-gray-200 to-gray-300"
  },
  {
    id: 'linen',
    name: 'Summer Linen',
    colors: ['beige', 'white', 'navy', 'sage'],
    texture: "bg-gradient-to-br from-gray-100 to-gray-200"
  },
];

// Color mapping
const colorMap = {
  charcoal: "bg-gray-600",
  navy: "bg-blue-900",
  black: "bg-black",
  stone: "bg-stone-400",
  khaki: "bg-yellow-700",
  beige: "bg-amber-100",
  white: "bg-white border border-gray-200",
  sage: "bg-green-300",
};

// Pocket styles
const pocketTypes = [
  { id: 'slanted', name: 'Slanted Pockets', description: 'Modern angled entry' },
  { id: 'straight', name: 'Straight Pockets', description: 'Classic vertical style' },
  { id: 'coin', name: 'Coin Pocket', description: 'Small additional pocket' },
];

// Hem styles
const hemTypes = [
  { id: 'plain', name: 'Plain Hem', description: 'Clean finished edge' },
  { id: 'cuffed', name: 'Cuffed Hem', description: 'Turned-up stylish finish' },
  { id: 'tapered', name: 'Tapered Hem', description: 'Narrowed leg opening' },
];

// Pleat options
const pleatTypes = [
  { id: 'none', name: 'No Pleats', description: 'Smooth flat front' },
  { id: 'single', name: 'Single Pleat', description: 'One fold each side' },
  { id: 'double', name: 'Double Pleat', description: 'Two folds each side' },
];

// Adjuster types
const adjusterTypes = [
  { id: 'belt', name: 'Belt Loops', description: 'Standard belt support' },
  { id: 'side', name: 'Side Adjusters', description: 'Hidden waist adjustment' },
  { id: 'elastic', name: 'Elastic Back', description: 'Flexible comfort fit' },
];

// Lining options
const liningTypes = [
  { id: 'none', name: 'Unlined', description: 'Lightweight breathable' },
  { id: 'partial', name: 'Partial Lining', description: 'Knee-length coverage' },
  { id: 'full', name: 'Full Lining', description: 'Complete inner finish' },
];

// Icons
const FabricIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4h16v16H4z" strokeLinecap="round" />
    <path d="M4 12h16M12 4v16" strokeLinecap="round" />
    <path d="M4 4l16 16M20 4L4 20" strokeLinecap="round" strokeDasharray="0.5 2" />
  </svg>
);

const PocketIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 12h16a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2v-6a2 2 0 012-2z" />
    <path d="M8 10V8a2 2 0 012-2h4a2 2 0 012 2v2" />
  </svg>
);

const HemIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 22v-6M6 16l6-6 6 6" />
    <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z" />
  </svg>
);

const PleatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 12h18M3 6h18M3 18h18" />
    <path d="M12 3v18M9 6h6M9 18h6" strokeLinecap="round" />
  </svg>
);

const AdjusterIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 22v-4M8 18H4a2 2 0 01-2-2V8a2 2 0 012-2h4M16 18h4a2 2 0 002-2V8a2 2 0 00-2-2h-4" />
    <circle cx="12" cy="12" r="2" />
    <path d="M12 8v4M8 12h4" strokeLinecap="round" />
  </svg>
);

const LiningIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z" />
    <path d="M12 7v10M7 12h10" strokeLinecap="round" strokeDasharray="0.5 2" />
  </svg>
);

export default function TrouserConfigurator() {
  const router = useRouter();
  const animationComplete = useAnimation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<string>('fabric');
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0]);
  const [selectedColor, setSelectedColor] = useState(selectedMaterial.colors[0]);
  const [selectedPocket, setSelectedPocket] = useState(pocketTypes[0].id);
  const [selectedHem, setSelectedHem] = useState(hemTypes[0].id);
  const [selectedPleat, setSelectedPleat] = useState(pleatTypes[0].id);
  const [selectedAdjuster, setSelectedAdjuster] = useState(adjusterTypes[0].id);
  const [selectedLining, setSelectedLining] = useState(liningTypes[0].id);
  const [rotating, setRotating] = useState(false);
  const [viewAngle, setViewAngle] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    fabric: false,
    pockets: false,
    hem: false,
    pleats: false,
    adjusters: false,
    lining: false
  });
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle responsive layout
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
   
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Handle 3D rotation
  useEffect(() => {
    if (rotating) {
      let frame: number;
      const rotate = () => {
        setViewAngle(prev => (prev + 0.5) % 360);
        frame = requestAnimationFrame(rotate);
      };
      frame = requestAnimationFrame(rotate);
      return () => cancelAnimationFrame(frame);
    }
  }, [rotating]);

  const customizationOptions = [
    { id: 'fabric', name: 'Fabric', icon: <FabricIcon />, subtitle: 'Premium material selection' },
    { id: 'pockets', name: 'Pockets', icon: <PocketIcon />, subtitle: 'Style and placement' },
    { id: 'hem', name: 'Hem', icon: <HemIcon />, subtitle: 'Bottom finish style' },
    { id: 'pleats', name: 'Pleats', icon: <PleatIcon />, subtitle: 'Front styling' },
    { id: 'adjusters', name: 'Adjusters', icon: <AdjusterIcon />, subtitle: 'Waist customization' },
    { id: 'lining', name: 'Lining', icon: <LiningIcon />, subtitle: 'Interior finish' },
  ];

  const handleAddToCart = () => {
    setShowTooltip(true);
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }
    tooltipTimeoutRef.current = setTimeout(() => {
      setShowTooltip(false);
    }, 3000);
  };

  const handleExit = () => {
    router.back();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleTabChange = (id: string) => {
    setCurrentTab(id);
    setIsMenuOpen(false);
    setExpandedSections(prev => ({ ...prev, [id]: true }));
  };

  const toggleSection = (id: string) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleMaterialChange = (material: typeof materials[0]) => {
    setSelectedMaterial(material);
    setSelectedColor(material.colors[0]);
  };

  const calculatePrice = () => {
    let basePrice = selectedMaterial.id === 'wool' ? 299 : selectedMaterial.id === 'cotton' ? 249 : 199;
    if (selectedPleat === 'double') basePrice += 30;
    if (selectedLining === 'full') basePrice += 50;
    return basePrice;
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-gray-900">
      {/* Intro animation overlay */}
      <AnimatePresence>
        {!animationComplete && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="fixed inset-0 bg-blue-900 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center text-white"
            >
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-light tracking-wider mb-2"
              >
                UOMO MIGLIORE
              </motion.h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="h-px bg-white/30 max-w-xs mx-auto mb-2"
              />
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-xl font-medium"
              >
                Tailor Your Perfect Trousers
              </motion.h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <button
            onClick={handleExit}
            className="text-gray-800 hover:text-blue-700 transition-colors duration-200 flex items-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-lg font-medium">Exit</span>
          </button>
         
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
            <div className="flex items-center gap-0">
              <h1 className="">
                <img src="/icons/logo.svg" className='size-12'/>
              </h1>
            </div>
          </div>
         
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round"/>
              </svg>
            </button>
           
            <div className="w-10 h-10 bg-blue-900 rounded-full overflow-hidden shadow-md ring-2 ring-blue-100 flex items-center justify-center text-white">
              <span className="text-sm font-medium">AC</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && !isDesktop && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-y-0 left-0 w-64 bg-white z-40 shadow-xl"
          >
            <div className="p-5">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium text-gray-900">Menu</h2>
                <button
                  onClick={toggleMenu}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
             
              <div className="space-y-2">
                {customizationOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleTabChange(option.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      currentTab === option.id
                      ? 'bg-blue-50 text-blue-900'
                      : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 mr-3 ${
                        currentTab === option.id ? 'text-blue-700' : 'text-gray-500'
                      }`}>
                        {option.icon}
                      </div>
                      <span>{option.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className={`flex flex-1 ${isDesktop ? 'flex-row' : 'flex-col'}`}>
        {/* Left sidebar - desktop version */}
        {isDesktop && (
          <div className="w-80 bg-white p-5 shadow-sm z-20 overflow-auto h-[calc(100vh-64px)] sticky top-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-4 px-6 mb-6 rounded-xl shadow-md"
            >
              <h2 className="text-xl font-semibold text-center">Customize Your Trousers</h2>
            </motion.div>
           
            <nav className="mb-6">
              <ul className="space-y-2">
                {customizationOptions.map((option, index) => (
                  <motion.li
                    key={option.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { delay: index * 0.1 + 0.2 }
                    }}
                    className="w-full"
                  >
                    <div className="border-b border-gray-100 pb-2">
                      <button
                        onClick={() => toggleSection(option.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                          currentTab === option.id
                          ? 'bg-blue-50'
                          : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 ${
                            currentTab === option.id ? 'text-blue-700' : 'text-gray-500'
                          }`}>
                            {option.icon}
                          </div>
                          <div className="text-left">
                            <span className={`block ${
                              currentTab === option.id ? 'font-medium text-blue-900' : 'text-gray-800'
                            }`}>
                              {option.name}
                            </span>
                            <span className="text-xs text-gray-500">{option.subtitle}</span>
                          </div>
                        </div>
                        <svg
                          className={`w-5 h-5 transition-transform ${expandedSections[option.id] ? 'rotate-180' : ''}`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>

                      <AnimatePresence>
                        {expandedSections[option.id] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-9 pr-3 py-2">
                              {option.id === 'fabric' && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-1 gap-3">
                                    {materials.map((material) => (
                                      <button
                                        key={material.id}
                                        onClick={() => handleMaterialChange(material)}
                                        className={`p-3 rounded-lg border ${
                                          selectedMaterial.id === material.id
                                          ? 'border-blue-600 ring-1 ring-blue-200'
                                          : 'border-gray-200 hover:border-gray-300'
                                        } transition-all text-left`}
                                      >
                                        <div className={`h-10 w-full rounded-md mb-2 ${material.texture}`}></div>
                                        <h4 className="font-medium text-gray-900">{material.name}</h4>
                                        <p className="text-xs text-gray-500">
                                          {material.id === 'wool' ? 'Versatile, durable' :
                                           material.id === 'cotton' ? 'Breathable, crisp' :
                                           'Lightweight, airy'}
                                        </p>
                                      </button>
                                    ))}
                                  </div>
                                 
                                  <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Color</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {selectedMaterial.colors.map((color) => (
                                        <button
                                          key={color}
                                          onClick={() => setSelectedColor(color)}
                                          className={`w-8 h-8 rounded-full ${colorMap[color as keyof typeof colorMap]} ${
                                            selectedColor === color
                                            ? 'ring-2 ring-blue-500 ring-offset-2'
                                            : 'hover:ring-1 hover:ring-gray-300 hover:ring-offset-1'
                                          } transition-all`}
                                          aria-label={`Select ${color}`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}
                             
                              {option.id === 'pockets' && (
                                <div className="space-y-3">
                                  {pocketTypes.map((type) => (
                                    <button
                                      key={type.id}
                                      onClick={() => setSelectedPocket(type.id)}
                                      className={`w-full p-3 rounded-lg border ${
                                        selectedPocket === type.id
                                        ? 'border-blue-600 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                      } transition-all text-left`}
                                    >
                                      <h4 className="font-medium text-gray-900">{type.name}</h4>
                                      <p className="text-xs text-gray-500">{type.description}</p>
                                    </button>
                                  ))}
                                </div>
                              )}
                             
                              {option.id === 'hem' && (
                                <div className="space-y-3">
                                  {hemTypes.map((type) => (
                                    <button
                                      key={type.id}
                                      onClick={() => setSelectedHem(type.id)}
                                      className={`w-full p-3 rounded-lg border ${
                                        selectedHem === type.id
                                        ? 'border-blue-600 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                      } transition-all text-left`}
                                    >
                                      <h4 className="font-medium text-gray-900">{type.name}</h4>
                                      <p className="text-xs text-gray-500">{type.description}</p>
                                    </button>
                                  ))}
                                </div>
                              )}
                             
                              {option.id === 'pleats' && (
                                <div className="space-y-3">
                                  {pleatTypes.map((type) => (
                                    <button
                                      key={type.id}
                                      onClick={() => setSelectedPleat(type.id)}
                                      className={`w-full p-3 rounded-lg border ${
                                        selectedPleat === type.id
                                        ? 'border-blue-600 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                      } transition-all text-left`}
                                    >
                                      <h4 className="font-medium text-gray-900">{type.name}</h4>
                                      <p className="text-xs text-gray-500">{type.description}</p>
                                    </button>
                                  ))}
                                </div>
                              )}
                             
                              {option.id === 'adjusters' && (
                                <div className="space-y-3">
                                  {adjusterTypes.map((type) => (
                                    <button
                                      key={type.id}
                                      onClick={() => setSelectedAdjuster(type.id)}
                                      className={`w-full p-3 rounded-lg border ${
                                        selectedAdjuster === type.id
                                        ? 'border-blue-600 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                      } transition-all text-left`}
                                    >
                                      <h4 className="font-medium text-gray-900">{type.name}</h4>
                                      <p className="text-xs text-gray-500">{type.description}</p>
                                    </button>
                                  ))}
                                </div>
                              )}
                             
                              {option.id === 'lining' && (
                                <div className="space-y-3">
                                  {liningTypes.map((type) => (
                                    <button
                                      key={type.id}
                                      onClick={() => setSelectedLining(type.id)}
                                      className={`w-full p-3 rounded-lg border ${
                                        selectedLining === type.id
                                        ? 'border-blue-600 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                      } transition-all text-left`}
                                    >
                                      <h4 className="font-medium text-gray-900">{type.name}</h4>
                                      <p className="text-xs text-gray-500">{type.description}</p>
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </nav>
           
            {/* Order summary */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-auto pt-4 border-t border-gray-100"
            >
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-gray-700 font-medium mb-2">Order Summary</h3>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Base Price</span>
                  <span>${calculatePrice()}</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Customization</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="h-px bg-gray-200 my-2"></div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${calculatePrice()}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
       
        {/* Right content - trouser preview */}
        <div className="flex-1 flex flex-col">
          {/* Options area - mobile */}
          {!isDesktop && (
            <div className="bg-white border-b border-gray-100 p-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    onClick={() => toggleSection(currentTab)}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-4"
                  >
                    <h3 className="text-lg font-medium text-gray-900">
                      {customizationOptions.find(o => o.id === currentTab)?.name}
                    </h3>
                    <svg
                      className={`w-5 h-5 transition-transform ${expandedSections[currentTab] ? 'rotate-180' : ''}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {expandedSections[currentTab] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      {currentTab === 'fabric' && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {materials.map((material) => (
                              <button
                                key={material.id}
                                onClick={() => handleMaterialChange(material)}
                                className={`p-3 rounded-lg border ${
                                  selectedMaterial.id === material.id
                                  ? 'border-blue-600 ring-1 ring-blue-200'
                                  : 'border-gray-200 hover:border-gray-300'
                                } transition-all`}
                              >
                                <div className={`h-10 w-full rounded-md mb-2 ${material.texture}`}></div>
                                <div className="text-left">
                                  <h4 className="font-medium text-gray-900">{material.name}</h4>
                                  <p className="text-xs text-gray-500">
                                    {material.id === 'wool' ? 'Versatile, durable' :
                                     material.id === 'cotton' ? 'Breathable, crisp' :
                                     'Lightweight, airy'}
                                  </p>
                                </div>
                              </button>
                            ))}
                          </div>
                         
                          <div>
                            <h4 className="font-medium text-gray-900 mb-3">Select Color</h4>
                            <div className="flex flex-wrap gap-3">
                              {selectedMaterial.colors.map((color) => (
                                <button
                                  key={color}
                                  onClick={() => setSelectedColor(color)}
                                  className={`w-10 h-10 rounded-full ${colorMap[color as keyof typeof colorMap]} ${
                                    selectedColor === color
                                    ? 'ring-2 ring-blue-500 ring-offset-2'
                                    : 'hover:ring-1 hover:ring-gray-300 hover:ring-offset-1'
                                  } transition-all`}
                                  aria-label={`Select ${color}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                     
                      {currentTab === 'pockets' && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {pocketTypes.map((type) => (
                            <button
                              key={type.id}
                              onClick={() => setSelectedPocket(type.id)}
                              className={`p-3 rounded-lg border ${
                                selectedPocket === type.id
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                              } transition-all`}
                            >
                              <h4 className="font-medium text-gray-900">{type.name}</h4>
                              <p className="text-xs text-gray-500">{type.description}</p>
                            </button>
                          ))}
                        </div>
                      )}
                     
                      {currentTab === 'hem' && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {hemTypes.map((type) => (
                            <button
                              key={type.id}
                              onClick={() => setSelectedHem(type.id)}
                              className={`p-3 rounded-lg border ${
                                selectedHem === type.id
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                              } transition-all`}
                            >
                              <h4 className="font-medium text-gray-900">{type.name}</h4>
                              <p className="text-xs text-gray-500">{type.description}</p>
                            </button>
                          ))}
                        </div>
                      )}
                     
                      {currentTab === 'pleats' && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {pleatTypes.map((type) => (
                            <button
                              key={type.id}
                              onClick={() => setSelectedPleat(type.id)}
                              className={`p-3 rounded-lg border ${
                                selectedPleat === type.id
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                              } transition-all`}
                            >
                              <h4 className="font-medium text-gray-900">{type.name}</h4>
                              <p className="text-xs text-gray-500">{type.description}</p>
                            </button>
                          ))}
                        </div>
                      )}
                     
                      {currentTab === 'adjusters' && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {adjusterTypes.map((type) => (
                            <button
                              key={type.id}
                              onClick={() => setSelectedAdjuster(type.id)}
                              className={`p-3 rounded-lg border ${
                                selectedAdjuster === type.id
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                              } transition-all`}
                            >
                              <h4 className="font-medium text-gray-900">{type.name}</h4>
                              <p className="text-xs text-gray-500">{type.description}</p>
                            </button>
                          ))}
                        </div>
                      )}
                     
                      {currentTab === 'lining' && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {liningTypes.map((type) => (
                            <button
                              key={type.id}
                              onClick={() => setSelectedLining(type.id)}
                              className={`p-3 rounded-lg border ${
                                selectedLining === type.id
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                              } transition-all`}
                            >
                              <h4 className="font-medium text-gray-900">{type.name}</h4>
                              <p className="text-xs text-gray-500">{type.description}</p>
                            </button>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          )}
         
          {/* Preview area */}
          <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateY(${viewAngle}deg) scale(${zoomLevel})`,
              }}
              className="relative w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden p-8 transition-transform duration-300"
            >
              <div className="absolute top-4 right-4 flex space-x-2 z-10">
                <button
                  onClick={() => setRotating(!rotating)}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                  aria-label="Rotate view"
                >
                  <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 12a9 9 0 1018 0 9 9 0 00-18 0z" />
                    <path d="M17 12H3M21 12h-2M12 17v2M12 5v2" strokeLinecap="round" />
                    <path d="M16 16l-4-4" strokeLinecap="round" />
                  </svg>
                </button>
                <button
                  onClick={() => setZoomLevel(z => Math.min(z + 0.1, 1.5))}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                  aria-label="Zoom in"
                >
                  <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 6v12M6 12h12" strokeLinecap="round" />
                  </svg>
                </button>
                <button
                  onClick={() => setZoomLevel(z => Math.max(z - 0.1, 0.8))}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                  aria-label="Zoom out"
                >
                  <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 12h12" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
             
              {/* Trouser preview */}
              <div className={`relative aspect-[3/4] ${colorMap[selectedColor as keyof typeof colorMap]} rounded-lg transition-colors duration-300`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={`/images/trousers/${selectedMaterial.id}/${selectedPleat}-${selectedHem}.png`}
                    alt={`${selectedMaterial.name} trousers in ${selectedColor}`}
                    width={400}
                    height={600}
                    className="object-contain mix-blend-multiply"
                    priority
                  />
                </div>
               
                {/* Texture overlay */}
                <div className={`absolute inset-0 opacity-20 rounded-lg ${selectedMaterial.texture}`}></div>
              </div>
             
              <div className="mt-4 text-center">
                <h3 className="text-lg font-medium text-gray-900">
                  {selectedMaterial.name} Trousers
                </h3>
                <p className="text-sm text-gray-500 capitalize">
                  {selectedColor} • {selectedPleat} • {selectedHem} Hem
                </p>
              </div>
            </motion.div>
           
            {/* Tooltip for "Added to Cart" notification */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-blue-900 text-white px-4 py-2 rounded-lg shadow-lg"
                >
                  Added to cart!
                </motion.div>
              )}
            </AnimatePresence>
           
            {/* Mobile tab navigation */}
            {!isDesktop && (
              <div className="absolute bottom-0 inset-x-0 bg-white border-t border-gray-200 py-2 px-4">
                <div className="flex justify-between">
                  {customizationOptions.slice(0, 6).map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleTabChange(option.id)}
                      className={`p-2 ${
                        currentTab === option.id ? 'text-blue-700' : 'text-gray-500'
                      }`}
                    >
                      <div className="w-6 h-6 mx-auto">{option.icon}</div>
                      <span className="text-xs block mt-1">{option.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
         
          {/* Floating action button for mobile */}
          {!isDesktop && (
            <div className="fixed right-4 bottom-20 z-30">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="bg-blue-700 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h19l-3 10H6L3 6zm0 0l-.75-2.5M10 21a1 1 0 11-2 0 1 1 0 012 0zm9 0a1 1 0 11-2 0 1 1 0 012 0z" strokeLinecap="round" />
                </svg>
              </motion.button>
            </div>
          )}
         
          {/* Desktop action buttons */}
          {isDesktop && (
            <div className="bg-white border-t border-gray-100 p-5 flex justify-between items-center">
              <div>
                <span className="text-lg font-medium">${calculatePrice()}</span>
                <span className="text-sm text-gray-500 ml-2">Free shipping</span>
              </div>
              <div className="flex gap-3">
                <button
                  className="px-6 py-2 border border-blue-700 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Save Design
                </button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h19l-3 10H6L3 6zm0 0l-.75-2.5M10 21a1 1 0 11-2 0 1 1 0 012 0zm9 0a1 1 0 11-2 0 1 1 0 012 0z" strokeLinecap="round" />
                  </svg>
                  Add to Cart
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}