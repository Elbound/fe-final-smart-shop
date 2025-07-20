
import { useState } from "react";
import './add-product-modal.css';


export default function AddProductModal({ setShowModal }) {

    const [form, setForm] = useState({
        name: "",
        desc: "",
        price: 0,
        quantity: 0,
        //seller: get current user
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
        console.log("Product added:", form);
        setShowModal(false);
    }

    return (
        <>
        <div className="modalStyle-overlay">
            <div className="modalStyle-container">
                <button onClick={handleCloseModal} className="modalStyle-close">
                    Close
                </button>
                <h2 className="modalStyle-title">Add Product</h2>
                <form className="modalStyle-form" onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
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
                            name="productImage"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Product Description:
                        <input
                            type="text"
                            name="productDescription"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Price:
                        <input
                            type="number"
                            name="price"
                            value={form.age}
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
                            value={form.age}
                            onChange={handleChange}
                            min="0"
                            required
                        />
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