import React from "react";
import { IoMdClose } from "react-icons/io";

const Modal = ({isVisible, onClose, children}) => {
   if (!isVisible) return null;
   return (
       <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center item-center">
           <div className="w-[600px] flex flex-col justify-center">
               <button className="text-white text-xl place-self-end" onClick={() => onClose()}><IoMdClose size="1.25em" fill="black" /></button>
               <div className="bg-white p-3 rounded ">
                  {children}
               </div>
           </div>
       </div>
   )
}

export default Modal;
