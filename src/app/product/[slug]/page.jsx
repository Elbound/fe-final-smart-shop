import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '@/firebase';
import { redirect } from 'next/navigation';
import AddToCartForm from '@/component/add-to-cart-form';
import Link from 'next/link';

export default async function ProductDetail({ params }) {
  // 1. Authentication Check
  const user = auth.currentUser;
  console.log('Current User:', user);
  // if (!user) redirect('/login');

  // 2. Role Verification
  const userDoc = await getDoc(doc(db, 'User', user.uid));
  if (userDoc.data()?.role !== 'User') {
    redirect('/login?error=customer_only');
  }

  // 3. Product Data Fetching
  const productRef = doc(db, 'Product', params.id);
  const productSnap = await getDoc(productRef);
  
  if (!productSnap.exists()) {
    return <div className="container mx-auto p-4">Product not found</div>;
  }

  const product = { 
    id: productSnap.id,
    ...productSnap.data() 
  };

  // 4. Render Page
  return (
    <div className="container mx-auto p-4">
      <Link href="/user" className="text-blue-500 hover:underline">
        ← Back to Dashboard
      </Link>

      <div className="grid md:grid-cols-2 gap-8 mt-6">
        {/* Product Image */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-96 object-contain p-4"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl text-green-600 my-2">${product.price}</p>
          
          <div className="space-y-4 my-6">
            <p>
              <span className="font-semibold">Availability:</span>
              <span className={`ml-2 ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </p>
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Add to Cart (only if in stock) */}
          {product.stock > 0 && <AddToCartForm product={product} />}
        </div>
      </div>
    </div>
  );
}