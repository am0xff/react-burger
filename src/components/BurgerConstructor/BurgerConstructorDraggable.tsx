import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CHANGE_ORDER } from '../../services/actions/burgerConstructor';
import { BurgerConstructorStore } from '../../services/reducers/burgerConstructor';
import BurgerConstructorIngredient from './BurgerConstructorIngredient';
import classes from './BurgerConstructor.module.css';

const BurgerConstructorDraggable = () => {
  const dispatch = useDispatch();
  const { items: constructorItems } = useSelector<{ burgerConstructor: BurgerConstructorStore }, BurgerConstructorStore>((state) => state.burgerConstructor);

  const constructorItemsWithoutBun = useMemo(() => {
    return constructorItems.filter(({ type }) => type !== 'bun');
  }, [constructorItems])

  const changeOrder = useCallback((dragIndex: number, hoverIndex: number) => {
    dispatch({ type: CHANGE_ORDER, payload: { dragIndex, hoverIndex } })
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
