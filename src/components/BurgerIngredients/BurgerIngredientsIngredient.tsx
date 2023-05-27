import { useDrag } from 'react-dnd'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../services/api/types';
import classes from './BurgerIngredients.module.css';

type Props = {
  id: Ingredient['_id'],
  image: Ingredient['image'],
  price: Ingredient['price'],
  name: Ingredient['name']
  count: number,
  onClick: () => void
}

const BurgerIngredientsIngredient = ({ id, image, price, name, count, onClick }: Props) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'ingredient',
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  return (
    <div
      ref={dragRef}
      className={classes.ingredient} 
      onClick={onClick}
      draggable 
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className={`${classes.ingredientImage} pl-4 pr-4`}>
        {Boolean(count) && <Counter count={count} size="default" extraClass="m-1" />}
        <img src={image} alt={name} />
      </div>
      <p className={`${classes.ingredientPrice} text text_type_digits-default mt-1 mb-1`}>
        {price} <CurrencyIcon type='primary' />
      </p>
      <p className='text text_type_main-default'>
        {name}
      </p>
    </div>
  )
};

export default BurgerIngredientsIngredient;