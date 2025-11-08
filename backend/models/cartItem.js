import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  name: String,
  price: Number,
  qty: { type: Number, default: 1, min: 1 },
  image: String,
});

export default mongoose.model("CartItem", cartItemSchema);
