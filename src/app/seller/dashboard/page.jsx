'use client';
import AddProductModal from "@/component/add-product-modal";
import DeleteProductModal from "@/component/delete-product-modal";
import { useEffect, useState } from "react";
// import getTemplateProductData from "@/component/template-product-data";
import styles from './seller-style.module.css';
import { auth } from "@/firebase";
import useFetchProductsData from "@/hooks/useFetchProductsData";

export default function SellerDashboardPage() {
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 5;

    const user = auth.currentUser;
    const pd = useFetchProductsData();
    // console.log(user.uid);
    // pd.forEach(item => console.log(item.seller));
    
    useEffect(()=>{
        const prod = pd
        .filter(item => item.seller === user.uid);
        console.log(prod);
        
        setData(prod);
    },[pd, user]);

    const handleAddProduct = () => {
        console.log("Add Product button clicked");
        setShowModal(true);
    }
    

    const handleSelect = (id) => {
        setSelected((prev) =>
            prev.includes(id)
                ? prev.filter(n => n !== id) : [...prev, id]
        );
    };

    const filteredData = data.filter(item => {
        const matchesCategory = categoryFilter ? item.category === categoryFilter : true;
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

        

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

                <div className="flex gap-4 mb-4">
                    <select
                        value={categoryFilter}
                        onChange={e => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
                        className="border rounded px-2 py-1"
                    >
                        <option value="">All Categories</option>
                        <option value="electronics">Electronics</option>
                        <option value="fashion">Fashion</option>
                        <option value="books">Books</option>
                        <option value="home">Home</option>
                        <option value="other">Other</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        className="border rounded px-2 py-1"
                    />
                </div>

                <table className={styles.table}>
                <thead>
                <tr>
                    <th className={styles.header}>Name</th>
                    <th className={styles.header}>Desc</th>
                    <th className={styles.header}>Quantity</th>
                    <th className={styles.header}>Select Delete</th>
                </tr>
                </thead>
                <tbody>
                    {paginatedData.map((items)=>(
                        <tr className={styles.row} key={items.name}>
                            <td className={styles.cell}>{items.name}</td>
                            <td className={styles.cell}>{items.description}</td>
                            <td className={styles.cell}>{items.quantity}</td>
                            <td className={styles.cell}>
                                <input
                                    type="checkbox"
                                    checked={selected.includes(items.id)}
                                    onChange={() => handleSelect(items.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
                
                <div className="flex justify-center gap-2 mt-4">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border rounded"
                    >
                        Prev
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-gray-300' : ''}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border rounded"
                    >
                        Next
                    </button>
                </div>

            </div>
        </div>

        {showModal && <AddProductModal setShowModal={setShowModal} />}
        {showDeleteModal && <DeleteProductModal setShowDeleteModal={setShowDeleteModal} selected={selected}/>}
        </>
    );
}
