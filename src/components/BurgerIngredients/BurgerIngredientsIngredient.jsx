import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import classes from './BurgerIngredients.module.css';

const BurgerIngredientsIngredient = ({ image, price, name, onClick }) => {
  return (
    <div className={classes.ingredient} onClick={onClick}>
      <div className={`${classes.ingredientImage} pl-4 pr-4`}>
        <Counter count={1} size="default" extraClass="m-1" />
        <img src={image} alt={name} />
      </div>
      <p className={`${classes.ingredientPrice} text text_type_digits-default mt-1 mb-1`}>
        {price} <CurrencyIcon className='ml-2' />
      </p>
      <p className='text text_type_main-default'>
        {name}
      </p>
    </div>
  )
}

BurgerIngredientsIngredient.propTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default BurgerIngredientsIngredient;