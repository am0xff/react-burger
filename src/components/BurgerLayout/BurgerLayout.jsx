import PropTypes from 'prop-types';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import classes from './BurgerLayout.module.css';

const BurgerLayout = ({ products }) => {
  const ingredients = products.reduce((acc, product) => {
    const type = product.type;

    return {...acc, [product.type]: acc[type] ? [...acc[type], product] : [product]}
  }, {});
  
  return (
    <main>
      <div className={classes.container}>
        <div className={classes.row}>
          <div className={classes.col}>
            <BurgerIngredients
              bunList={ingredients.bun || []} 
              mainList={ingredients.main || []} 
              sauceList={ingredients.sauce || []} 
            />
          </div>
          <div className={classes.col}>
            <BurgerConstructor />
          </div>
        </div>
      </div>
    </main>
  )
}

const ProductPropTypes = PropTypes.shape({
  "_id": PropTypes.string,
  "name": PropTypes.string,
  "type": PropTypes.oneOf(['bun', 'main', 'sauce']),
  "proteins": PropTypes.number,
  "fat": PropTypes.number,
  "carbohydrates": PropTypes.number,
  "calories": PropTypes.number,
  "price": PropTypes.number,
  "image": PropTypes.string,
  "image_mobile": PropTypes.string,
  "image_large": PropTypes.string,
  "__v": PropTypes.number
});

BurgerLayout.propTypes = {
  products: PropTypes.arrayOf(ProductPropTypes).isRequired
}

export default BurgerLayout;