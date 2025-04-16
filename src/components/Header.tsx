

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './header.module.css';
import { FiSearch, FiBell, FiUser, FiShoppingCart, FiChevronDown, FiClock } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from './CartContext'; // Import from the new file;
import { IconBaseProps, IconType } from 'react-icons';


interface Country {
  code: string;
  name: string;
  flag: string;
  language: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const COUNTRIES: Country[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸', language: 'en' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', language: 'en' },
  { code: 'FR', name: 'France', flag: '🇫🇷', language: 'fr' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', language: 'de' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', language: 'it' },
];

// Sample notifications data
const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Order received',
    message: 'The tailors at McBrown corps have received...',
    time: 'Today, 13 minutes ago',
    read: false
  },
  {
    id: '2',
    title: 'Order received',
    message: 'The tailors at McBrown corps have received...',
    time: 'Today, 13 minutes ago',
    read: false
  },
  {
    id: '3',
    title: 'Measurement Updated',
    message: 'Your measurements have been updated successfully',
    time: 'Yesterday',
    read: true
  },
  {
    id: '4',
    title: 'New Collection Available',
    message: 'Check out our new summer collection',
    time: '2 days ago',
    read: true
  },
  {
    id: '5',
    title: 'Order Shipped',
    message: 'Your order #12345 has been shipped',
    time: '3 days ago',
    read: true
  },
  {
    id: '6',
    title: 'Welcome to UOMO MIGLIORE',
    message: 'Thank you for creating an account',
    time: '1 week ago',
    read: true
  },
  {
    id: '7',
    title: 'Special Discount',
    message: 'Use code WELCOME10 for 10% off your first order',
    time: '1 week ago',
    read: true
  }
];

const translations: Record<string, Record<string, string>> = {
  en: {
    search: "Search",
    announcements: "Announcements here!! Announcements here!! Announcements here!! Announcements here!! Announcements here!!",
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
    priceRange: "Price Range",
    notifications: "Notifications",
    today: "Today",
    all: "All",
    unread: "Unread",
    markAsRead: "Mark As Read",
    review: "Review",
    cart: "Cart",
    addedToCart: "Added to cart!"
  },
  fr: {
    search: "Rechercher",
    announcements: "Annonces ici!! Annonces ici!! Annonces ici!! Annonces ici!! Annonces ici!!",
    men: "Hommes",
    women: "Femmes",
    accessories: "Accessoires",
    exclusives: "Exclusifs",
    // Add other French translations as needed
  },
  de: {
    search: "Suchen",
    announcements: "Ankündigungen hier!! Ankündigungen hier!! Ankündigungen hier!! Ankündigungen hier!!",
    men: "Herren",
    women: "Damen",
    accessories: "Accessoires",
    exclusives: "Exklusiv",
    // Add other German translations as needed
  },
  it: {
    search: "Cerca",
    announcements: "Annunci qui!! Annunci qui!! Annunci qui!! Annunci qui!! Annunci qui!!",
    men: "Uomo",
    women: "Donna",
    accessories: "Accessori",
    exclusives: "Esclusivi",
    // Add other Italian translations as needed
  }
};

interface IconWrapperProps extends IconBaseProps {
  icon: IconType;
}

const IconWrapper: React.FC<IconWrapperProps> = ({ icon, ...props }) => {
  // Use the as keyword to force TypeScript to accept this
  const Icon = icon as React.ComponentType<IconBaseProps>;
  return <Icon {...props} />;
};

