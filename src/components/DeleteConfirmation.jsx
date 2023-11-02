import React from "react";
import "@/styles/delete.css";

const DeleteConfirmation = ({isOpen, hideDeleteConfirmation, handleDelete}) => {
    if (!isOpen) {
        return null; 
    }

    return (
        <div className="delete-confirmation-modal-overlay">
            <div className="delete-confirmation-modal flex flex-col items-center mx-[450px]">
                <img className="w-12 h-12 mb-4" src="/assets/delete.png" alt="Delete" />
                <p className="text-black font-bold mb-4">Are you sure you want to delete this item?</p>
                <p className="text-black mb-4">This action is irreversible. By confirming deletion, you'll remove the selected item permanently.</p>
                <div className="modal-buttons">
                    <button
                        className="rounded-full text-white px-8 py-2 bg-[#4C9C66] hover:bg-[#3A7F50] active:bg-[#2A613C]"
                        onClick={hideDeleteConfirmation}
                    >
                    Cancel
                    </button>
                    <button 
                        className="rounded-full text-white px-8 py-2 bg-[#4C9C66] hover:bg-[#3A7F50] active:bg-[#2A613C]"
                        onClick={handleDelete}
                    >
                    Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmation;