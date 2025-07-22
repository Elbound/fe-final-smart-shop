'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, 'products'));
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="h-60 flex items-center justify-center">Loading products...</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map(product => (
        <Link
          key={product.id}
          href={`/product/${product.slug || product.id}`}
          className="border rounded-lg p-3 hover:shadow-md transition-all"
        >
          <div className="aspect-square mb-2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          <h3 className="font-medium truncate">{product.name}</h3>
          <p className="text-green-600 font-semibold">${product.price}</p>
          <p className="text-sm text-gray-500">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>
        </Link>
      ))}
    </div>
  );
}