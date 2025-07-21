'use client';

import { useEffect, useState } from 'react';
import {
  getFirestore,
  collection,
  query,
  onSnapshot
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '@/firebase';

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const q = collection(db, 'User', user.uid, 'OrderHistory');
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const orderData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(orderData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-white p-6">
        <h1 className="text-2xl font-semibold">📦 Order History</h1>
        <p className="text-gray-600 mt-2">You must be logged in to view your orders.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-semibold mb-4">📦 Order History</h1>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded p-4 bg-gray-50 shadow-sm"
            >
              <p className="font-medium">🕒 {order.time}</p>
              {order.items?.map((item, index) => (
                <div key={index} className="ml-4 text-sm text-gray-700">
                  • {item} — {order.quantity[index]} × ${order.price[index]}
                </div>
              ))}
              <p className="mt-2 font-semibold text-right text-blue-700">
                💰 Total: ${order.total}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}