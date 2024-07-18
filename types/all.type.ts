export type ProductType = {
  unique_id: string;
  name: string;
  current_price: [{ NGN: [number] }];
  description: string;
  photos: [{ url: string }];
  count?: number;
  categories: [{ name: string }];
};

export type CategoryType = {
  title: string;
  products: ProductType[];
};

export type HistoryType = {
  address: string;
  time: Date;
  timestamp: number;
  totalAmount: number;
  deliveryFee: number;
  contact1: string;
  contact2: string;
  pickup: string;
  cart: ProductType[];
};

export interface ShopContextType {
  cart: ProductType[];
  addToCart: (cartItem: ProductType) => void;
  removeFromCart: (id: string) => void;
  totalCartPrice: number;
  clearCart: () => void;
  decreaseItemCount: (id: string) => void;
  increaseItemCount: (id: string) => void;
  addToSaved: (cartItem: ProductType) => void;
  removeFromSaved: (id: string) => void;
  addToHistory: (cartItem: HistoryType) => void;
  removeFromHistory: (timestamp: number) => void;
  saved: ProductType[];
  history: HistoryType[];
}

export type HomeNavigationList = {
  Dashboard: undefined;
  Product: { product: ProductType };
  History: undefined;
  Saved: undefined;
};

export type BottomNavigationList = {
  Products: undefined;
  Cart: undefined;
  Checkout: undefined;
};
