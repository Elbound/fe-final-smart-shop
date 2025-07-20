
"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user'
    });

    const handleChange = (event) => {
        setForm({
        ...form,
        [event.target.name]: event.target.value,
        });
        // setErrors({
        // ...errors,
        // [event.target.name]: "",
        // });
    };


    const handleRegister = () => {
        console.log(form);
        if(form.role === 'seller') {
            router.push('/seller/dashboard');
        }else{
            router.push('/user/dashboard');
        }
    };

    return (
        <>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
                </label>
                <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
                </label>
                <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Confirm Password
                </label>
                <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Register as</label>
                <div className="mt-2 flex space-x-4">
                <label className="flex items-center">
                    <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={form.role === 'user'}
                    onChange={handleChange}
                    className="mr-2"
                    />
                    User
                </label>
                <label className="flex items-center">
                    <input
                    type="radio"
                    name="role"
                    value="seller"
                    checked={form.role === 'seller'}
                    onChange={handleChange}
                    className="mr-2"
                    />
                    Seller
                </label>
                </div>
            </div>
            <button
                type="click"
                onClick={handleRegister}
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
            >
                Register
            </button>

            <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-500 hover:underline">
                Log in
            </Link>
            </p>
        </div>
        </div>
        </>
    );
}
