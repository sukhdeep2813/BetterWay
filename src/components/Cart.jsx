import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0)
    return <div className="bg-white p-6 shadow-md rounded">Cart is empty</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-fit sticky top-6">
      <h2 className="text-xl font-bold mb-4 border-b pb-2">
        Cart ({totalItems})
      </h2>
      <div className="flex flex-col gap-4 mb-4 max-h-[400px] overflow-y-auto">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div className="flex-1">
              <h4 className="font-semibold text-sm">{item.title}</h4>
              <p className="text-gray-500 text-xs">₹{item.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={item.quantity}
                min="1"
                max={item.stock}
                onChange={(e) =>
                  updateQuantity(item.id, Number(e.target.value))
                }
                className="w-12 border rounded p-1 text-center text-sm"
              />
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t pt-4">
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>₹{totalPrice.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
