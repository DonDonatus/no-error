// components/OrderHistoryContext.js
'use client';
import { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const OrderHistoryContext = createContext();

// Sample initial orders
const initialOrders = [
  {
    id: 'ABCD1294',
    date: '19/05/2023',
    status: 'In progress',
    product: {
      name: 'Army black suit',
      size: 'EU 52',
      description: 'Suit for Portuguese wedding',
      image: '/images/black-suit.jpg',
      materials: ['Wool', 'Polyester'],
      care: ['Dry clean only', 'Iron on low heat'],
      delivery: {
        tracking: 'DHL4587236598',
        estimatedDelivery: '26/05/2023',
        progress: 65
      }
    }
  },
  {
    id: 'ABCD1295', // Changed to be unique
    date: '19/05/2023',
    status: 'Completed',
    product: {
      name: 'Army black suit',
      size: 'EU 52',
      description: 'Suit for Portuguese wedding',
      image: '/images/black-suit.jpg',
      materials: ['Wool', 'Polyester'],
      care: ['Dry clean only', 'Iron on low heat'],
      delivery: {
        tracking: 'DHL3387236598',
        actualDelivery: '21/05/2023'
      }
    }
  }
];

// Generate a unique ID for new orders
const generateUniqueId = () => {
  return `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

// Create the provider component
export function OrderHistoryProvider({ children }) {
  // Initialize state with orders from local storage or default orders
  const [orders, setOrders] = useState([]);
  
  // Load orders from localStorage when component mounts
  useEffect(() => {
    try {
      const storedOrders = localStorage.getItem('orderHistory');
      console.log("Loading orders from storage:", storedOrders);
      
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      } else {
        // Set default orders if none in localStorage
        setOrders(initialOrders);
        localStorage.setItem('orderHistory', JSON.stringify(initialOrders));
      }
    } catch (error) {
      console.error("Error loading orders:", error);
      setOrders(initialOrders);
    }
  }, []);
  
  // Monitor localStorage changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'orderHistory') {
        try {
          const storedOrders = JSON.parse(e.newValue);
          console.log("Storage changed externally:", storedOrders);
          setOrders(storedOrders);
        } catch (error) {
          console.error("Error handling storage change:", error);
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Add a new order
  const addOrder = (newOrder) => {
    console.log("Adding order:", newOrder);
    
    // Ensure the order has a unique ID
    if (!newOrder.id) {
      newOrder.id = generateUniqueId();
    }
    
    // Ensure the order has a date
    if (!newOrder.date) {
      newOrder.date = new Date().toLocaleDateString('en-GB');
    }
    
    // Ensure the order has a status
    if (!newOrder.status) {
      newOrder.status = 'In progress';
    }
    
    setOrders(prevOrders => {
      const updatedOrders = [...prevOrders, newOrder];
      console.log("Updated orders:", updatedOrders);
      
      // Save to localStorage
      try {
        localStorage.setItem('orderHistory', JSON.stringify(updatedOrders));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
      
      return updatedOrders;
    });
  };
  
  // Update an existing order
  const updateOrder = (orderId, updatedOrder) => {
    setOrders(prevOrders => {
      const updatedOrders = prevOrders.map(order => 
        order.id === orderId ? { ...order, ...updatedOrder } : order
      );
      
      // Save to localStorage
      try {
        localStorage.setItem('orderHistory', JSON.stringify(updatedOrders));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
      
      return updatedOrders;
    });
  };
  
  // Function to clear orders (useful for testing)
  const clearOrders = () => {
    setOrders([]);
    localStorage.removeItem('orderHistory');
  };

  return (
    <OrderHistoryContext.Provider value={{ 
      orders, 
      addOrder,
      updateOrder,
      clearOrders,
      generateUniqueId
    }}>
      {children}
    </OrderHistoryContext.Provider>
  );
}

// Custom hook to use the order history context
export function useOrderHistory() {
  const context = useContext(OrderHistoryContext);
  if (!context) {
    throw new Error('useOrderHistory must be used within an OrderHistoryProvider');
  }
  return context;
}