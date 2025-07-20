'use client';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { useRouter } from 'next/navigation';

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
        router.push('/dashboard/seller');
      } else {
        router.push('/dashboard/customer');
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
      <p className="text-center text-sm">
        Don't have an account? <a href="/register" className="flex items-center gap-1 px-3 py-2 rounded bg-register-navy hover:bg-hover-dark-blue text-white transition">Register</a>
      </p>
    </form>
  );
}