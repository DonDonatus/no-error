// components/CartContext.tsx
'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: string | number;
  image: string;
  size: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  updateCart: (newCart: CartItem[]) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number, size: string) => void;
  clearCart: () => void;
  showAddedToast: boolean;
  updateCartCount: (count: number) => void;
  cartItems: CartItem[]; // Expose this for header cart count update

}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Initialize cart from localStorage on first render
  useEffect(() => {
    const storedCart = localStorage.getItem('shoppingCart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCart(parsedCart);
      
      // Calculate total items
      const count = parsedCart.reduce((total: number, item: CartItem) => total + item.quantity, 0);
      setCartCount(count);
    }
    setIsInitialized(true);
  }, []);
  
  // Update localStorage whenever cart changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('shoppingCart', JSON.stringify(cart));
      
      // Update cart count
      const count = cart.reduce((total, item) => total + item.quantity, 0);
      setCartCount(count);
    }
  }, [cart, isInitialized]);
  
  // Set the entire cart
  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);
  };
  
  // Add item to cart (or update quantity if it exists)
  const addToCart = (newItem: CartItem) => {
    setCart(prevCart => {
      // Check if item with same id and size exists
      const existingItemIndex = prevCart.findIndex(
        item => item.id === newItem.id && item.size === newItem.size
      );
      
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += newItem.quantity;
        return updatedCart;
      } else {
        // Item doesn't exist, add it
        return [...prevCart, newItem];
      }
    });
  };
  
  // Remove item from cart
  const removeFromCart = (id: number, size: string) => {
    setCart(prevCart => prevCart.filter(item => !(item.id === id && item.size === size)));
  };
  
  // Clear cart
  const clearCart = () => {
    setCart([]);
  };
  
  return (
    <CartContext.Provider value={{ 
      cart, 
      cartCount, 
      updateCart, 
      addToCart, 
      removeFromCart, 
      clearCart,
     showAddedToast: false, // Placeholder for toast state
      updateCartCount: setCartCount, // Expose this for header cart count update
      cartItems: cart // Expose this for header cart count update
     
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}