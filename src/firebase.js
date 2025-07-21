
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCQkklTOT8faZ1v_itrDRanoRl7PV9UGVs",
  authDomain: "final-project-smart-shop.firebaseapp.com",
  projectId: "final-project-smart-shop",
  storageBucket: "final-project-smart-shop.firebasestorage.app",
  messagingSenderId: "476435606170",
  appId: "1:476435606170:web:b99397b1f89a3ea9f30d23"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);