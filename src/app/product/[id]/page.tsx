"use client";

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import HelpButton from '@/components/HelpButton';
import styles from './ProductDetail.module.css';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '@/components/CartContext';
import Link from 'next/link';
import { getProductById } from 'data/product';

export default function ProductDetail() {
  const params = useParams();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [specificationsOpen, setSpecificationsOpen] = useState(false);
  const [fabricCareOpen, setFabricCareOpen] = useState(false);
  const { updateCartCount } = useCart();

  // Get product from data/products.ts
  const product = getProductById(Number(params.id));

  if (!product) {
    return notFound();
  }

  const handleAddToCart = () => {
    // Get existing cart from localStorage
    const existingCartJSON = localStorage.getItem('shoppingCart');
    const existingCart = existingCartJSON ? JSON.parse(existingCartJSON) : [];
    
    // Create cart item
    const cartItem = {
      id: product.id,
      name: product.brand,
      price: product.price,
      image: product.image,
      size: selectedSize,
      quantity: quantity
    };
    
    // Check if item exists
    const existingItemIndex = existingCart.findIndex(
      (item: any) => item.id === product.id && item.size === selectedSize
    );

    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }
    
    // Update localStorage
    localStorage.setItem('shoppingCart', JSON.stringify(existingCart));
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Update cart count
    const newTotalQuantity = existingCart.reduce((total: number, item: any) => {
      return total + (item.quantity || 1);
    }, 0);
    
    updateCartCount(newTotalQuantity);
  };

  const handleCustomizeTrouser = () => {
    // Your custom trouser logic
  };

  const handleNotifyMe = () => {
    alert('You will be notified when this product is available');
  };

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
              fill
              className={styles.image}
              priority
            />
          </div>
          
          {/* Right side - Product info */}
          <div className={styles.productInfo}>
            <div className={styles.ratingContainer}>
              <div className={styles.rating}>
                {Array(product.rating).fill(0).map((_, i) => (
                  <span key={i} className={styles.star}>★</span>
                ))}
                <span className={styles.reviewCount}>({product.reviewCount} reviews)</span>
              </div>
              <h1 className={styles.brand}>{product.brand}</h1>
              <h2 className={styles.name}>{product.name}</h2>
              <div className={styles.price}>{product.price}</div>
            </div>
            
            {/* Action buttons */}
            <div className={styles.actions}>
              <button className={styles.addToCartButton} onClick={handleAddToCart}>
                ADD TO CART
              </button>
              <Link href="/customsuit">
                <button className={styles.customizeButton}>
                  CUSTOMIZE SUIT
                </button>
              </Link>
              <Link href="/customtrouser">
                <button className={styles.customizeButton} onClick={handleCustomizeTrouser}>
                  CUSTOMIZE TROUSER
                </button>
              </Link>
            </div>
            
            {!product.availability && (
              <div className={styles.availabilityContainer}>
                <div className={styles.soldOut}>SOLD OUT</div>
                <button className={styles.notifyButton} onClick={handleNotifyMe}>
                  Notify me when available
                </button>
              </div>
            )}
            
            <div className={styles.description}>
              {product.description}
            </div>
            
            <div className={styles.accordionSection}>
              <div className={styles.accordionHeader} onClick={() => setSpecificationsOpen(!specificationsOpen)}>
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
              <div className={styles.accordionHeader} onClick={() => setFabricCareOpen(!fabricCareOpen)}>
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