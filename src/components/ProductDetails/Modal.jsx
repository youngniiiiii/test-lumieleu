// Modal.jsx
import React from 'react';

const Modal = ({ isOpen, children, closeModal }) => {
  if (!isOpen) {
    return null;
  }

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={closeModal}
    >
      <div
        className="bg-white max-h-[80%] p-5 rounded-md"
        onClick={stopPropagation}
      >
        <div className="h-[500px] w-[600px] p-4 overflow-y-scroll">
          <button
            className="bg-black text-white px-1 rounded mb-3"
            onClick={closeModal}
          >
            X
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
