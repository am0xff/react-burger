import { useCallback, useEffect, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import classes from './Modal.module.css';

const modalRoot = document.getElementById('react-modals') as Element | DocumentFragment;

type Props = {
  children: ReactNode,
  heading?: string,
  onClose: () => void
}

const Modal = ({ children, heading, onClose }: Props) => {
  const handleKeyDownEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDownEscape);

    return () => {
      document.removeEventListener('keydown', handleKeyDownEscape);
    }
  }, [handleKeyDownEscape])

  return ReactDOM.createPortal(
    (
      <>
        <div className={`${classes.modal} p-10`}>
          {heading && (
            <p className='text text_type_main-large'>
              {heading}
            </p>
          )}
          <div className={classes.modalButtonClose}>
            <CloseIcon onClick={onClose} type={'primary'} />
          </div>
          {children}
        </div>
        <ModalOverlay onClick={onClose} />
      </>
    ),
    modalRoot
  )
}

export default Modal;