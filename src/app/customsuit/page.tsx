// src/app/customsuit/page.tsx
"use client";


import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';






// Custom hook for animations
const useAnimation = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
 
  useEffect(() => {
    setTimeout(() => setAnimationComplete(true), 1800);
  }, []);
 
  return animationComplete;
};


// Premium Material Swatches
const materials = [
  {
    id: 'wool',
    name: 'Premium Wool',
    colors: ['slate', 'charcoal', 'navy', 'black', 'burgundy', 'stone'],
    texture: "bg-gradient-to-br from-gray-300 to-gray-400"
  },
  {
    id: 'cashmere',
    name: 'Italian Cashmere',
    colors: ['black', 'navy', 'charcoal', 'camel', 'burgundy', 'forest'],
    texture: "bg-gradient-to-br from-gray-200 to-gray-300"
  },
  {
    id: 'linen',
    name: 'Summer Linen',
    colors: ['white', 'beige', 'sky', 'navy', 'sage', 'khaki'],
    texture: "bg-gradient-to-br from-gray-100 to-gray-200"
  },
];


// Color mapping
const colorMap = {
  slate: "bg-gray-400",
  charcoal: "bg-gray-600",
  navy: "bg-blue-900",
  black: "bg-black",
  burgundy: "bg-red-900",
  stone: "bg-stone-400",
  camel: "bg-amber-600",
  forest: "bg-emerald-900",
  white: "bg-white border border-gray-200",
  beige: "bg-amber-100",
  sky: "bg-sky-300",
  sage: "bg-green-300",
  khaki: "bg-yellow-700",
};


// Button styles
const buttonTypes = [
  { id: 'single', name: 'Single Button' },
  { id: 'double', name: 'Double Button' },
  { id: 'threeButton', name: 'Three Button' },
];


// Lapel styles
const lapelTypes = [
  { id: 'notch', name: 'Notch Lapel' },
  { id: 'peak', name: 'Peak Lapel' },
  { id: 'shawl', name: 'Shawl Lapel' },
];


// Pocket styles
const pocketTypes = [
  { id: 'flap', name: 'Flap Pockets' },
  { id: 'patch', name: 'Patch Pockets' },
  { id: 'jetted', name: 'Jetted Pockets' },
];


// Measurement presets
const fitTypes = [
  { id: 'slim', name: 'Slim Fit' },
  { id: 'regular', name: 'Regular Fit' },
  { id: 'relaxed', name: 'Relaxed Fit' },
];


// Icons
const FabricIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4h16v16H4z" strokeLinecap="round" />
    <path d="M4 12h16M12 4v16" strokeLinecap="round" />
    <path d="M4 4l16 16M20 4L4 20" strokeLinecap="round" strokeDasharray="0.5 2" />
  </svg>
);


const ButtonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
    <path d="M12 6v-2M12 20v-2M6 12H4M20 12h-2" strokeLinecap="round" />
  </svg>
);


const LapelIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 3v18M7 3l5 8v10M17 3l-5 8" strokeLinecap="round" />
  </svg>
);


const PocketIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="4" y="6" width="16" height="12" rx="2" strokeLinecap="round" />
    <path d="M8 10h8M8 14h8" strokeLinecap="round" strokeDasharray="0.5 2" />
  </svg>
);


const LiningIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="6" y="6" width="12" height="16" rx="1" strokeLinecap="round" />
    <path d="M6 10h12M6 14h12" strokeLinecap="round" strokeDasharray="0.5 2" />
    <path d="M10 6V4a2 2 0 012-2v0a2 2 0 012 2v2" strokeLinecap="round" />
  </svg>
);


