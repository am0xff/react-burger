import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import { Ingredient } from '../../services/types/data';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import classes from './IngredientLayout.module.css';

const IngredientLayout = () => {
  const { id } = useParams();
  const { items, success } = useSelector((state) => state.ingredients);
  const [item, setItem] = useState<Ingredient | undefined>();

  useEffect(() => {
    if (success) {
      const item = items.find(({ _id }) => _id === id);

      setItem(item)
    }
  }, [id, items, success]);

  return (
    <div className={classes.wrap}>
      <p className={`${classes.title} text text_type_main-large`}>
        Детали ингредиента
      </p>
      {item && (
        <IngredientDetails
          image={item.image_large}
          name={item.name}
          proteins={item.proteins}
          fat={item.fat}
          carbohydrates={item.carbohydrates}
          calories={item.calories}
        />
      )}
    </div>
  )
}

export default IngredientLayout;
