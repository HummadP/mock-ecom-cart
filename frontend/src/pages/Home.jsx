import ProductGrid from "../components/ProductGrid";
import Cart from "../components/Cart";

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row justify-center gap-8 p-6 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="flex-1">
        <ProductGrid />
      </div>

      <div className="flex justify-center lg:justify-end">
        <Cart />
      </div>
    </div>
  );
}
