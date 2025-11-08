import { useEffect, useState, useContext } from "react";
import api from "../api";
import { CartContext } from "../context/CartContext";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await api.get("/products");
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map((p) => (
        <div
          key={p.id}
          className="border rounded-xl p-4 shadow-bg-white flex flex-col items-center"
        >
          <img
            src={p.image}
            alt={p.title}
            className="h-32 object-contain mb-2"
          />
          <h3 className="font-medium text-center">{p.title}</h3>
          <p className="text-gray-700 mb-2">${p.price}</p>
          <button
            onClick={() => addToCart(p.id, 1)}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
