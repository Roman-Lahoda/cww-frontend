import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.scss';

const modalRoot = document.querySelector('#modal-root') as HTMLElement;

interface IProps {
  children: React.ReactNode;
  toggleModal: () => void;
}

const Modal = ({ children, toggleModal }: IProps): JSX.Element => {
  useEffect(function setUpListener() {
    window.addEventListener('keydown', (event: Event) => handleKeyDown);

    return () => {
      window.removeEventListener('keydown', (event: Event) => handleKeyDown);
    };
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.code === 'Escape') {
      toggleModal();
    }
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget === event.target) {
      toggleModal();
    }
  };

  return createPortal(
    <div className={s.modal_backdrop} onClick={handleBackdropClick}>
      <div className={s.modal_content}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;
