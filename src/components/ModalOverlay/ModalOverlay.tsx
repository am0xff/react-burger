import classes from './ModalOverlay.module.css';

type Props = {
  onClick: () => void
}

const ModalOverlay = ({ onClick }: Props) => {
  return <div className={classes.overlay} onClick={onClick} />
}

export default ModalOverlay;