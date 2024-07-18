import { ShopContextType, ProductType, HistoryType } from "@/types/all.type";
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext<ShopContextType | null>(null);

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<ProductType[]>([]);
  const [saved, setSaved] = useState<ProductType[]>([]);
  const [history, setHistory] = useState<HistoryType[]>([]);

  const addToCart = (cartItem: ProductType) => {
    setCart((prevCart) => [...prevCart, { ...cartItem, count: 1 }]);
  }

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item: ProductType) => item.unique_id !== id));
  }

  // Calculate the total price
  const totalCartPrice = cart.reduce(
    (acc, item: ProductType) => (
      acc + (Number(item.current_price[0].NGN[0]) * Number(item?.count)
      )
    ),
    0
  );

  const clearCart = () => {
    setCart([]);
  }

  const increaseItemCount = (id: string) => {
    const modifiedCart = cart.map(item => {
      if (item.unique_id === id) {
        return { ...item, count: Number(item.count) + 1 }
      } else {
        return item
      }
    })
    setCart(modifiedCart)
  }
  const decreaseItemCount = (id: string) => {
    const modifiedCart = cart.map(item => {
      if (item.unique_id === id) {
        return { ...item, count: Number(item.count) - 1 }
      } else {
        return item
      }
    })
    setCart(modifiedCart)
  }

  const addToSaved = (cartItem: ProductType) => {
    setSaved((prevSaved) => [...prevSaved, cartItem]);
  }
  const removeFromSaved = (id: string) => {
    setSaved((prevSaved) => prevSaved.filter((item: ProductType) => item.unique_id !== id));
  }
  const addToHistory = (history: HistoryType) => {
    setHistory((prevHistory) => [...prevHistory, history]);
  }
  const removeFromHistory = (timestamp: number) => {
    setHistory((prevHistory) => prevHistory.filter((item: HistoryType) => item.timestamp !== timestamp));
  }


  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        totalCartPrice,
        clearCart,
        decreaseItemCount,
        increaseItemCount,
        addToSaved,
        removeFromSaved,
        addToHistory,
        removeFromHistory,
        saved,
        history
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

const useShop = () => {
  const context = useContext(CartContext);

  if (context === undefined)
    throw new Error("Shop context was used outside cart Context provider");

  return context;
}

export { useShop, ContextProvider };
