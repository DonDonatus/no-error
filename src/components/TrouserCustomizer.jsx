// components/TrouserCustomizer.js
import { useState, useEffect } from 'react';
import CustomizationMenu from './CustomizationMenu';
import TrouserViewer from './TrouserViewer';
import useTrouserState from '../app/hooks/useTrouserState';
import styles from '../app/customtrouser/TrouserCustomizer.module.css';

export default function TrouserCustomizer() {
  const { trouserState, updateTrouserFeature } = useTrouserState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading the 3D model
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.exitButton}>Exit</button>
        <div className={styles.logo}>
          <img src="/logo.svg" alt="Logo" />
        </div>
        <div className={styles.profileSection}>
          <img src="/profile.jpg" className={styles.profileImage} alt="Profile" />
        </div>
      </header>

      <div className={styles.mainContent}>
        <CustomizationMenu 
          trouserState={trouserState}
          updateTrouserFeature={updateTrouserFeature}
        />
        
        <div className={styles.viewerContainer}>
          <TrouserViewer 
            trouserState={trouserState} 
            isLoading={isLoading} 
          />
          
          <button className={styles.addToCartButton}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

