import { useCallback, useEffect, useState } from 'react';
import BurgerConstructorIngredient from './BurgerConstructorIngredient';
import classes from './BurgerConstructor.module.css';

const BurgerConstructorDraggable = ({ ingredients, onDelete }) => {
  const [items, setItems] = useState(ingredients);

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    const dragElement = items[dragIndex];
    const hoverElement = items[hoverIndex];
    const tempItems = [...items];

    tempItems[hoverIndex] = dragElement;
    tempItems[dragIndex] = hoverElement;

    setItems(tempItems);
  }, [items])

  useEffect(() => {
    setItems(ingredients);
  }, [ingredients]);

  return (
    <ul className={`${classes.constructorList}`}>
      {items.map(({ _id, name, price, image }, index) => {
        return (
          <li className={`${classes.constructorItem}`} key={_id + index}>
            <BurgerConstructorIngredient
              index={index}
              isDraggable={true}
              text={name}
              price={price}
              thumbnail={image}
              moveCard={moveCard}
              onDelete={() => onDelete(_id)}
            />
          </li>
        )
      })}
    </ul>
  )
}

export default BurgerConstructorDraggable;
