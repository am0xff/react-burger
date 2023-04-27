import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { DELETE_ITEM } from '../../services/actions/burgerConstructor';
import classes from './BurgerConstructor.module.css';

const BurgerConstructorIngredient = ({ 
  id,
  index,
  changeOrder,
  isDraggable,
  type = '',
  text,
  price,
  isLocked = false,
  thumbnail
}) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  
  const [_, drop] = useDrop({
    accept: 'test',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }

      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }
      
      if(dragIndex === undefined || hoverIndex === undefined) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      changeOrder(dragIndex, hoverIndex);
      item.index = hoverIndex
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'test',
    item: () => {
      return { index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  
  drag(drop(ref));

  const handleDelete = (id) => {
    dispatch({ type: DELETE_ITEM, payload: id })
  };

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0 : 1 }} className={classes.constructorIngredient}>
      {isDraggable && (
        <div className={classes.constructorIngredientIcon}>
          <DragIcon />
        </div>
      )}
      <ConstructorElement
        type={type}
        text={text}
        price={price}
        isLocked={isLocked}
        thumbnail={thumbnail}
        handleClose={() => handleDelete(id)}
      />
    </div>
  )
};

BurgerConstructorIngredient.propTypes = {
  id: PropTypes.string,
  index: PropTypes.number,
  changeOrder: PropTypes.func,
  isDraggable: PropTypes.bool,
  type: PropTypes.oneOf(['top', 'bottom']),
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  isLocked: PropTypes.bool,
  thumbnail: PropTypes.string.isRequired
}

export default BurgerConstructorIngredient;
