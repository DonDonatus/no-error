'use client';
// components/CustomizationMenu.js
import { useState } from 'react';
import CustomizationOption from './CustomizationOption';
import styles from '../app/customtrouser/TrouserCustomizer.module.css';

export default function CustomizationMenu({ trouserState, updateTrouserFeature }) {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const options = {
    pockets: [
      { id: 'slant', name: 'Slant Pocket', thumbnail: '/icons/slant-pocket.svg' },
      { id: 'frogmouth', name: 'Frogmouth Pocket', thumbnail: '/icons/frogmouth-pocket.svg' },
      { id: 'on-seam', name: 'On-Seam Pocket', thumbnail: '/icons/on-seam-pocket.svg' },
    ],
    hem: [
      { id: 'plain', name: 'Plain Hem', thumbnail: '/icons/plain-hem.svg' },
      { id: 'cuffed', name: 'Cuffed Hem', thumbnail: '/icons/cuffed-hem.svg' },
      { id: 'tapered', name: 'Tapered Hem', thumbnail: '/icons/tapered-hem.svg' },
    ],
    pleats: [
      { id: 'none', name: 'No Pleats', thumbnail: '/icons/no-pleats.svg' },
      { id: 'single', name: 'Single Pleat', thumbnail: '/icons/single-pleat.svg' },
      { id: 'double', name: 'Double Pleat', thumbnail: '/icons/double-pleat.svg' },
    ],
    adjusters: [
      { id: 'belt-loop', name: 'Belt Loops', thumbnail: '/icons/belt-loop.svg' },
      { id: 'side-adjuster', name: 'Side Adjuster', thumbnail: '/icons/side-adjuster.svg' },
      { id: 'buckle-side', name: 'Buckle Side Adjuster', thumbnail: '/icons/buckle-adjuster.svg' },
    ],
    lining: [
      { id: 'standard', name: 'Standard Lining', thumbnail: '/icons/standard-lining.svg' },
      { id: 'floral', name: 'Floral Pattern', thumbnail: '/icons/floral-lining.svg' },
      { id: 'striped', name: 'Striped Pattern', thumbnail: '/icons/striped-lining.svg' },
      { id: 'geometric', name: 'Geometric Pattern', thumbnail: '/icons/geometric-lining.svg' },
    ],
  };

  // Category icon mapping
  const categoryIcons = {
    pockets: "/icons/pockets.svg",
    hem: "/icons/hem.svg",
    pleats: "/icons/pleats.svg",
    adjusters: "/icons/adjusters.svg",
    lining: "/icons/lining.svg",
  };

  return (
    <div className={styles.customizationMenu}>
      <h2 className={styles.menuHeader}>Items</h2>
      
      {Object.keys(options).map(category => (
        <div key={category} className={styles.categoryContainer}>
          <div 
            className={styles.categoryHeader} 
            onClick={() => toggleCategory(category)}
          >
            <div className={styles.categoryIconWrapper}>
              <img 
                src={categoryIcons[category]} 
                alt={category} 
                className={styles.categoryIcon} 
              />
            </div>
            <h3 className={styles.categoryTitle}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h3>
            <span className={styles.expandIcon}>
              {expandedCategory === category ? '▼' : '▶'}
            </span>
          </div>
          
          {expandedCategory === category && (
            <div className={styles.optionsContainer}>
              <div className={styles.optionsList}>
                {options[category].map(option => (
                  <CustomizationOption
                    key={option.id}
                    option={option}
                    isSelected={trouserState[category].type === option.id}
                    onSelect={() => updateTrouserFeature(category, { type: option.id })}
                  />
                ))}
              </div>
              
              <div className={styles.colorSelector}>
                <label>Color:</label>
                <input 
                  type="color" 
                  value={trouserState[category].color}
                  onChange={(e) => updateTrouserFeature(category, { color: e.target.value })}
                />
              </div>
            </div>
          )}
        </div>
      ))}
      
      <div className={styles.mainColorSelector}>
        <label>Main Fabric Color:</label>
        <input 
          type="color" 
          value={trouserState.mainColor}
          onChange={(e) => setTrouserState(prev => ({...prev, mainColor: e.target.value}))}
        />
      </div>
    </div>
  );
}