export default function Header() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [currentLanguage, setCurrentLanguage] = useState(selectedCountry.language);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  
  // Notification state
  const [notifications, setNotifications] = useState<Notification[]>(SAMPLE_NOTIFICATIONS);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Use the shared CartContext
  const { cartCount, showAddedToast } = useCart();

  const navItems = [
    { id: 'men', label: translations[currentLanguage]?.men || translations.en.men, path: '/homepage' },
    { id: 'women', label: translations[currentLanguage]?.women || translations.en.women, path: '/women' },
    { id: 'accessories', label: translations[currentLanguage]?.accessories || translations.en.accessories, path: '/accessories' },
    { id: 'exclusives', label: translations[currentLanguage]?.exclusives || translations.en.exclusives, path: '/exclusives' }
  ];

  const unreadCount = notifications.filter(notification => !notification.read).length;

  // Get translations safely
  const getTranslation = (key: string) => {
    return translations[currentLanguage]?.[key] || translations.en[key] || key;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
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

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(notification => !notification.read);

  return (
    <div className={styles.pageContainer} id="header">
      <header className={styles.header}>
        <AnnouncementBar announcements={[getTranslation('announcements')]} />

        <div className={styles.navContainer}>
          <div className={styles.navLeft}>
            <div className={styles.notificationContainer} ref={notificationRef}>
              <button className={styles.iconButton} onClick={toggleNotifications}>
                <IconWrapper icon={FiBell} className={styles.icon} />
                {unreadCount > 0 && (
                  <span className={styles.notificationBadge}>{unreadCount}</span>
                )}
              </button>

              {isNotificationOpen && (
                <div className={styles.notificationDropdown}>
                  <div className={styles.notificationHeader}>
                    <h3>{getTranslation('notifications')}</h3>
                    <button className={styles.closeButton} onClick={() => setIsNotificationOpen(false)}>
                      ×
                    </button>
                  </div>
                  
                  <div className={styles.tabContainer}>
                    <button 
                      className={`${styles.tabButton} ${activeTab === 'all' ? styles.activeTab : ''}`}
                      onClick={() => setActiveTab('all')}
                    >
                      {getTranslation('all')}
                    </button>
                    <button 
                      className={`${styles.tabButton} ${activeTab === 'unread' ? styles.activeTab : ''}`}
                      onClick={() => setActiveTab('unread')}
                    >
                      {getTranslation('unread')}({unreadCount})
                    </button>
                  </div>

                  <div className={styles.notificationList}>
                    {filteredNotifications.length > 0 ? (
                      <>
                        <div className={styles.notificationDate}>
                          {getTranslation('today')}
                        </div>
                        
                        {filteredNotifications.map(notification => (
                          <div key={notification.id} className={`${styles.notificationItem} ${!notification.read ? styles.unread : ''}`}>
                            <div className={styles.notificationIcon}>
                              <div className={styles.iconCircle}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                  <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                              </div>
                            </div>
                            <div className={styles.notificationContent}>
                              <h4>{notification.title}</h4>
                              <p>{notification.message}</p>
                              <span className={styles.notificationTime}>{notification.time}</span>
                              
                              <div className={styles.notificationActions}>
                                <button className={styles.reviewButton}>
                                  {getTranslation('review')}
                                </button>
                                {!notification.read && (
                                  <button 
                                    className={styles.markReadButton}
                                    onClick={() => markAsRead(notification.id)}
                                  >
                                    {getTranslation('markAsRead')}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <div className={styles.emptyNotifications}>
                        No {activeTab === 'unread' ? 'unread ' : ''}notifications
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className={styles.searchContainer}>
              {searchOpen ? (
                <input
                  id="search-input"
                  type="text"
                  placeholder={getTranslation('search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                  onBlur={() => setSearchOpen(false)}
                />
              ) : (
                <button onClick={toggleSearch} className={styles.iconButton}>
                  <IconWrapper icon={FiSearch} className={styles.icon} />
                  <span className={styles.searchText}>{getTranslation('search')}</span>
                </button>
              )}
            </div>
          </div>

          <div style={{ 
            color: '#A07B43',
            fontFamily: 'Xenus',
            fontWeight: 580,
            fontSize: 30,
          }}>
            UOMO MIGLIORE
          </div>

          <div className={styles.navRight}>
            <div className={styles.countrySelector} ref={dropdownRef}>
              <button
                onClick={() => setIsCountryOpen(!isCountryOpen)}
                className={styles.countryButton}
              >
                <span className={styles.flag}>{selectedCountry.flag}</span>
                <IconWrapper icon={FiChevronDown} className={`{styles.chevron} ${isCountryOpen ? styles.rotate : ''}`} />
              </button>

              {isCountryOpen && (
                <div className={styles.countryDropdown}>
                  {COUNTRIES.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => {
                        setSelectedCountry(country);
                        setIsCountryOpen(false);
                      }}
                      className={`${styles.countryOption} ${country.code === selectedCountry.code ? styles.selected : ''}`}
                    >
                      <span className={styles.flag}>{country.flag}</span>
                      <span>{country.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <Link href="/account" className={styles.iconButton}>
              <FiUser className={styles.icon} />
            </Link>

            <button className={styles.iconButton} title="History">
              <FiClock className={styles.icon} />
            </button>

            {/* Modified cart button to link directly to cart page */}
            <Link href="/cart" className={styles.iconButton}>
              <FiShoppingCart className={styles.icon} />
              <span className={styles.cartBadge}>{cartCount}</span>
            </Link>
          </div>
        </div>

        <nav className={styles.navMenu}>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.id} className={styles.navItem}>
                <Link
                  href={item.path}
                  className={`${styles.navLink} ${pathname === item.path ? styles.active : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Toast notification for items added to cart */}
        {showAddedToast && (
          <div className={styles.addedToast}>
            {getTranslation('addedToCart')}
          </div>
        )}
      </header>
    </div>
  );
}

function AnnouncementBar({ announcements }: { announcements: string[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const container = containerRef.current;
    if (!scrollContainer || !container) return;

    let animationId: number | null = null;
    let position = 0;
    const speed = 1;

    const animate = () => {
      position -= speed;
      if (position <= -scrollContainer.scrollWidth) {
        position = container.offsetWidth;
      }
      scrollContainer.style.transform = `translateX(${position}px)`;
      animationId = window.requestAnimationFrame(animate);
    };

    position = container.offsetWidth;
    scrollContainer.style.transform = `translateX(${position}px)`;
    animationId = window.requestAnimationFrame(animate);

    return () => {
      if (animationId !== null) {
        window.cancelAnimationFrame(animationId);
      }
    };
  }, [announcements]);

  return (
    <div ref={containerRef} className={styles.announcementContainer}>
      <div ref={scrollRef} className={styles.announcementScroll}>
        {announcements.map((announcement, index) => (
          <span key={index} className={styles.announcement}>
            {announcement}
          </span>
        ))}
      </div>
    </div>
  );
}
