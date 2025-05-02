// components/CustomizationOption.tsx
import styles from '../app/customtrouser/TrouserCustomizer.module.css';

// Define an interface for the option prop
interface Option {
  thumbnail: string;
  name: string;
  // Add any other properties that your option object might have
}

// Define props interface for the component
interface CustomizationOptionProps {
  option: Option;
  isSelected: boolean;
  onSelect: () => void;
}

export default function CustomizationOption({ option, isSelected, onSelect }: CustomizationOptionProps) {
  return (
    <div 
      className={`${styles.optionItem} ${isSelected ? styles.selected : ''}`}
      onClick={onSelect}
    >
      <img 
        src={option.thumbnail} 
        alt={option.name} 
        className={styles.optionThumbnail} 
      />
      <span className={styles.optionName}>{option.name}</span>
    </div>
  );
}