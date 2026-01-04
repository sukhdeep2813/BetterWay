import { useProducts } from "../context/ProductContext";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const { products } = useProducts();

  if (products.length === 0)
    return (
      <div className="text-center py-10 text-gray-500">No products found.</div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
