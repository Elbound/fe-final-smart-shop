'use client';
import { useEffect, useState } from 'react';
import { db } from '@/firebase';
import {
  collection,
  getDoc,
  doc,
  writeBatch,
  addDoc
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const mockCart = [
  { productId: 'rYEYgs5uTTBe4gcIXh18', quantity: 2 },
  { productId: 'siY3prUYStwMVvp4kssq', quantity: 1 }
];

export default function CartPage() {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const auth = getAuth();
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    const fetchProducts = async () => {
      const productDetails = await Promise.all(
        mockCart.map(async (item) => {
          const docRef = doc(db, 'Product', item.productId);
          const snap = await getDoc(docRef);
          return {
            id: item.productId,
            ...snap.data()
          };
        })
      );

      setProducts(productDetails);
      const initialQuantities = {};
      mockCart.forEach(item => {
        initialQuantities[item.productId] = item.quantity;
      });
      setQuantities(initialQuantities);
    };

    fetchProducts();
  }, []);

  const handleQuantityChange = (productId, value) => {
    const newQty = parseInt(value);
    if (isNaN(newQty)) return;

    if (newQty < 1) {
      // Remove product from cart
      const updatedProducts = products.filter(p => p.id !== productId);
      setProducts(updatedProducts);
      const updatedQuantities = { ...quantities };
      delete updatedQuantities[productId];
      setQuantities(updatedQuantities);
    } else {
      setQuantities({ ...quantities, [productId]: newQty });
    }
  };

  const handlePurchase = async () => {
    setError('');
    setSuccess('');

    if (!uid) {
      setError('You must be logged in to make a purchase.');
      return;
    }

    const batch = writeBatch(db);
    const items = [];
    const prices = [];
    const quantitiesOrdered = [];

    let totalPrice = 0;

    for (const product of products) {
      const docRef = doc(db, 'Product', product.id);
      const snap = await getDoc(docRef);
      const currentData = snap.data();
      const requestedQty = quantities[product.id];

      if (requestedQty > currentData.quantity) {
        setError(
          `❌ Not enough stock for "${product.name}". Available: ${currentData.quantity}, requested: ${requestedQty}`
        );
        return;
      }

      items.push(product.name);
      prices.push(product.price);
      quantitiesOrdered.push(requestedQty);

      totalPrice += product.price * requestedQty;

      batch.update(docRef, {
        quantity: currentData.quantity - requestedQty,
      });
  }

  await batch.commit();

  await addDoc(collection(db, 'User', uid, 'OrderHistory'), {
    items,
    price: prices,
    quantity: quantitiesOrdered,
    total: totalPrice,
    time: new Date().toLocaleString(), // Keep time as string
  });

  setSuccess('✅ Purchase successful! Check your Order History.');
  setProducts([]);
  setQuantities({});
};

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-semibold mb-4">🛒 Your Cart</h1>

      {products.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {products.map((product) => (
            <div key={product.id} className="border rounded p-4 bg-gray-50">
              <h2 className="font-medium text-lg">{product.name}</h2>
              <p className="text-sm text-gray-600 mb-1">{product.description}</p>
              <p className="text-sm">💰 Price: ${product.price}</p>
              <p className="text-sm">📦 In stock: {product.quantity}</p>
              <label className="block mt-2 text-sm">
                Quantity:
                <input
                  type="number"
                  className="ml-2 border p-1 w-20"
                  value={quantities[product.id] || 1}
                  onChange={(e) =>
                    handleQuantityChange(product.id, e.target.value)
                  }
                />
              </label>
            </div>
          ))}

          <button
            onClick={handlePurchase}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Purchase
          </button>

          {error && <p className="text-red-600 mt-2">{error}</p>}
          {success && <p className="text-green-600 mt-2">{success}</p>}
        </div>
      )}
    </div>
  );
}