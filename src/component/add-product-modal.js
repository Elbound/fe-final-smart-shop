

export default function AddProductModal({ setShowModal }) {

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return(
        <>
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
                <button onClick={handleCloseModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                    Close
                </button>
                <div className="mt-8 mb-4 flex flex-col items-center">
                    <p className="text-lg font-semibold mb-2">Add Product Modal</p>
                    <p className="text-gray-600">This is a placeholder for your add product form or content.</p>
                </div>
            </div>
        </div>
        </>
    );
}