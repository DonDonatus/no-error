// pages/order-confirmation.tsx
'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './OrderConfirmation.module.css';
import Header from '@/components/Header';
import HelpButton from '@/components/HelpButton';
import { useCart } from '@/components/CartContext';

export default function OrderConfirmation() {
  const router = useRouter();
  const { updateCart } = useCart();
  const [orderNumber, setOrderNumber] = useState('');
 
  useEffect(() => {
	// Generate random order number
	const randomOrderNum = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
	setOrderNumber(randomOrderNum);
    
	// Clear cart in context
	updateCart([]);
    
    
  }, []);
 
  const handleContinueShopping = () => {
	router.push('/homepage');
  };

  return (
	<>
  	<Header />
  	<div className={styles.container}>
    	<Head>
      	<title>Order Confirmation</title>
      	<meta name="description" content="Order Confirmation" />
    	</Head>
   	 
    	<div className={styles.confirmationCard}>
      	<div className={styles.successIcon}>
        	<span>✓</span>
      	</div>
     	 
      	<h1 className={styles.title}>Thank You for Your Order!</h1>
     	 
      	<div className={styles.orderDetails}>
        	<p className={styles.orderNumberLabel}>Order Number:</p>
        	<p className={styles.orderNumber}>{orderNumber}</p>
      	</div>
     	 
      	<p className={styles.message}>
        	We've received your order and are getting it ready. A confirmation email has been sent to your email address.
      	</p>
     	 
      	<div className={styles.infoBox}>
        	<div className={styles.infoSection}>
          	<h3>Estimated Delivery</h3>
          	<p>
            	{new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
              	weekday: 'long',
              	month: 'long',
              	day: 'numeric'
            	})}
          	</p>
        	</div>
       	 
        	<div className={styles.infoSection}>
          	<h3>Shipping Method</h3>
          	<p>Standard Shipping</p>
        	</div>
       	 
        	<div className={styles.infoSection}>
          	<h3>Payment Method</h3>
          	<p>Credit Card</p>
        	</div>
      	</div>
     	 
      	<div className={styles.tracking}>
        	<p>You will receive shipping and tracking information once your order has been processed.</p>
      	</div>
     	 
      	<div className={styles.actions}>
        	<button onClick={handleContinueShopping} className={styles.continueButton}>
          	Continue Shopping
        	</button>
       	 
        	<button onClick={() => router.push('/history')} className={styles.viewOrderButton}>
          	View Order Status
        	</button>
      	</div>
     	 
      	<div className={styles.customerSupport}>
        	<p>
          	If you have any questions about your order, please contact our customer support team at <a href="mailto:uomomiglioresupport@gmail.com">uomomiglioresupport@gmail.com</a>
        	</p>
      	</div>
    	</div>
  	</div>
  	<HelpButton />
	</>
  );
}
