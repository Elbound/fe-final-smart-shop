'use client';
import AddProductModal from "@/component/add-product-modal";
import DeleteProductModal from "@/component/delete-product-modal";
import { useEffect, useState } from "react";
import getTemplateProductData from "@/component/template-product-data";
import styles from './seller-style.module.css';

export default function SellerDashboardPage() {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleAddProduct = () => {
        console.log("Add Product button clicked");
        setShowModal(true);
    }

    const [data, setData] = useState([]);
    useEffect(()=>{
        setData(getTemplateProductData());
        console.log("Data fetched:", data);
    },[]);


    const [selected, setSelected] = useState([]);

    const handleSelect = (name) => {
        setSelected((prev) =>
            prev.includes(name)
                ? prev.filter(n => n !== name) : [...prev, name]
        );
    };

    return (
        <>
        <div>
            <div className="bg-white align-middle">
                <h2 className="text-2xl font-bold mb-6 text-center">Seller Dashboard</h2>
                <p className="text-gray-700 text-center">Welcome to your dashboard!</p>
                
                <div>
                    <button 
                        className={styles.button} 
                        onClick={handleAddProduct}
                    >
                        Add Product
                    </button>
                    <button
                        className={styles.button}
                        disabled={selected.length === 0}
                        onClick={() => setShowDeleteModal(true)}
                    >
                        Delete Selected
                    </button>
                </div>

                <table className={styles.table}>
                <thead>
                <tr>
                    <th className={styles.header}>select</th>
                    <th className={styles.header}>Name</th>
                    <th className={styles.header}>Desc</th>
                    <th className={styles.header}>Quantity</th>
                    <th className={styles.header}>Actions</th>
                </tr>
                </thead>
                <tbody>
                    {data.map((items)=>(
                        <tr className={styles.row} key={items.name}>
                            <td className={styles.cell}>
                                <input
                                    type="checkbox"
                                    checked={selected.includes(items.name)}
                                    onChange={() => handleSelect(items.name)}
                                />
                            </td>
                            <td className={styles.cell}>{items.name}</td>
                            <td className={styles.cell}>{items.desc}</td>
                            <td className={styles.cell}>{items.quantity}</td>
                            <td className={styles.cell}>
                                <button className="px-4 py-2 bg-blue-500 text-white rounded">Edit</button>
                                <button className="px-4 py-2 bg-red-500 text-white rounded ml-2">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>

            </div>
        </div>
        {showModal && <AddProductModal setShowModal={setShowModal} />}
        {showDeleteModal && <DeleteProductModal setShowDeleteModal={setShowDeleteModal}/> }
        </>
    );
}
