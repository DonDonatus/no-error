"use client";

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import { FiSearch, FiBell, FiUser, FiShoppingCart, FiChevronDown, FiClock, FiFilter } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link'; // Added import for Link component
import Header from '@/components/Header'; 
import HelpButton from '@/components/HelpButton';
import { IconBaseProps, IconType } from 'react-icons';

interface Country {
  code: string;
  name: string;
  flag: string;
  language: string;
}

const COUNTRIES: Country[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸', language: 'en' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', language: 'en' },
  { code: 'FR', name: 'France', flag: '🇫🇷', language: 'fr' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', language: 'de' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', language: 'it' },
];

// Sample translations
const translations: Record<string, Record<string, string>> = {
  en: {
    search: "Search",
    announcements: "Announcements here",
    men: "Men",
    women: "Women",
    accessories: "Accessories",
    exclusives: "Exclusives",
    filter: "Filter",
    outOfStock: "Out of Stock",
    show: "Show",
    hide: "Hide",
    productType: "Product Type",
    tuxedos: "Tuxedos",
    blazers: "Blazers",
    pants: "Pants",
    priceRange: "Price Range"
  },
  // Add translations for other languages...
};


interface IconWrapperProps extends IconBaseProps {
  icon: IconType;
}

const IconWrapper: React.FC<IconWrapperProps> = ({ icon, ...props }) => {
  // Use the as keyword to force TypeScript to accept this
  const Icon = icon as React.ComponentType<IconBaseProps>;
  return <Icon {...props} />;
};



