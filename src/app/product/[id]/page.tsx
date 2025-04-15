"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import HelpButton from '@/components/HelpButton';
import styles from './ProductDetail.module.css';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '@/components/CartContext'; // Import useCart hook

// Sample product data - in a real app, this would come from an API or database
const productData = [
  { 
    id: 1, 
    brand: 'Army Black Suit', 
    name: "Men's Suit", 
    price: 'GHS 100', 
    image: '/images/color.png',
    rating: 5,
    description: 'Turn any moment into a fashion sensation and conjure up cool, fresh vibes with the Army Black Suit. From weddings to proms, this suit is a cut for the modern and the supernatural triple twist, as you put it spoil on everybody you meet. This Army black suit makes you a walking magic show!',
    material: '100% Wool',
    careInstructions: 'Dry clean only',
    reviewCount: 50,
    availability: false,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Charcoal'],
  },
  // Keep the rest of your product data
  { 
    id: 2, 
    brand: 'Tuxedo', 
    name: 'Men suit', 
    price: '$150.00', 
    image: '/images/image1.png',
    rating: 5,
    description: 'Classic tuxedo with satin lapels. Ideal for black-tie events and formal gatherings.',
    material: 'Wool blend',
    careInstructions: 'Dry clean only',
    reviewCount: 30,
    availability: true,
    sizes: ['S', 'M', 'L'],
    colors: ['Black', 'Navy'],
  },
  // Other products remain the same...
];

export default function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  
  // Add state to track which accordion sections are open
  const [specificationsOpen, setSpecificationsOpen] = useState(false);
  const [fabricCareOpen, setFabricCareOpen] = useState(false);
  
  // Import cart context
  const { updateCartCount } = useCart();

  useEffect(() => {
    // Get the product ID from the URL parameter
    const productId = parseInt(params.id as string);
    
    // Find the product by ID (in a real app, you would fetch this from an API)
    const foundProduct = productData.find(p => p.id === productId);
    
    if (foundProduct) {
      setProduct(foundProduct);
    }
    
    setLoading(false);
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      // Get existing cart from localStorage - KEEP using 'shoppingCart' as the key
      const existingCartJSON = localStorage.getItem('shoppingCart');
      const existingCart = existingCartJSON ? JSON.parse(existingCartJSON) : [];
      
      // Create cart item object
      const cartItem = {
        id: product.id,
        name: product.brand,
        price: product.price,
        image: product.image,
        size: selectedSize,
        quantity: quantity
      };
      
      // Check if product already exists in cart with same size
      const existingItemIndex = existingCart.findIndex(
        (item: any) => item.id === product.id && item.size === selectedSize
      );

      // If exists, update quantity, otherwise add new item
      if (existingItemIndex >= 0) {
        existingCart[existingItemIndex].quantity += quantity;
      } else {
        existingCart.push(cartItem);
      }
      
      // Save updated cart back to localStorage - KEEP using 'shoppingCart'
      localStorage.setItem('shoppingCart', JSON.stringify(existingCart));
      
      // Calculate new total quantity from all cart items
      const newTotalQuantity = existingCart.reduce((total: number, item: any) => {
        return total + (item.quantity || 1);
      }, 0);
      
      // ALSO save a simplified version of the cart for the header to read
      // This won't affect your cart page which uses 'shoppingCart'
      localStorage.setItem('cart', JSON.stringify(existingCart));
      
      // Update the cart count in context - this will update the header number
      updateCartCount(newTotalQuantity);
    }
  };

  const handleCustomizeSuit = () => {
    // Implement suit customization functionality
    alert('Opening suit customization');
  };

  const handleCustomizeTrouser = () => {
    // Implement trouser customization functionality
    alert('Opening trouser customization');
  };

  const handleNotifyMe = () => {
    // Implement notification functionality
    alert('You will be notified when this product is available');
  };
  
  const toggleSpecifications = () => {
    setSpecificationsOpen(!specificationsOpen);
  };
  
  const toggleFabricCare = () => {
    setFabricCareOpen(!fabricCareOpen);
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!product) {
    return <div className={styles.notFound}>Product not found</div>;
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.productDetail}>
          {/* Left side - Product image */}
          <div className={styles.productImage}>
            <Image 
              src={product.image}
              alt={product.brand}
              layout="fill"
              objectFit="cover"
              className={styles.image}
              priority
            />
          </div>
          
          {/* Right side - Product info */}
          <div className={styles.productInfo}>
            {/* Rating and reviews */}
            <div className={styles.ratingContainer}>
              <div className={styles.rating}>
                {Array(product.rating).fill(0).map((_, i) => (
                  <span key={i} className={styles.star}>★</span>
                ))}
                <span className={styles.reviewCount}>({product.reviewCount} reviews)</span>
              </div>
              {/* Product name and type */}
            <h1 className={styles.brand}>{product.brand}</h1>
            <h2 className={styles.name}>{product.name}</h2>
            {/* Price */}
            <div className={styles.price}>{product.price}</div>
            </div>
            
            {/* Action buttons */}
            <div className={styles.actions}>
              <button className={styles.addToCartButton} onClick={handleAddToCart}>
                ADD TO CART
              </button>
              <button className={styles.customizeButton} onClick={handleCustomizeSuit}>
                CUSTOMIZE SUIT
              </button>
              <button className={styles.customizeButton} onClick={handleCustomizeTrouser}>
                CUSTOMIZE TROUSER
              </button>
            </div>
            
            {/* Availability status */}
            {!product.availability && (
              <div className={styles.availabilityContainer}>
                <div className={styles.soldOut}>SOLD OUT</div>
                <button className={styles.notifyButton} onClick={handleNotifyMe}>
                  Notify me when available
                </button>
              </div>
            )}
            
            {/* Product description */}
            <div className={styles.description}>
              {product.description}
            </div>
            
            {/* Specifications and Care accordion sections */}
            <div className={styles.accordionSection}>
              <div className={styles.accordionHeader} onClick={toggleSpecifications}>
                <span className={styles.checkIcon}><img src='/icons/spec.svg'/></span> Specifications
                <span className={styles.plusIcon} style={{ transform: specificationsOpen ? 'rotate(45deg)' : 'none' }}>+</span>
              </div>
              {specificationsOpen && (
                <div className={styles.accordionContent}>
                  <p>Material: {product.material}</p>
                  <p>Available Sizes: {product.sizes.join(', ')}</p>
                  <p>Available Colors: {product.colors.join(', ')}</p>
                </div>
              )}
            </div>
            
            <div className={styles.accordionSection}>
              <div className={styles.accordionHeader} onClick={toggleFabricCare}>
                <span className={styles.folderIcon}><img src='/icons/fabric.svg' className='fabric'/></span> Fabric & Care
                <span className={styles.plusIcon} style={{ transform: fabricCareOpen ? 'rotate(45deg)' : 'none' }}>+</span>
              </div>
              {fabricCareOpen && (
                <div className={styles.accordionContent}>
                  <p>Care Instructions: {product.careInstructions}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <HelpButton />
      </div>
    </>
  );
}