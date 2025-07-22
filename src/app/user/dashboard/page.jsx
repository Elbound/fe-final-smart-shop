'use client';
import { redirect } from 'next/navigation';
// import { getAuth } from 'firebase/auth';
import RecommendedProducts from '@/component/add-recommended-products';
import ProductList from '@/component/add-product-list';
import { auth } from '@/firebase';
import Link from 'next/link';
export default function CustomerDashboard() {
  
  console.log('Current User:', auth.currentUser);
  
  // Redirect if not logged in
  if (!auth.currentUser) {
    redirect('/login');
  }

  return (
    <div className="container mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Welcome back, {auth.currentUser.displayName || 'Customer'}!</h1>
        <p className="text-gray-600">Browse our latest products</p>
      </header>

      {/* Recommended Products Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Recommended For You</h2>
        <RecommendedProducts />
      </section>

      {/* All Products Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">All Products</h2>
          <Link 
            href="/user/cart" 
            className="flex items-center gap-1 text-blue-500 hover:underline"
          >
            🛒 View Cart
          </Link>
        </div>
        <ProductList />
      </section>
    </div>
  );
}