import './add-product-modal.css';

export default function deleteProductModal({ setShowDeleteModal}) {

    const handleCloseModal = () => {
        setShowDeleteModal(false);
    }

    const handleDelete = () => {
        console.log("Products deleted:");
        
        setShowDeleteModal(false);
    }

    return (
        <>
        <div className="modalStyle-overlay">
            <div className="modalStyle-container">
                <button onClick={handleCloseModal} className="modalStyle-close">
                    Close
                </button>
                <h2 className="modalStyle-title">Delete Selected Products</h2>
                <p>Are you sure you want to delete the selected products?</p>
                <br/>
                <div className="flex-row">

                    <button onClick={handleDelete} className="modalStyle-button">
                        Confirm
                    </button>
                    
                    <button onClick={handleCloseModal} className="modalStyle-button">
                        Cancel
                    </button>

                </div>
            </div>
        </div>
        </>
    );
}