import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { cart, total } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);

  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-500 dark:from-blue-900 dark:to-blue-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold tracking-wide">
          🛍️ Mock E-Commerce Cart
        </h1>

        <div className="hidden md:flex items-center space-x-6 font-medium">
          <span className="flex items-center space-x-1">
            <span className="font-semibold">Items:</span>
            <span>{count}</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="font-semibold">Total:</span>
            <span>${total.toFixed(2)}</span>
          </span>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-blue-600 dark:bg-blue-800 px-6 py-3 border-t border-blue-400 space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold">Items:</span>
            <span>{count}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      )}
    </nav>
  );
}
