import React, { createContext, useContext, useState } from "react";

export type CartContextType = {
  cart: any[];
  addToCart: (cartItem: any) => void;
  removeFromCart: (id: string) => void;
  totalPrice: number;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

function ContextProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any[]>([]);

  function addToCart(cartItem: any) {
    setCart((prevCart) => [...prevCart, cartItem]);
  }

  function removeFromCart(id: string) {
    setCart((prevCart) => prevCart.filter((item: { unique_id: string }) => item.unique_id !== id));
  }

  // Calculate the total price
  const totalPrice = cart.reduce(
    (acc, item: { current_price: [any] }) => acc + item.current_price[0].GBP[0],
    0
  );

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, totalPrice, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);

  if (context === undefined)
    throw new Error("Cart context was used outside cart Context provider");

  return context;
}

export { useCart, ContextProvider };