export default function SuitConfigurator() {
  const router = useRouter();
  const animationComplete = useAnimation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<string>('fabric');
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0]);
  const [selectedColor, setSelectedColor] = useState(selectedMaterial.colors[0]);
  const [selectedFit, setSelectedFit] = useState(fitTypes[0].id);
  const [selectedLapel, setSelectedLapel] = useState(lapelTypes[0].id);
  const [selectedButton, setSelectedButton] = useState(buttonTypes[0].id);
  const [selectedPocket, setSelectedPocket] = useState(pocketTypes[0].id);
  const [rotating, setRotating] = useState(false);
  const [viewAngle, setViewAngle] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    fabric: true,
    button: false,
    lapel: false,
    pockets: false,
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
    { id: 'button', name: 'Buttons', icon: <ButtonIcon />, subtitle: 'Style and placement' },
    { id: 'lapel', name: 'Lapel', icon: <LapelIcon />, subtitle: 'Collar design and width' },
    { id: 'pockets', name: 'Pockets', icon: <PocketIcon />, subtitle: 'Placement and type' },
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
    let basePrice = selectedMaterial.id === 'cashmere' ? 899 : selectedMaterial.id === 'wool' ? 699 : 599;
    if (selectedLapel === 'peak') basePrice += 50;
    if (selectedButton === 'double') basePrice += 30;
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
                Craft Your Perfect Suit
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
              <h2 className="text-xl font-semibold text-center">Customize Your Suit</h2>
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
                                           material.id === 'cashmere' ? 'Luxurious, soft' :
                                           'Breathable, light'}
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
                             
                              {option.id === 'button' && (
                                <div className="space-y-3">
                                  {buttonTypes.map((type) => (
                                    <button
                                      key={type.id}
                                      onClick={() => setSelectedButton(type.id)}
                                      className={`w-full p-3 rounded-lg border ${
                                        selectedButton === type.id
                                        ? 'border-blue-600 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                      } transition-all text-left`}
                                    >
                                      {type.name}
                                    </button>
                                  ))}
                                </div>
                              )}
                             
                              {option.id === 'lapel' && (
                                <div className="space-y-3">
                                  {lapelTypes.map((type) => (
                                    <button
                                      key={type.id}
                                      onClick={() => setSelectedLapel(type.id)}
                                      className={`w-full p-3 rounded-lg border ${
                                        selectedLapel === type.id
                                        ? 'border-blue-600 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                      } transition-all text-left`}
                                    >
                                      {type.name}
                                    </button>
                                  ))}
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
                                      {type.name}
                                    </button>
                                  ))}
                                </div>
                              )}
                             
                              {option.id === 'lining' && (
                                <div className="space-y-3">
                                  {['Classic', 'Silk', 'Patterned', 'Contrast'].map((type) => (
                                    <button
                                      key={type}
                                      className="w-full p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-all text-left"
                                    >
                                      {type}
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
       
        {/* Right content - suit preview */}
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
                                     material.id === 'cashmere' ? 'Luxurious, soft' :
                                     'Breathable, light'}
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
                     
                      {currentTab === 'button' && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {buttonTypes.map((type) => (
                            <button
                              key={type.id}
                              onClick={() => setSelectedButton(type.id)}
                              className={`p-3 rounded-lg border ${
                                selectedButton === type.id
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                              } transition-all`}
                            >
                              <h4 className="font-medium text-gray-900">{type.name}</h4>
                            </button>
                          ))}
                        </div>
                      )}
                     
                      {currentTab === 'lapel' && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {lapelTypes.map((type) => (
                            <button
                              key={type.id}
                              onClick={() => setSelectedLapel(type.id)}
                              className={`p-3 rounded-lg border ${
                                selectedLapel === type.id
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                              } transition-all`}
                            >
                              <h4 className="font-medium text-gray-900">{type.name}</h4>
                            </button>
                          ))}
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
                            </button>
                          ))}
                        </div>
                      )}
                     
                      {currentTab === 'lining' && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {['Classic', 'Silk', 'Patterned', 'Contrast'].map((type) => (
                            <button
                              key={type}
                              className="p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
                            >
                              <h4 className="font-medium text-gray-900">{type}</h4>
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
             
              {/* Suit preview */}
              <div className={`relative aspect-[3/4] ${colorMap[selectedColor as keyof typeof colorMap]} rounded-lg transition-colors duration-300`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={`/images/suits/${selectedMaterial.id}/${selectedButton}-${selectedLapel}.png`}
                    alt={`${selectedMaterial.name} suit in ${selectedColor} with ${selectedLapel} lapel`}
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
                  {selectedMaterial.name} {selectedButton === 'double' ? 'Double-Breasted' : 'Single-Breasted'} Suit
                </h3>
                <p className="text-sm text-gray-500 capitalize">{selectedColor} • {selectedLapel} Lapel • {selectedFit} Fit</p>
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
                  {customizationOptions.slice(0, 5).map((option) => (
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

