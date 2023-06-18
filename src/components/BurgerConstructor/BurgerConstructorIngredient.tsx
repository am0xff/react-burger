import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from '../../services/hooks';
import { deleteItemAction } from '../../services/actions';
import classes from './BurgerConstructor.module.css';

type Props = {
  text: string,
  price: number,
  thumbnail: string,
  id?: string,
  index?: number,
  changeOrder?: (dragIndex: number, hoverIndex: number) => void,
  isDraggable?: boolean,
  type?: 'top' | 'bottom',
  isLocked?: boolean
}

const BurgerConstructorIngredient = ({ 
  id,
  index,
  changeOrder,
  isDraggable,
  type,
  text,
  price,
  isLocked = false,
  thumbnail
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
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

      const hoverItem = item as { index: number };

      const dragIndex = hoverItem.index
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
      const hoverClientY = clientOffset ? clientOffset.y - hoverBoundingRect.top : 0;
      
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      changeOrder?.(dragIndex, hoverIndex);
      hoverItem.index = hoverIndex;
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

  const handleDelete = (id?: string) => {
    if (id) {
      dispatch(deleteItemAction(id));
    }
  };

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0 : 1 }} className={classes.constructorIngredient}>
      {isDraggable && (
        <div className={classes.constructorIngredientIcon}>
          <DragIcon type={'primary'} />
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

export default BurgerConstructorIngredient;