export default function homepage( ) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [currentLanguage, setCurrentLanguage] = useState(selectedCountry.language);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Filter states
  const [showOutOfStock, setShowOutOfStock] = useState(true);
  const [selectedProductTypes, setSelectedProductTypes] = useState({
    tuxedos: false,
    blazers: false,
    pants: false
  });
  const [priceRange, setPriceRange] = useState({ min: 10, max: 50 });
  const [filterOpen, setFilterOpen] = useState(false);

  // Navigation items
  const navItems = [
    { id: 'men', label: translations[currentLanguage].men },
    { id: 'women', label: translations[currentLanguage].women, path: '/women'},
    { id: 'accessories', label: translations[currentLanguage].accessories},
    { id: 'exclusives', label: translations[currentLanguage].exclusives }
  ];

  // Sample product data with image paths
  const products = [
    { 
      id: 1, 
      brand: 'Italian Suit', 
      name: 'Men suit', 
      price: '$150.00', 
      image: '/images/color.png',
      rating: 5 
    },
    { 
      id: 2, 
      brand: 'Tuxedo', 
      name: 'Men suit', 
      price: '$150.00', 
      image: '/images/image1.png',
      rating: 5
    },
    { 
      id: 3, 
      brand: 'Mandarin Suit', 
      name: 'Men suit', 
      price: '$150.00', 
      image: '/images/mandarin.jpg',
      rating: 5
    },
    { 
      id: 4, 
      brand: 'Double Breasted Suit', 
      name: 'Men suit', 
      price: '$150.00', 
      image: '/images/shine.png',
      rating: 5
    },
    { 
      id: 5, 
      brand: 'Classic Suit', 
      name: 'Men suit', 
      price: '$180.00', 
      image: '/images/bblack.png',
      rating: 4
    },
    { 
      id: 6, 
      brand: 'Slim Fit', 
      name: 'Men suit', 
      price: '$200.00', 
      image: '/images/black.png',
      rating: 5
    },
    { 
      id: 7, 
      brand: 'Slim Fit', 
      name: 'Men suit', 
      price: '$200.00', 
      image: '/images/black.png',
      rating: 5
    },
    { 
      id: 8, 
      brand: 'Slim Fit', 
      name: 'Men suit', 
      price: '$200.00', 
      image: '/images/black.png',
      rating: 4
    },
    { 
      id: 9, 
      brand: 'Slim Fit', 
      name: 'Men suit', 
      price: '$200.00', 
      image: '/images/black.png',
      rating: 5
    },
    { 
      id: 10, 
      brand: 'Slim Fit', 
      name: 'Men suit', 
      price: '$200.00', 
      image: '/images/black.png',
      rating: 5
    }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update language when country changes
  useEffect(() => {
    setCurrentLanguage(selectedCountry.language);
  }, [selectedCountry]);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setTimeout(() => {
        document.getElementById('search-input')?.focus();
      }, 100);
    }
  };

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const handleProductTypeChange = (type: keyof typeof selectedProductTypes) => {
    setSelectedProductTypes((prev) => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleOutOfStockChange = (value: boolean) => {
    setShowOutOfStock(value);
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPriceRange(prev => ({
      ...prev,
      [e.target.name]: value
    }));
  };

  return (
    <div className={styles.pageContainer}>
      <Header />

      {/* Men Category Section */}
      <div className={styles.categorySection}>
        <h1 className={styles.categoryTitle}>Men</h1>
        <div className={styles.categoryCount}>200 products</div>
      </div>
      
      {/* Product listing with filter */}
      <div className={styles.productContainer}>
        {/* Product Grid */}
        <div className={styles.productGrid}>
          {/* Filter overlay button - positioned absolutely */}
          <div className={styles.filterOverlayButton}>
            <button 
              className={styles.filterToggle}
              onClick={toggleFilter}
            >
              <IconWrapper icon={FiFilter} className={styles.filterIcon} />
              <span>{translations[currentLanguage].filter}</span>
              <IconWrapper icon={FiChevronDown} className={`${styles.chevron} ${filterOpen ? styles.rotate : ''}`} />
            </button>
          </div>
          
          {/* Filter sidebar - positioned absolutely when open */}
          {filterOpen && (
            <div className={styles.filterOverlay}>
              <div className={styles.filterOptions}>
                {/* Out of Stock Filter */}
                <div className={styles.filterSection}>
                  <h3>{translations[currentLanguage].outOfStock}:</h3>
                  <div className={styles.filterOption}>
                    <label className={styles.filterLabel}>
                      <input
                        type="radio"
                        name="outOfStock"
                        checked={showOutOfStock}
                        onChange={() => handleOutOfStockChange(true)}
                        className={styles.filterInput}
                      />
                      {translations[currentLanguage].show}
                    </label>
                  </div>
                  <div className={styles.filterOption}>
                    <label className={styles.filterLabel}>
                      <input
                        type="radio"
                        name="outOfStock"
                        checked={!showOutOfStock}
                        onChange={() => handleOutOfStockChange(false)}
                        className={styles.filterInput}
                      />
                      {translations[currentLanguage].hide}
                    </label>
                  </div>
                </div>
                
                {/* Product Type Filter */}
                <div className={styles.filterSection}>
                  <h3>{translations[currentLanguage].productType}:</h3>
                  <div className={styles.filterOption}>
                    <label className={styles.filterLabel}>
                      <input
                        type="checkbox"
                        checked={selectedProductTypes.tuxedos}
                        onChange={() => handleProductTypeChange('tuxedos')}
                        className={styles.filterInput}
                      />
                      {translations[currentLanguage].tuxedos}
                    </label>
                  </div>
                  <div className={styles.filterOption}>
                    <label className={styles.filterLabel}>
                      <input
                        type="checkbox"
                        checked={selectedProductTypes.blazers}
                        onChange={() => handleProductTypeChange('blazers')}
                        className={styles.filterInput}
                      />
                      {translations[currentLanguage].blazers}
                    </label>
                  </div>
                  <div className={styles.filterOption}>
                    <label className={styles.filterLabel}>
                      <input
                        type="checkbox"
                        checked={selectedProductTypes.pants}
                        onChange={() => handleProductTypeChange('pants')}
                        className={styles.filterInput}
                      />
                      {translations[currentLanguage].pants}
                    </label>
                  </div>
                </div>
                
                {/* Price Range Filter with slider */}
                <div className={styles.filterSection}>
                  <h3>{translations[currentLanguage].priceRange}:</h3>
                  <div className={styles.priceRangeContainer}>
                    <div className={styles.priceDisplay}>
                      <span>GHS {priceRange.min}</span>
                      <span>GHS {priceRange.max}</span>
                    </div>
                    <div className={styles.sliderContainer}>
                      <input
                        type="range"
                        name="min"
                        min="10"
                        max="50"
                        value={priceRange.min}
                        onChange={handlePriceRangeChange}
                        className={styles.slider}
                      />
                      <input
                        type="range"
                        name="max"
                        min="10"
                        max="50"
                        value={priceRange.max}
                        onChange={handlePriceRangeChange}
                        className={styles.slider}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Actual product cards with images - Modified to use Link component */}
          {products.map(product => (
            <div key={product.id} className={styles.productCard}>
              <Link href={`/product/${product.id}`}>
                <div className={styles.productImageContainer}>
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    width={300}
                    height={400}
                    className={styles.productImage}
                    objectFit="cover"
                  />
                </div>
                <div className={styles.productInfo}>
                  <div className={styles.productBrand}>{product.brand}</div>
                  <div className={styles.productName}>{product.name}</div>
                  <div className={styles.productPrice}>{product.price}</div>
                  <div className={styles.productRating}>
                    {Array(product.rating).fill(0).map((_, i) => (
                      <span key={i} className={styles.starIcon}>★</span>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <HelpButton />
    </div>
  );
}