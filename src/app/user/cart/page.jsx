'use client';
import { useState } from 'react';

const initialCart = [
  {
    id: 'p1',
    name: 'Wireless Headphones',
    image: '/images/headphones.png',
    price: 150,
    quantity: 1,
    stock: 3,
  },
  {
    id: 'p2',
    name: 'Smart Watch',
    image: '/images/watch.png',
    price: 90,
    quantity: 2,
    stock: 1,
  },
];

export default function CartPage() {
  const [cart, setCart] = useState(initialCart);

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const purchase = () => {
    const hasInsufficientStock = cart.some((item) => item.quantity > item.stock);
    if (hasInsufficientStock) {
      alert('Purchase failed: One or more items exceed available stock.');
    } else {
      alert('Purchase successful!');
      setCart([]);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6 max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold mb-4">Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border rounded-md bg-gray-50">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
              <div className="flex-1 ml-4">
                <p className="font-medium">{item.name}</p>
                <p>Price: ${item.price}</p>
                <p>Total: ${item.price * item.quantity}</p>
                {item.quantity > item.stock && (
                  <p className="text-red-600">Not enough stock available</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="px-2 py-1 border rounded hover:bg-gray-200"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="px-2 py-1 border rounded hover:bg-gray-200"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="ml-4 text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="text-right font-semibold text-lg mt-4">
            Total: ${totalPrice}
          </div>
          <button
            onClick={purchase}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Purchase
          </button>
        </div>
      )}
    </div>
  );
}