import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ingredient } from '../../services/api/types';
import BurgerIngredientsIngredient from './BurgerIngredientsIngredient';
import classes from './BurgerIngredients.module.css';

type Props = {
  id: number,
  title: string,
  items: (Ingredient & { count: number })[],
  setTab: (id: number) => void
}

const BurgerIngredientsSection = ({ id, title, items, setTab }: Props) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const handleClickIngredient = (productId: string) => {
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

export default BurgerIngredientsSection;