"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface Product {
  id: number;
  name: string;
  images: { image: string }[];
  [key: string]: any;
}

interface CartItem {
  item: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  changeQuantity: (productId: number, newQuantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  // ✅ Start empty (important for SSR)
  const [cart, setCart] = useState<CartItem[]>([]);

  // ✅ Load from localStorage AFTER mount
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      try {
        setCart(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to parse cart:", error);
      }
    }
  }, []);

  // ✅ Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((c) => c.item.id === product.id);
      if (existing) {
        return prevCart.map((c) =>
          c.item.id === product.id
            ? { ...c, quantity: c.quantity + 1 }
            : c
        );
      }
      return [...prevCart, { item: product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) =>
      prevCart.filter((c) => c.item.id !== productId)
    );
  };

  const changeQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) return removeFromCart(productId);
    setCart((prevCart) =>
      prevCart.map((c) =>
        c.item.id === productId
          ? { ...c, quantity: newQuantity }
          : c
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, changeQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};