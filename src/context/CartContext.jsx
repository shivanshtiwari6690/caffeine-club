import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Initialize cart from localStorage if available for persistence across refreshes
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('caffeine_club_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('caffeine_club_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn("Could not save cart to localStorage", e);
    }
  }, [cartItems]);

  // Add Item (handles multi-unit additions)
  const addToCart = (item, quantity = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { ...item, quantity }];
    });
  };

  // Remove Item
  const removeFromCart = (itemId) => {
    setCartItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  // Update Item Quantity
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, quantity: newQuantity } : i))
    );
  };

  // Clear Cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Drawer Toggles
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Demo Checkout Trigger
  const processDemoCheckout = (orderNotes = "") => {
    if (cartItems.length === 0) return;

    const fakeOrderNumber = `CC-${Math.floor(1000 + Math.random() * 9000)}`;
    const totalAmount = cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

    const orderReceipt = {
      orderId: fakeOrderNumber,
      items: [...cartItems],
      subtotal: totalAmount,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedPrepMinutes: 12,
      notes: orderNotes
    };

    setCheckoutData(orderReceipt);
    clearCart();
  };

  const closeCheckoutModal = () => {
    setCheckoutData(null);
  };

  // Computations
  const totalItemCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotal = cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItemCount,
        subtotal,
        processDemoCheckout,
        checkoutData,
        closeCheckoutModal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
