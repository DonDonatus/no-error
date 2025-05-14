// pages/checkout.tsx
'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './Checkout.module.css';
import { useCart } from '@/components/CartContext';
import Header from '@/components/Header';
import HelpButton from '@/components/HelpButton';


// Types for our cart items (matching ShoppingCart)
interface CartItem {
  id: number;
  name: string;
  price: string | number;
  image: string;
  size: string;
  quantity: number;
}


export default function Checkout() {
  const [discountCode, setDiscountCode] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [shippingOption, setShippingOption] = useState('standard');
  const [checkoutStep, setCheckoutStep] = useState('shipping');
  const [contactInfo, setContactInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Ghana',
    phone: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [applyingDiscount, setApplyingDiscount] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
 
  const router = useRouter();
  const { cart } = useCart();


  // Load cart items from context and localStorage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem('shoppingCart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    } else if (cart) {
      setCartItems(cart);
    }
   
    // Get email from localStorage if available
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      setContactInfo(prev => ({ ...prev, email: savedEmail }));
    }
   
    setLoading(false);
  }, [cart]);


  // Calculate subtotal
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const priceString = typeof item.price === 'string' ? item.price : String(item.price);
      const priceValue = parseFloat(priceString.replace(/[^0-9.]/g, ''));
      return total + (priceValue * item.quantity);
    }, 0);
  };


  // Calculate shipping cost based on option
  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    if (subtotal === 0) return 0;
   
    switch (shippingOption) {
      case 'express':
        return 150;
      case 'standard':
        return 100;
      case 'free':
        return subtotal >= 500 ? 0 : 100; // Free for orders over 500 GHS
      default:
        return 100;
    }
  };


  // Calculate total
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = calculateShipping();
    return subtotal + shipping - discountAmount;
  };


  // Handle applying discount code
  const handleApplyDiscount = () => {
    setApplyingDiscount(true);
   
    // Simulate API call with timeout
    setTimeout(() => {
      // Example discount codes
      const validDiscounts = {
        'WELCOME10': 0.1,
        'BLACKFRIDAY': 0.2,
        'UOMO': 0.3
      };
     
      if (discountCode in validDiscounts) {
        const discountRate = validDiscounts[discountCode as keyof typeof validDiscounts];
       
        // If it's the free shipping code
        if (discountCode === 'UOMO') {
          setShippingOption('free');
          setDiscountApplied(true);
          setDiscountAmount(calculateShipping());
        } else {
          // Regular percentage-based discount
          setDiscountApplied(true);
          setDiscountAmount(calculateSubtotal() * discountRate);
        }
      } else if (discountCode.length > 0) {
        // Invalid code
        alert('Invalid discount code');
      }
     
      setApplyingDiscount(false);
    }, 800);
  };


  // Handle continuing to next step
  const handleContinue = () => {
    if (checkoutStep === 'shipping') {
      // Validate shipping info
      const requiredFields = ['email', 'firstName', 'lastName', 'address', 'city', 'postalCode', 'phone'];
      const missingFields = requiredFields.filter(field => !contactInfo[field as keyof typeof contactInfo]);
     
      if (missingFields.length > 0) {
        alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
        return;
      }
     
      // Save email for future use
      localStorage.setItem('userEmail', contactInfo.email);
     
      // Move to payment step
      setCheckoutStep('payment');
    } else if (checkoutStep === 'payment') {
      // Simulate payment processing
      alert('Order placed successfully!');
     
      // Clear cart and redirect to confirmation
      localStorage.removeItem('shoppingCart');
      router.push('/order');
    }
  };


  // Handle back to cart
  const handleBackToCart = () => {
    router.push('/cart');
  };


  // Handle back to shipping from payment
  const handleBackToShipping = () => {
    setCheckoutStep('shipping');
  };


  if (loading) {
    return <div className={styles.loading}>Loading checkout...</div>;
  }
 
  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <div className={styles.container}>
          <div className={styles.emptyCheckout}>
            <h1 className={styles.title}>Checkout</h1>
            <p>Your cart is empty. Please add items before proceeding to checkout.</p>
            <button onClick={() => router.push('/homepage')} className={styles.shopNowButton}>
              Shop Now
            </button>
          </div>
        </div>
        <HelpButton />
      </>
    );
  }
 
  return (
    <>
      <Header />
      <div className={styles.container}>
        <Head>
          <title>Checkout</title>
          <meta name="description" content="Checkout page" />
        </Head>
       
        <div className={styles.checkoutLayout}>
          {/* Left section - Payment and shipping */}
          <div className={styles.checkoutLeft}>
            <h1 className={styles.title}>Checkout</h1>
           
            {/* Checkout steps */}
            <div className={styles.steps}>
              <span className={checkoutStep === 'shipping' ? styles.activeStep : ''}>Information & Shipping</span>
              <span className={styles.arrow}>→</span>
              <span className={checkoutStep === 'payment' ? styles.activeStep : ''}>Payment</span>
              <span className={styles.arrow}>→</span>
              <span>Confirmation</span>
            </div>
           
            {checkoutStep === 'shipping' ? (
              <>
                {/* Contact info */}
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Contact Information</h2>
                 
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label htmlFor="email" className={styles.inputLabel}>Email *</label>
                      <input
                        type="email"
                        id="email"
                        placeholder="email@example.com"
                        className={styles.input}
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                        required
                      />
                    </div>
                   
                    <div className={styles.formGroup}>
                      <label htmlFor="phone" className={styles.inputLabel}>Phone *</label>
                      <input
                        type="tel"
                        id="phone"
                        placeholder="+233 00 000 0000"
                        className={styles.input}
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                 
                  <div className={styles.newsletterOption}>
                    <label className={styles.checkboxLabel}>
                      <input type="checkbox" className={styles.checkbox} />
                      <span>Email me with news and offers</span>
                    </label>
                  </div>
                </div>
               
                {/* Shipping address */}
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Shipping Address</h2>
                 
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label htmlFor="firstName" className={styles.inputLabel}>First Name *</label>
                      <input
                        type="text"
                        id="firstName"
                        className={styles.input}
                        value={contactInfo.firstName}
                        onChange={(e) => setContactInfo({...contactInfo, firstName: e.target.value})}
                        required
                      />
                    </div>
                   
                    <div className={styles.formGroup}>
                      <label htmlFor="lastName" className={styles.inputLabel}>Last Name *</label>
                      <input
                        type="text"
                        id="lastName"
                        className={styles.input}
                        value={contactInfo.lastName}
                        onChange={(e) => setContactInfo({...contactInfo, lastName: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                 
                  <div className={styles.formGroup}>
                    <label htmlFor="address" className={styles.inputLabel}>Address *</label>
                    <input
                      type="text"
                      id="address"
                      className={styles.input}
                      value={contactInfo.address}
                      onChange={(e) => setContactInfo({...contactInfo, address: e.target.value})}
                      required
                    />
                  </div>
                 
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label htmlFor="city" className={styles.inputLabel}>City *</label>
                      <input
                        type="text"
                        id="city"
                        className={styles.input}
                        value={contactInfo.city}
                        onChange={(e) => setContactInfo({...contactInfo, city: e.target.value})}
                        required
                      />
                    </div>
                   
                    <div className={styles.formGroup}>
                      <label htmlFor="state" className={styles.inputLabel}>State/Region</label>
                      <input
                        type="text"
                        id="state"
                        className={styles.input}
                        value={contactInfo.state}
                        onChange={(e) => setContactInfo({...contactInfo, state: e.target.value})}
                      />
                    </div>
                  </div>
                 
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label htmlFor="postalCode" className={styles.inputLabel}>Postal Code *</label>
                      <input
                        type="text"
                        id="postalCode"
                        className={styles.input}
                        value={contactInfo.postalCode}
                        onChange={(e) => setContactInfo({...contactInfo, postalCode: e.target.value})}
                        required
                      />
                    </div>
                   
                    <div className={styles.formGroup}>
                      <label htmlFor="country" className={styles.inputLabel}>Country *</label>
                      <select
                        id="country"
                        className={styles.select}
                        value={contactInfo.country}
                        onChange={(e) => setContactInfo({...contactInfo, country: e.target.value})}
                      >
                        <option value="Ghana">Ghana</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Kenya">Kenya</option>
                        <option value="South Africa">South Africa</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
               
                {/* Shipping options */}
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Shipping Method</h2>
                 
                  <div className={styles.shippingOptions}>
                    <label className={styles.shippingOption}>
                      <input
                        type="radio"
                        name="shipping"
                        value="standard"
                        checked={shippingOption === 'standard'}
                        onChange={() => setShippingOption('standard')}
                      />
                      <div className={styles.shippingOptionDetails}>
                        <div>
                          <span className={styles.shippingName}>Standard Shipping</span>
                          <span className={styles.shippingTime}>(5-7 business days)</span>
                        </div>
                        <span className={styles.shippingPrice}>USD 100</span>
                      </div>
                    </label>
                   
                    <label className={styles.shippingOption}>
                      <input
                        type="radio"
                        name="shipping"
                        value="express"
                        checked={shippingOption === 'express'}
                        onChange={() => setShippingOption('express')}
                      />
                      <div className={styles.shippingOptionDetails}>
                        <div>
                          <span className={styles.shippingName}>Express Shipping</span>
                          <span className={styles.shippingTime}>(2-3 business days)</span>
                        </div>
                        <span className={styles.shippingPrice}>USD 150</span>
                      </div>
                    </label>
                   
                    {calculateSubtotal() >= 500 && (
                      <label className={styles.shippingOption}>
                        <input
                          type="radio"
                          name="shipping"
                          value="free"
                          checked={shippingOption === 'free'}
                          onChange={() => setShippingOption('free')}
                        />
                        <div className={styles.shippingOptionDetails}>
                          <div>
                            <span className={styles.shippingName}>Free Shipping</span>
                            <span className={styles.shippingTime}>(7-10 business days)</span>
                          </div>
                          <span className={styles.shippingPrice}>USD 0</span>
                        </div>
                      </label>
                    )}
                  </div>
                </div>
              </>
            ) : (
              // Payment step
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Payment Method</h2>
               
                {/* Payment options */}
                <div className={styles.paymentOptions}>
                  <button
                    className={`${styles.paymentButton} ${paymentMethod === 'gpay' ? styles.activePayment : ''}`}
                    onClick={() => setPaymentMethod('gpay')}
                  >
                    <span className={styles.paymentIcon}>G</span> Pay
                  </button>
                  <button
                    className={`${styles.paymentButton} ${paymentMethod === 'paypal' ? styles.activePayment : ''}`}
                    onClick={() => setPaymentMethod('paypal')}
                  >
                    <span className={styles.paymentIcon}>P</span> Pay
                  </button>
                  <button
                    className={`${styles.paymentButton} ${paymentMethod === 'momo' ? styles.activePayment : ''}`}
                    onClick={() => setPaymentMethod('momo')}
                  >
                    <span className={styles.paymentIcon}>M</span> Mobile Money
                  </button>
                </div>
               
                {/* Divider */}
                <div className={styles.divider}>
                  <div className={styles.line}></div>
                  <span className={styles.orText}>OR</span>
                  <div className={styles.line}></div>
                </div>
               
                {/* Credit card form */}
                <div className={`${styles.cardForm} ${paymentMethod === 'creditCard' ? styles.activeCardForm : ''}`}>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="creditCard"
                      checked={paymentMethod === 'creditCard'}
                      onChange={() => setPaymentMethod('creditCard')}
                    />
                    <span>Credit / Debit Card</span>
                  </label>
                 
                  {paymentMethod === 'creditCard' && (
                    <div className={styles.creditCardFields}>
                      <div className={styles.formGroup}>
                        <label htmlFor="cardNumber" className={styles.inputLabel}>Card Number *</label>
                        <input
                          type="text"
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          className={styles.input}
                        />
                      </div>
                     
                      <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                          <label htmlFor="expiryDate" className={styles.inputLabel}>Expiry Date *</label>
                          <input
                            type="text"
                            id="expiryDate"
                            placeholder="MM/YY"
                            className={styles.input}
                          />
                        </div>
                       
                        <div className={styles.formGroup}>
                          <label htmlFor="cvv" className={styles.inputLabel}>CVV *</label>
                          <input
                            type="text"
                            id="cvv"
                            placeholder="123"
                            className={styles.input}
                          />
                        </div>
                      </div>
                     
                      <div className={styles.formGroup}>
                        <label htmlFor="nameOnCard" className={styles.inputLabel}>Name on Card *</label>
                        <input
                          type="text"
                          id="nameOnCard"
                          className={styles.input}
                        />
                      </div>
                    </div>
                  )}
                </div>
               
                <div className={styles.billingAddressCheck}>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" className={styles.checkbox} defaultChecked />
                    <span>Billing address same as shipping address</span>
                  </label>
                </div>
              </div>
            )}
            {/* Desktop Navigation Buttons - ALWAYS VISIBLE IN LEFT COLUMN */}
            <div className={styles.navigationButtons}>
              <button
                onClick={checkoutStep === 'shipping' ? handleBackToCart : handleBackToShipping}
                className={styles.backButton}
              >
                ← {checkoutStep === 'shipping' ? 'Back to Cart' : 'Back to Shipping'}
              </button>
             
              <button onClick={handleContinue} className={styles.continueButton}>
                {checkoutStep === 'shipping' ? 'Continue to Payment' : 'Place Order'}
              </button>
            </div>
          </div>


         
         
          {/* Right section - Order summary */}
          <div className={styles.checkoutRight}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>
           
            <div className={styles.orderItems}>
              {cartItems.map((item, index) => {
                const priceString = typeof item.price === 'string' ? item.price : String(item.price);
                const priceValue = parseFloat(priceString.replace(/[^0-9.]/g, ''));
               
                return (
                  <div key={`${item.id}-${item.size}-${index}`} className={styles.orderItem}>
                    <div className={styles.productImageContainer}>
                      <span className={styles.quantity}>{item.quantity}</span>
                      <div className={styles.imageWrapper}>
                        <Image
                          src={item.image || "/api/placeholder/80/100"}
                          alt={item.name}
                          width={80}
                          height={100}
                          className={styles.productImage}
                        />
                      </div>
                    </div>
                    <div className={styles.productInfo}>
                      <p className={styles.productName}>{item.name}</p>
                      <p className={styles.productSize}>Size: {item.size}</p>
                    </div>
                    <p className={styles.productPrice}>
                      USD {(priceValue * item.quantity).toFixed(2)}
                    </p>
                  </div>
                );
              })}
            </div>
           
            <div className={styles.discountRow}>
              <div className={styles.discountInputWrapper}>
                <input
                  type="text"
                  placeholder="Discount code"
                  className={styles.discountInput}
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  disabled={discountApplied || applyingDiscount}
                />
              </div>
              <button
                className={`${styles.applyButton} ${applyingDiscount ? styles.loading : ''} ${discountApplied ? styles.applied : ''}`}
                onClick={handleApplyDiscount}
                disabled={discountApplied || applyingDiscount || !discountCode}
              >
                {discountApplied ? 'Applied' : applyingDiscount ? '...' : 'Apply'}
              </button>
            </div>
           
            <div className={styles.summaryItems}>
              <div className={styles.summaryItem}>
                <span>Subtotal</span>
                <span>USD {calculateSubtotal().toFixed(2)}</span>
              </div>
             
              <div className={styles.summaryItem}>
                <span>Shipping</span>
                <span>USD {calculateShipping().toFixed(2)}</span>
              </div>
             
              {discountApplied && (
                <div className={styles.summaryItem}>
                  <span>Discount</span>
                  <span>-USD {discountAmount.toFixed(2)}</span>
                </div>
              )}
             
              <div className={styles.totalRow}>
                <span className={styles.totalText}>Total</span>
                <div className={styles.totalAmountWrapper}>
                  <span className={styles.currencyCode}>USD</span>
                  <span className={styles.totalAmount}>{calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
           
            {/* Order notes */}
            <div className={styles.orderNotes}>
              <label htmlFor="orderNotes" className={styles.notesLabel}>Order Notes (optional)</label>
              <textarea
                id="orderNotes"
                className={styles.notesTextarea}
                placeholder="Special instructions for delivery..."
              ></textarea>
            </div>
           
            {/* Security badges */}
            <div className={styles.securityBadges}>
              <div className={styles.securityBadge}>
                <span className={styles.securityIcon}>🔒</span>
                <span>Secure Checkout</span>
              </div>
              <div className={styles.securityBadge}>
                <span className={styles.securityIcon}>⚡</span>
                <span>Fast Delivery</span>
              </div>
              <div className={styles.securityBadge}>
                <span className={styles.securityIcon}>↩️</span>
                <span>Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
 
        {/* Navigation buttons - moved outside the main layout for mobile */}
        <div className={styles.mobileNavigationButtons}>
          <button
            onClick={checkoutStep === 'shipping' ? handleBackToCart : handleBackToShipping}
            className={styles.backButton}
          >
            ← {checkoutStep === 'shipping' ? 'Back to Cart' : 'Back to Shipping'}
          </button>
         
          <button onClick={handleContinue} className={styles.continueButton}>
            {checkoutStep === 'shipping' ? 'Continue to Payment' : 'Place Order'}
          </button>
        </div>
      </div>
      <HelpButton />
    </>
  );
}

