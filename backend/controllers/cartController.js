import cartItem from "../models/cartItem.js";
import axios from "axios";

export const getCart = async (req, res) => {
  try {
    const { userId } = req.query;
    const items = await cartItem.find({ userId });

    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    res.json({ items, total });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

export const addToCart = async (req, res) => {
  const { userId, productId, qty } = req.body;
  try {
    const { data } = await axios.get(
      `https://fakestoreapi.com/products/${productId}`
    );
    let existing = await cartItem.findOne({
      userId,
      productId,
    });
    if (existing) existing.qty += qty;
    else
      existing = new cartItem({
        userId,
        productId,
        name: data.title,
        price: data.price,
        qty,
      });
    await existing.save();
    res.json(existing);
  } catch (error) {
    res.status(500).json({ message: "failed to add to cart" });
  }
};

export const removeFromCart = async (req, res) => {
  const { userId } = req.body;
  await cartItem.findOneAndDelete({ userId, _id: req.params.id });
  res.json({ message: "Item removed from cart" });
};

export const checkout = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: "Missing userId" });

    const cartItems = await cartItem.find({ userId });
    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    await cartItem.deleteMany({ userId });

    res.status(200).json({ message: "Checkout successful" });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
