import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { ProductPropTypes } from '../../utils/types';
import { DELETE_INGREDIENT_DETAILS, CLOSE_DETAILS_MODAL } from '../../services/actions';
import { TYPE_INGREDIENT } from '../../utils/constants';
import BurgerIngredientsSection from './BurgerIngredientsSection';
import classes from './BurgerIngredients.module.css';

const BurgerIngredients = () => {
  const [ref, setRef] = useState();
  const dispatch = useDispatch();
  const [tab, setTab] = useState(0);
  const { 
    ingredientDetails, 
    ingredients, 
    modalDetails, 
    constructorList 
  } = useSelector((state) => ({
    ingredientDetails: state.order.ingredientDetails,
    ingredients: state.order.ingredients,
    modalDetails: state.order.modalDetails,
    constructorList: state.order.constructorList
  }));

  const countByIdIngredients = useMemo(() => {
    return constructorList.reduce((acc, {_id}) => {
      return acc[_id] ? {...acc, [_id]: acc[_id] + 1} : {...acc, [_id]: 1}
    }, {})
  }, [constructorList]);

  const bunListWithCount = useMemo(() => {
    return ingredients
      .filter(({ type }) => type === TYPE_INGREDIENT.BUN)
      .map((item) => ({
        ...item,
        count: countByIdIngredients[item._id] || 0
      }));
  }, [countByIdIngredients, ingredients]);

  const mainListWithCount = useMemo(() => {
    return ingredients
      .filter(({ type }) => type === TYPE_INGREDIENT.MAIN)
      .map((item) => ({
        ...item,
        count: countByIdIngredients[item._id] || 0
      }));
  }, [countByIdIngredients, ingredients]);

  const sauceListWithCount = useMemo(() => {
    return ingredients
      .filter(({ type }) => type === TYPE_INGREDIENT.SAUCE)
      .map((item) => ({
        ...item,
        count: countByIdIngredients[item._id] || 0
      }));
  }, [countByIdIngredients, ingredients]);

  const handleClose = useCallback(() => {
    dispatch({ type: CLOSE_DETAILS_MODAL })
    dispatch({ type: DELETE_INGREDIENT_DETAILS })
  }, [dispatch]);

  const handleTab = (id) => {
    const section = ref.querySelector(`[data-section-id="${id}"]`);

    section.scrollIntoView({
      behavior: 'smooth'
    });

    setTab(id);
  };

  return (
    <section className={`${classes.ingredients} pb-10`}>
      <h2 className='text text_type_main-large pt-10 pb-5'>
          Соберите бургер
      </h2>
      <div className={`${classes.ingredientsTabs}`}>
        <Tab active={tab === 0} onClick={() => handleTab(0)}>
          Булки
        </Tab>
        <Tab active={tab === 1} onClick={() => handleTab(1)}>
          Соусы
        </Tab>
        <Tab active={tab === 2} onClick={() => handleTab(2)}>
          Начинки
        </Tab>
      </div>
      <div ref={setRef} className={classes.ingredientsBody}>
        <BurgerIngredientsSection
          id={0}
          title={'Булки'}
          items={bunListWithCount}
          setTab={setTab}
        />
        <BurgerIngredientsSection
          id={1}
          title={'Соусы'}
          items={mainListWithCount}
          setTab={setTab}
        />
        <BurgerIngredientsSection
          id={2}
          title={'Начинки'}
          items={sauceListWithCount}
          setTab={setTab}
        />
      </div>
      { modalDetails && (
        <Modal heading='Детали ингредиента' onClose={handleClose}>
          <IngredientDetails
            image={ingredientDetails.image_large}
            name={ingredientDetails.name}
            proteins={ingredientDetails.proteins}
            fat={ingredientDetails.fat}
            carbohydrates={ingredientDetails.carbohydrates}
            calories={ingredientDetails.calories}
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