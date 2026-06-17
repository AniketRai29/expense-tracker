const Modal = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[450px]">
        <div className="flex justify-between mb-5">
          <h2 className="text-2xl font-bold">{title}</h2>

          <button onClick={onClose} className="text-xl">
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Modal;