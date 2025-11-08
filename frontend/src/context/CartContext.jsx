import { createContext, useState, useEffect } from "react";
import api from "../api";
import { getOrCreateUserId } from "../utils/user";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const userId = getOrCreateUserId();

  const fetchCart = async () => {
    try {
      const { data } = await api.get(`/cart?userId=${userId}`);
      setCart(data.items);
      setTotal(data.total);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (productId, qty = 1) => {
    await api.post("/cart", { userId, productId, qty });
    fetchCart();
  };

  const removeFromCart = async (id) => {
    await api.delete(`/cart/${id}`, { data: { userId } });
    fetchCart();
  };

  const clearCart = async (formData) => {
    try {
      const { data } = await api.post("/checkout", { userId, ...formData });
      await fetchCart();
      return data;
    } catch (error) {
      console.error("Checkout failed:", error);
      return { success: false, message: "Checkout failed" };
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, total, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
