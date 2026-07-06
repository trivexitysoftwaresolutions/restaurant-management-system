"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { MenuItem } from "@/lib/data";

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  isDrawerOpen: boolean;
  addToCart: (menuItem: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  setIsDrawerOpen: (isOpen: boolean) => void;
  totalItems: number;
  totalPrice: number;
  // Placed Orders (Running Tab)
  placedOrders: CartItem[];
  isMyOrdersOpen: boolean;
  setIsMyOrdersOpen: (isOpen: boolean) => void;
  placeOrder: () => void;
  removePlacedOrder: (itemId: string) => void;
  placedTotalItems: number;
  placedTotalPrice: number;
  showSuccessToast: boolean;
  setShowSuccessToast: (show: boolean) => void;
  orderToken: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [placedOrders, setPlacedOrders] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMyOrdersOpen, setIsMyOrdersOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [orderToken, setOrderToken] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from local storage
  useEffect(() => {
    const stored = localStorage.getItem("restro_cart");
    if (stored) {
      try {
        setCart(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse cart");
      }
    }
    const storedPlaced = localStorage.getItem("restro_placed_orders");
    if (storedPlaced) {
      try {
        setPlacedOrders(JSON.parse(storedPlaced));
      } catch (e) {
        console.error("Failed to parse placed orders");
      }
    }
    const storedToken = localStorage.getItem("restro_order_token");
    if (storedToken) {
      setOrderToken(storedToken);
    }
    setIsInitialized(true);
  }, []);

  // Save to local storage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("restro_cart", JSON.stringify(cart));
      localStorage.setItem("restro_placed_orders", JSON.stringify(placedOrders));
      if (orderToken) {
        localStorage.setItem("restro_order_token", orderToken);
      } else {
        localStorage.removeItem("restro_order_token");
      }
    }
  }, [cart, placedOrders, orderToken, isInitialized]);

  const addToCart = (menuItem: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.menuItem.id === menuItem.id);
      if (existing) {
        return prev.map((item) =>
          item.menuItem.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { menuItem, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.menuItem.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.menuItem.id === itemId) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: Math.max(0, newQty) };
        }
        return item;
      }).filter((item) => item.quantity > 0);
    });
  };

  const clearCart = () => setCart([]);

  const placeOrder = () => {
    if (cart.length === 0) return;
    
    setPlacedOrders((prev) => {
      const newOrders = [...prev];
      cart.forEach((cartItem) => {
        const existing = newOrders.find((item) => item.menuItem.id === cartItem.menuItem.id);
        if (existing) {
          existing.quantity += cartItem.quantity;
        } else {
          newOrders.push({ ...cartItem });
        }
      });
      return newOrders;
    });
    
    // Generate order token if this is the first time placing an order
    if (!orderToken) {
      const generatedToken = `#${Math.floor(100 + Math.random() * 900)}`;
      setOrderToken(generatedToken);
    }
    
    setCart([]); // Empty the cart
    setIsDrawerOpen(false); // Close cart drawer
    setShowSuccessToast(true); // Show success message
    
    // Auto hide toast after 4 seconds
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 4000);
  };

  const removePlacedOrder = (itemId: string) => {
    setPlacedOrders((prev) => prev.filter((item) => item.menuItem.id !== itemId));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);

  const placedTotalItems = placedOrders.reduce((sum, item) => sum + item.quantity, 0);
  const placedTotalPrice = placedOrders.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isDrawerOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        setIsDrawerOpen,
        totalItems,
        totalPrice,
        placedOrders,
        isMyOrdersOpen,
        setIsMyOrdersOpen,
        placeOrder,
        removePlacedOrder,
        placedTotalItems,
        placedTotalPrice,
        showSuccessToast,
        setShowSuccessToast,
        orderToken,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
