import React from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const ConfirmationModal: React.FC<ModalProps> = ({
  isOpen,
  title,
  children,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md transform transition-all duration-300 ease-in-out scale-95 "
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
