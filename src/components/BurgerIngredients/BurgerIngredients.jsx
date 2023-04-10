import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Tab,  } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import useModal from '../Modal/useModal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import BurgerIngredientsIngredient from './BurgerIngredientsIngredient';
import { ProductPropTypes } from '../../utils/types';
import classes from './BurgerIngredients.module.css';

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
              <BurgerIngredientsIngredient
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
              <BurgerIngredientsIngredient
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
              <BurgerIngredientsIngredient
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

BurgerIngredients.propTypes = {
  bunList: PropTypes.arrayOf(ProductPropTypes),
  mainList: PropTypes.arrayOf(ProductPropTypes), 
  sauceList: PropTypes.arrayOf(ProductPropTypes)
}

export default BurgerIngredients;