import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import useModal from '../Modal/useModal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import classes from './BurgerIngredients.module.css';

const Ingredient = ({ image, price, name, onClick }) => {
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

Ingredient.propTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

const BurgerIngredients = ({ bunList, mainList, sauceList }) => {
  const { open, onOpen, onClose } = useModal();
  const [details, setDetails] = useState();

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleClickIngredient = useCallback((product) => {
    setDetails(product);
    onOpen();
  }, [onOpen])

  return (
    <section className={`${classes.ingredients} pb-10`}>
      <h2 className='text text_type_main-large pt-10 pb-5'>
          Соберите бургер
      </h2>
      <div className={`${classes.ingredientsTabs}`}>
        <Tab active>
          Булки
        </Tab>
        <Tab>
          Соусы
        </Tab>
        <Tab>
          Начинки
        </Tab>
      </div>
      <div className={classes.ingredientsBody}>
        <h3 className='text text_type_main-medium mt-10 mb-6'>
          Булки
        </h3>
        <ul className={`${classes.ingredientsList} pl-4 pr-4`}>
          {bunList.map((product) => (
            <li key={product._id} className={classes.ingredientItem}>
              <Ingredient
                image={product.image}
                name={product.name}
                price={product.price}
                onClick={() => handleClickIngredient(product)}
              />
            </li>
          ))}
        </ul>
        <h3 className='text text_type_main-medium mt-10 mb-6'>
          Соусы
        </h3>
        <ul className={`${classes.ingredientsList} pl-4 pr-4`}>
          {mainList.map((product) => (
            <li key={product._id} className={classes.ingredientItem}>
              <Ingredient
                image={product.image} 
                name={product.name}
                price={product.price}
                onClick={() => handleClickIngredient(product)}
              />
            </li>
          ))}
        </ul>
        <h3 className='text text_type_main-medium mt-10 mb-6'>
          Начинки
        </h3>
        <ul className={`${classes.ingredientsList} pl-4 pr-4`}>
          {sauceList.map((product) => (
            <li key={product._id} className={classes.ingredientItem}>
              <Ingredient
                image={product.image} 
                name={product.name}
                price={product.price}
                onClick={() => handleClickIngredient(product)}
              />
            </li>
          ))}
        </ul>
      </div>
      { open && (
        <Modal heading='Детали ингредиента' onClose={handleClose}>
          <IngredientDetails  
            image={details.image_large}
            name={details.name}
            proteins={details.proteins}
            fat={details.fat}
            carbohydrates={details.carbohydrates}
            calories={details.calories}
          />
        </Modal>
      ) }
    </section>
  )
}

const ProductPropTypes = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.oneOf(['bun', 'main', 'sauce']),
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number
});

BurgerIngredients.propTypes = {
  bunList: PropTypes.arrayOf(ProductPropTypes),
  mainList: PropTypes.arrayOf(ProductPropTypes), 
  sauceList: PropTypes.arrayOf(ProductPropTypes)
}

export default BurgerIngredients;