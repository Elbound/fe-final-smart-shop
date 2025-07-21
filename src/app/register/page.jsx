
"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth, db } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function RegisterPage() {
    const router = useRouter();
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'User'
    });

    const handleChange = (event) => {
        setForm({
        ...form,
        [event.target.name]: event.target.value,
        });
        setErrors({
        ...errors,
        [event.target.name]: "",
        });
    };

    const validate = ()=>{
        const newErrors = {}
        if(!form.name){
            newErrors.name = "Name is Empty"
        }
        if(!form.email){
        newErrors.email = "Email is Empty"
        }  
        if(!form.password){
        newErrors.password = "Password is Empty"
        }
        if(!form.confirmPassword){
        newErrors.confirmPassword = "confirm password is Empty"
        }
        if(form.password !== form.confirmPassword){
            newErrors.confirmPassword = "Password and Confirm Password do not match"
        }
        
        return newErrors;
    }


    const handleRegister = () => {
        const validateErroors = validate();
        if(Object.keys(validateErroors).length > 0){
            setErrors(validateErroors)
        }else{
           
            createUserWithEmailAndPassword(auth, form.email, form.password)
            .then(async(userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user);
                console.log(form.role);
                await setDoc (doc(db,form.role,user.uid),{
                    
                    name: form.name,
                    email: user.email,
                    role: form.role,
                })
                
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error);
                // ..
            });
            if(form.role === 'Seller') {
                router.push('/seller/dashboard');
            }else{
                router.push('/user/dashboard');
            }
        }
    };

    return (
        <>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Username
                </label>
                <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
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
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
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
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Register as</label>
                <div className="mt-2 flex space-x-4">
                <label className="flex items-center">
                    <input
                    type="radio"
                    name="role"
                    value="User"
                    checked={form.role === 'User'}
                    onChange={handleChange}
                    className="mr-2"
                    />
                    User
                </label>
                <label className="flex items-center">
                    <input
                    type="radio"
                    name="role"
                    value="Seller"
                    checked={form.role === 'Seller'}
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
