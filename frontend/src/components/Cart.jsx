import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import CheckoutModal from "./CheckoutModal";

export default function Cart() {
  const { cart, total, removeFromCart, clearCart } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = async (formData) => {
    const data = await clearCart(formData);
    return data;
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6 w-full max-w-[450px] min-w-[450px] mx-auto sticky top-4 overflow-y-auto max-h-[80vh] min-h-[300px] flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 border-b pb-2">
          🛍️ Your Cart
        </h2>

        {cart.length ? (
          cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-start border-b border-gray-200 dark:border-gray-700 py-3"
            >
              <div className="flex-1 pr-3">
                <h3 className="font-medium text-gray-800 dark:text-gray-100 text-base break-words">
                  {item.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  ${item.price} × {item.qty}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-all text-sm shrink-0"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10">
            Your cart is empty 🛒
          </p>
        )}
      </div>

      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Total:
          </h2>
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
            ${total.toFixed(2)}
          </span>
        </div>

        <button
          onClick={() => cart.length && setIsModalOpen(true)}
          disabled={!cart.length}
          className={`w-full mt-4 py-2 rounded-lg transition-all ${
            cart.length
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          Checkout
        </button>
      </div>

      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
