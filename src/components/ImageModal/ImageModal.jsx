import Modal from "react-modal";
import s from "./ImageModal.module.css";
import { useEffect } from "react";

const ImageModal = ({ isOpen, onClose, imageUrl }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName={s.overlay}
      className={s.modal}
      onOverlayClick={handleOverlayClick}
    >
      <img src={imageUrl} alt="Modal" className={s.image} />
    </Modal>
  );
};

export default ImageModal;
