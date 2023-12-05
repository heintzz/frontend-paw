import React from "react";
import { IoMdClose } from "react-icons/io";

const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-[2] flex justify-center item-center">
      <div className="max-w-[90%] w-[400px] flex flex-col justify-center">
        <button className="text-white text-xl place-self-end mb-2" onClick={() => onClose()}>
          <IoMdClose size="1.25em" fill="black" />
        </button>
        <div className="bg-white p-3 rounded-xl">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
