import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ADD_INGREDIENT_DETAILS, OPEN_DETAILS_MODAL } from '../../services/actions';
import BurgerIngredientsIngredient from './BurgerIngredientsIngredient';
import classes from './BurgerIngredients.module.css';

const BurgerIngredientsSection = ({ id, title, items, setTab }) => {
  const [ref, setRef] = useState();
  const dispatch = useDispatch();

  const handleClickIngredient = useCallback((product) => {
    dispatch({ type: ADD_INGREDIENT_DETAILS, payload: product })
    dispatch({ type: OPEN_DETAILS_MODAL });
  }, [dispatch]);

  useEffect(() => {
    if(!ref) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTab(id);
        }
      })
    }, {
      threshold: 0.3
    })

    observer.observe(ref);

    return () => {
      observer.disconnect();
    }
  }, [id, ref, setTab]);

  return (
    <div ref={setRef} data-section-id={id} className='pt-10'>
      <h3 className='text text_type_main-medium mb-6'>
        {title}
      </h3>
      <ul className={`${classes.ingredientsList} pl-4 pr-4`}>
        {items.map(({ _id, image, name, price, count }) => (
          <li key={_id} className={classes.ingredientItem}>
            <BurgerIngredientsIngredient
              id={_id}
              count={count}
              image={image}
              name={name}
              price={price}
              onClick={() => handleClickIngredient(_id)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BurgerIngredientsSection;