import { useCallback, useMemo } from 'react';
import { changeOrderAction } from '../../services/actions';
import { useSelector, useDispatch } from '../../services/hooks';
import BurgerConstructorIngredient from './BurgerConstructorIngredient';
import classes from './BurgerConstructor.module.css';

const BurgerConstructorDraggable = () => {
  const dispatch = useDispatch();
  const { items: constructorItems } = useSelector((state) => state.burgerConstructor);

  const constructorItemsWithoutBun = useMemo(() => {
    return constructorItems.filter(({ type }) => type !== 'bun');
  }, [constructorItems])

  const changeOrder = useCallback((dragIndex: number, hoverIndex: number) => {
    dispatch(changeOrderAction({ dragIndex, hoverIndex }));
  }, [dispatch]);

  return (
    <ul className={`${classes.constructorList}`}>
      {constructorItemsWithoutBun.map(({ _id, uniqueId, name, price, image }, index) => {
        return (
          <li className={`${classes.constructorItem}`} key={uniqueId}>
            <BurgerConstructorIngredient
              id={_id}
              index={index}
              isDraggable={true}
              text={name}
              price={price}
              thumbnail={image}
              changeOrder={changeOrder}
            />
          </li>
        )
      })}
    </ul>
  )
}

export default BurgerConstructorDraggable;
