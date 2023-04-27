import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TYPE_INGREDIENT } from '../../utils/constants';
import { CHANGE_ORDER } from '../../services/actions/burgerConstructor';
import BurgerConstructorIngredient from './BurgerConstructorIngredient';
import classes from './BurgerConstructor.module.css';

const BurgerConstructorDraggable = () => {
  const dispatch = useDispatch();
  const constructorItemsWithoutBun = useSelector((state) => {
    return state.burgerConstructor.items.filter(({ type }) => TYPE_INGREDIENT.BUN !== type)
  });

  const changeOrder = useCallback((dragIndex, hoverIndex) => {
    dispatch({ type: CHANGE_ORDER, payload: { dragIndex, hoverIndex } })
  }, [dispatch]);

  return (
    <ul className={`${classes.constructorList}`}>
      {constructorItemsWithoutBun.map(({ _id, name, price, image }, index) => {
        return (
          <li className={`${classes.constructorItem}`} key={_id + index}>
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
