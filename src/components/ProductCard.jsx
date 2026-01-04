import { memo } from "react";
import { useCart } from "../context/CartContext";


const ProductCard = memo(({ product }) => {
  const { addToCart } = useCart();
  const isOutOfStock = product.stock === 0;

  return (
    <div
      className={`p-4 rounded-lg shadow border flex flex-col justify-between h-full ${
        isOutOfStock ? "bg-gray-100 opacity-75" : "bg-white"
      }`}
    >
      <div>
        <h3 className="font-bold text-lg">{product.title}</h3>
        <p className="text-gray-500 text-sm mb-2">{product.category}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-green-600 font-bold">₹{product.price}</span>
          <span
            className={`text-xs font-semibold px-2 py-1 rounded ${
              isOutOfStock
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {isOutOfStock ? "Out of Stock" : `Stock: ${product.stock}`}
          </span>
        </div>
      </div>
      <button
        disabled={isOutOfStock}
        onClick={() => addToCart(product)}
        className={`w-full py-2 rounded font-medium transition-colors ${
          isOutOfStock
            ? "bg-gray-300 cursor-not-allowed text-gray-500"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {isOutOfStock ? "Unavailable" : "Add to Cart"}
      </button>
    </div>
  );
});

export default ProductCard;
