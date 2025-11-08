import cartItem from "../models/cartItem.js";

export const checkout = async (req, res) => {
  try {
    const { userId, name, email } = req.body;

    if (!userId || !name || !email) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    const items = await cartItem.find({ userId });
    if (!items.length) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

    await cartItem.deleteMany({ userId });

    return res.json({
      success: true,
      message: "Checkout successful",
      receipt: { name, email, total, timeStamp: new Date() },
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
