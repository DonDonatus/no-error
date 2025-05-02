"use client";

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import { FiSearch, FiBell, FiUser, FiShoppingCart, FiChevronDown, FiClock, FiFilter } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import HelpButton from '@/components/HelpButton';
import { IconBaseProps, IconType } from 'react-icons';
import { getProductsByCategory } from 'data/product';

interface ProductType {
  id: number
  name: string;
  image: string;
  price: string;
  rating: number;
  brand: string;
}

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
};

interface IconWrapperProps extends IconBaseProps {
  icon: IconType;
}

const IconWrapper: React.FC<IconWrapperProps> = ({ icon, ...props }) => {
  const Icon = icon as React.ComponentType<IconBaseProps>;
  return <Icon {...props} />;
};

export default function Homepage() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [currentLanguage, setCurrentLanguage] = useState(selectedCountry.language);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [showOutOfStock, setShowOutOfStock] = useState(true);
  const [selectedProductTypes, setSelectedProductTypes] = useState({
    tuxedos: false,
    blazers: false,
    pants: false
  });
  const [priceRange, setPriceRange] = useState({ min: 10, max: 50 });
  const [filterOpen, setFilterOpen] = useState(false);

  const navItems = [
    { id: 'men', label: translations[currentLanguage].men },
    { id: 'women', label: translations[currentLanguage].women, path: '/women'},
    { id: 'accessories', label: translations[currentLanguage].accessories },
    { id: 'exclusives', label: translations[currentLanguage].exclusives }
  ];

  const products: ProductType[] = getProductsByCategory('accessories');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    setSelectedProductTypes(prev => ({
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

      <div className={styles.categorySection}>
        <h1 className={styles.categoryTitle}>ACCESSORIES</h1>
        <div className={styles.categoryCount}>{products.length} products</div>
      </div>

      <div className={styles.productContainer}>
        <div className={styles.productGrid}>
          <div className={styles.filterOverlayButton}>
            <button className={styles.filterToggle} onClick={toggleFilter}>
              <IconWrapper icon={FiFilter} className={styles.filterIcon} />
              <span>{translations[currentLanguage].filter}</span>
              <IconWrapper icon={FiChevronDown} className={`${styles.chevron} ${filterOpen ? styles.rotate : ''}`} />
            </button>
          </div>

          {filterOpen && (
            <div className={styles.filterOverlay}>
              <div className={styles.filterOptions}>
                <div className={styles.filterSection}>
                  <h3>{translations[currentLanguage].outOfStock}:</h3>
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

                <div className={styles.filterSection}>
                  <h3>{translations[currentLanguage].productType}:</h3>
                  {Object.keys(selectedProductTypes).map(type => (
                    <label key={type} className={styles.filterLabel}>
                      <input
                        type="checkbox"
                        checked={selectedProductTypes[type as keyof typeof selectedProductTypes]}
                        onChange={() => handleProductTypeChange(type as keyof typeof selectedProductTypes)}
                        className={styles.filterInput}
                      />
                      {translations[currentLanguage][type]}
                    </label>
                  ))}
                </div>

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

          {products.map((product: ProductType) => (
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
