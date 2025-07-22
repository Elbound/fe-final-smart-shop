'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db, getAuth } from '@/firebase';

export default function AddToCartForm({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState({ text: '', type: '' });
  const router = useRouter();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (quantity <= 0) {
      setMessage({ text: 'Quantity must be at least 1', type: 'error' });
      return;
    }
    
    if (quantity > product.stock) {
      setMessage({ 
        text: `Only ${product.stock} items available`, 
        type: 'error' 
      });
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        router.push('/login');
        return;
      }

      // Add to cart in Firestore
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        cart: arrayUnion({
          productId: product.id, 
          slug: product.slug,   
          name: product.name,
          image: product.image,
          price: product.price,
          quantity,
          addedAt: new Date()
        })
      });

      setMessage({ 
        text: `${quantity} × ${product.name} added to cart!`, 
        type: 'success' 
      });
      setQuantity(1); 
    } catch (error) {
      setMessage({ 
        text: 'Failed to add to cart: ' + error.message, 
        type: 'error' 
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <div className="flex items-center gap-4">
        <label htmlFor="quantity" className="font-medium">Quantity:</label>
        <input
          type="number"
          id="quantity"
          min="1"
          max={product.stock}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1) )}
          className="w-20 px-3 py-2 border rounded"
        />
        
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors"
        >
          Add to Cart
        </button>
      </div>

      /* Message display */
      {message.text && (
        <p className={`text-sm ${
          message.type === 'error' ? 'text-red-500' : 'text-green-500'
        }`}>
          {message.text}
        </p>
      )}
    </form>
  );
}