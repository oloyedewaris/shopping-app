import React, { createContext, useContext, useState } from "react";

export type CartContextType = {
  cart: any[];
  addToCart: (cartItem: any) => void;
  removeFromCart: (id: string) => void;
  totalPrice: number;
  clearCart: () => void;
  decreaseCount: (id: string) => void;
  increaseCount: (id: string) => void;
};

const CartContext = createContext<CartContextType | null>(null);

function ContextProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any[]>([]);

  function addToCart(cartItem: any) {
    setCart((prevCart) => [...prevCart, { ...cartItem, count: 1 }]);
  }

  function removeFromCart(id: string) {
    setCart((prevCart) => prevCart.filter((item: { unique_id: string }) => item.unique_id !== id));
  }

  // Calculate the total price
  const totalPrice = cart.reduce(
    (acc, item: { current_price: [any], count: number }) => acc + (Number(item.current_price[0].NGN[0]) * Number(item?.count)),
    0
  );

  function clearCart() {
    setCart([]);
  }

  const increaseCount = (id: string) => {
    const modifiedCart = cart.map(item => {
      if (item.unique_id === id) {
        return { ...item, count: Number(item.count) + 1 }
      } else {
        return item
      }
    })
    setCart(modifiedCart)
  }
  const decreaseCount = (id: string) => {
    const modifiedCart = cart.map(item => {
      if (item.unique_id === id) {
        return { ...item, count: Number(item.count) - 1 }
      } else {
        return item
      }
    })
    setCart(modifiedCart)
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, totalPrice, clearCart, decreaseCount, increaseCount }}
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
