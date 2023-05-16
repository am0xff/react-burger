import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { ProductPropTypes } from '../../utils/types';
import BurgerIngredientsIngredient from './BurgerIngredientsIngredient';
import classes from './BurgerIngredients.module.css';

const BurgerIngredientsSection = ({ id, title, items, setTab }) => {
  const [ref, setRef] = useState();
  const navigate = useNavigate();

  const handleClickIngredient = (productId) => {
    navigate(`/ingredients/${productId}`, { state: 'modal' });
  };

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
        {items.map((ingredient) => (
          <li key={ingredient._id} className={classes.ingredientItem}>
            <BurgerIngredientsIngredient
              id={ingredient._id}
              count={ingredient.count}
              image={ingredient.image}
              name={ingredient.name}
              price={ingredient.price}
              onClick={() => handleClickIngredient(ingredient._id)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

BurgerIngredientsSection.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  items: PropTypes.arrayOf(ProductPropTypes),
  setTab: PropTypes.func
}

export default BurgerIngredientsSection;