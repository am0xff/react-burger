import classes from './ModalOverlay.module.css';

const ModalOverlay = ({ onClick }) => {
  return <div className={classes.overlay} onClick={onClick} />
}

export default ModalOverlay;