import { db } from "@/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react"

export default function useFetchProductsData() {
    const [data, setData] = useState([]);
    
    const productCol = collection(db,"Product");

    useEffect(()=>{
        const unsub = onSnapshot(productCol, (snapshot) => {
            const products = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            // console.log(products)
            setData(products);
        }
        );
        return () => unsub();
    },[]);
    // console.log("Fetched products data:", data);

    return data;
}