import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import classes from './Ingredient.module.css';


const Ingredient = () => {
  const ingredient = useSelector((state) => state.ingredients.items);
  const { id } = useParams();

  const ingredientDetails = ingredient.find(({_id}) => _id === id);

  return (
    <div className={classes.wrap}>
      <p className={`${classes.title} text text_type_main-large`}>
        Детали ингредиента
      </p>
      {ingredientDetails && (
        <IngredientDetails
          image={ingredientDetails.image_large}
          name={ingredientDetails.name}
          proteins={ingredientDetails.proteins}
          fat={ingredientDetails.fat}
          carbohydrates={ingredientDetails.carbohydrates}
          calories={ingredientDetails.calories}
        />
      )}
    </div>
  )
}

export default Ingredient;
