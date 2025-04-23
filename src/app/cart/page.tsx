"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './ShoppingCart.module.css';
import { useCart } from '@/components/CartContext';
import Header from '@/components/Header';
import HelpButton from '@/components/HelpButton';
import Chatbot from '@/components/Chatbot';
import ChatBotWidget from '@/components/ChatBotWidget';

// Types for our cart items
interface CartItem {
  id: number;
  name: string;
  price: string | number;
  image: string;
  size: string;
  quantity: number;
}

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { updateCart } = useCart();
  const router = useRouter();

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem('shoppingCart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
    setLoading(false);
  }, []);

  // Update context and localStorage whenever cart items change
  useEffect(() => {
    if (!loading && cartItems) {
      // This will update both localStorage and the header cart count
      updateCart(cartItems);
    }
  }, [cartItems, loading, updateCart]);

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => {
    // Convert price to string first, then extract numeric value
    const priceString = typeof item.price === 'string' ? item.price : String(item.price);
    const priceValue = parseFloat(priceString.replace(/[^0-9.]/g, ''));
    return total + (priceValue * item.quantity);
  }, 0);

  // Update quantity of an item
  const updateQuantity = (id: number, size: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        (item.id === id && item.size === size) ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove an item from the cart
  const removeItem = (id: number, size: string) => {
    setCartItems(prevItems => prevItems.filter(item => !(item.id === id && item.size === size)));
  };

  // Function to handle going back to the previous page
  const handleContinueShopping = () => {
    router.back();
  };

  if (loading) {
    return <div className={styles.loading}>Loading your cart...</div>;
  }

  return (
  <>
    <Header />
    <div className={styles.container}>
      <h1 className={styles.title}>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <p>Your shopping cart is empty.</p>
          <button 
            onClick={handleContinueShopping} 
            className={styles.empty}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className={styles.cartTable}>
            <div className={styles.tableHeader}>
              <div className={styles.productHeader}>Product</div>
              <div className={styles.priceHeader}>Price</div>
              <div className={styles.quantityHeader}>Quantity</div>
              <div className={styles.totalHeader}>Total</div>
            </div>

            {cartItems.map((item) => {
              // Convert price to string first, then extract numeric value
              const priceString = typeof item.price === 'string' ? item.price : String(item.price);
              const priceValue = parseFloat(priceString.replace(/[^0-9.]/g, ''));
              const total = priceValue * item.quantity;
              
              return (
                <div key={`${item.id}-${item.size}`} className={styles.cartItem}>
                  <div className={styles.product}>
                    <div className={styles.productImage}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        objectFit="cover"
                      />
                    </div>
                    <div className={styles.productInfo}>
                      <h3>{item.name}</h3>
                      <p>Size: {item.size}</p>
                    </div>
                  </div>
                  
                  <div className={styles.price}>{item.price}</div>
                  
                  <div className={styles.quantity}>
                    <div className={styles.quantityControls}>
                      <button 
                        className={styles.quantityButton}
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                      >
                        −
                      </button>
                      <input
                        type="text"
                        value={item.quantity}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value)) {
                            updateQuantity(item.id, item.size, value);
                          }
                        }}
                        className={styles.quantityInput}
                      />
                      <button 
                        className={styles.quantityButton}
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button 
                      className={styles.removeButton}
                      onClick={() => removeItem(item.id, item.size)}
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div className={styles.total}>
                    GHS {total.toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.cartSummary}>
            <div className={styles.subtotal}>
              <span>Subtotal:</span>
              <span>GHS {subtotal.toFixed(2)}</span>
            </div>
            <p className={styles.taxNote}>Tax and shipping calculated at checkout</p>
            
            <div className={styles.checkoutOptions}>
              <Link href="/checkout">
              <button className={styles.checkoutButton}>CHECK OUT</button>
              </Link>
              
              {/* Changed from Link to button with onClick handler */}
              <button 
                onClick={handleContinueShopping}
                className={styles.continueShoppingLink}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </>
      )}
    </div>
   
    <ChatBotWidget />
  </>
  );
}