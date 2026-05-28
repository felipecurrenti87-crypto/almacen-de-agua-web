"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Product } from "@/data/products";

export type DeliveryMode = "tienda" | "reparto";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  deliveryMode: DeliveryMode;
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; product: Product }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
  | { type: "SET_DELIVERY_MODE"; mode: DeliveryMode }
  | { type: "TOGGLE_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "CLEAR_CART" }
  | { type: "HYDRATE"; items: CartItem[]; deliveryMode: DeliveryMode };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (i) => i.product.id === action.product.id
      );
      if (existing) {
        return {
          ...state,
          isOpen: true,
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        ...state,
        isOpen: true,
        items: [...state.items, { product: action.product, quantity: 1 }],
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.product.id !== action.productId),
      };
    case "UPDATE_QUANTITY": {
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.product.id !== action.productId),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.productId
            ? { ...i, quantity: action.quantity }
            : i
        ),
      };
    }
    case "SET_DELIVERY_MODE":
      return { ...state, deliveryMode: action.mode };
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };
    case "OPEN_CART":
      return { ...state, isOpen: true };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    case "CLEAR_CART":
      return { ...state, items: [], isOpen: false };
    case "HYDRATE":
      return {
        ...state,
        items: action.items,
        deliveryMode: action.deliveryMode,
      };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  deliveryMode: DeliveryMode;
  isOpen: boolean;
  totalItems: number;
  totalPrice: number;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  setDeliveryMode: (mode: DeliveryMode) => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  clearCart: () => void;
  getItemPrice: (product: Product) => number;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "almacen-agua-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    deliveryMode: "reparto",
    isOpen: false,
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({
          type: "HYDRATE",
          items: parsed.items || [],
          deliveryMode: parsed.deliveryMode || "reparto",
        });
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          items: state.items,
          deliveryMode: state.deliveryMode,
        })
      );
    } catch {
      /* ignore */
    }
  }, [state.items, state.deliveryMode]);

  const getItemPrice = useCallback(
    (product: Product) =>
      state.deliveryMode === "tienda"
        ? product.precio_tienda
        : product.precio_reparto,
    [state.deliveryMode]
  );

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, i) => sum + getItemPrice(i.product) * i.quantity,
    0
  );

  const value: CartContextValue = {
    items: state.items,
    deliveryMode: state.deliveryMode,
    isOpen: state.isOpen,
    totalItems,
    totalPrice,
    addItem: (product) => dispatch({ type: "ADD_ITEM", product }),
    removeItem: (productId) => dispatch({ type: "REMOVE_ITEM", productId }),
    updateQuantity: (productId, quantity) =>
      dispatch({ type: "UPDATE_QUANTITY", productId, quantity }),
    setDeliveryMode: (mode) => dispatch({ type: "SET_DELIVERY_MODE", mode }),
    toggleCart: () => dispatch({ type: "TOGGLE_CART" }),
    openCart: () => dispatch({ type: "OPEN_CART" }),
    closeCart: () => dispatch({ type: "CLOSE_CART" }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
    getItemPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
