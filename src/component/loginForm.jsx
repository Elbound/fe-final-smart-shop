'use client';
import { useState } from 'react';
import { auth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return setError('All fields are required.');
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError('Invalid email format.');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (email.includes('seller')) {
        router.push('seller/dashboard');
      } else {
        router.push('user/dashboard');
      }
    } catch (err) {
      setError('Invalid email or password.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-80">
      <h2 className="text-xl font-bold text-center">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input type="email" placeholder="Email"
        className="border p-2 w-full"
        value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password"
        className="border p-2 w-full"
        value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" className="flex items-center gap-1 px-3 py-2 rounded bg-custom-blue hover:bg-hover-dark-blue text-black hover:text-white transition w-full p-2" style={{ backgroundColor: '#caf0f8' }}>Login</button>
      <div>
       <p className="mt-4 text-center text-sm text-gray-600">
          Dont have an account?{' '}
          <Link href="/register" className="text-blue-500 hover:underline">
            Register
        </Link>
        </p>
      </div>
      
    </form>
  );
}

//testing loginForm