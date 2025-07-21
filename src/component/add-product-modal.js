
import { useState } from "react";
import './add-product-modal.css';
import { auth, db } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";


export default function AddProductModal({ setShowModal }) {

    const user = auth.currentUser;

    const [form, setForm] = useState({
        name: "",
        description: "",
        category: "",
        price: 0,
        quantity: 0,
        seller: user.uid,
        image: ""
    });

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
        
    };

    const handleSubmit = () => {
        // console.log("Product added:", form);
        if (!verifyForm()) return;

        const productCol = collection(db, "Product");
        addDoc(productCol, {
            ...form,
            image: form.image ? URL.createObjectURL(form.image) : "/asset/no_image_available.png"
        })
        setShowModal(false);
    }

    const [error, setError] = useState("");

    const verifyForm = () => {
        const { name, description, category, price, quantity } = form;
        if (!name || !description || !category || price <= 0 || quantity <= 0) {
            setError("Please fill all fields correctly.");
            return false;
        }
        setError("");
        return true;
    };

    return (
        <>
        <div className="modalStyle-overlay">
            <div className="modalStyle-container">
                <button onClick={handleCloseModal} className="modalStyle-close">
                    Close
                </button>
                <h2 className="modalStyle-title">Add Product</h2>
                <form className="modalStyle-form" onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
                    {error && <p className="text-red-500">{error}</p>}

                    <label>
                        Product Name:
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Product Image:
                        <input
                            type="file"
                            name="image"
                            value={form.image}
                            onChange={handleChange}
                            
                        />
                    </label>
                    <label>
                        Product Description:
                        <input
                            type="text"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Price:
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            min="0"
                            required
                        />
                    </label>
                    <label>
                        Quantity:
                        <input
                            type="number"
                            name="quantity"
                            value={form.quantity}
                            onChange={handleChange}
                            min="0"
                            required
                        />
                    </label>
                    <label>
                        Category:
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select category</option>
                            <option value="electronics">Electronics</option>
                            <option value="fashion">Fashion</option>
                            <option value="books">Books</option>
                            <option value="home">Home</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                    <button className="modalStyle-submit" type="submit">
                        Add
                    </button>
                </form>
            </div>
        </div>
        </>
    );
}