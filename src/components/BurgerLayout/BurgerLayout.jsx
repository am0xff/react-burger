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

export default BurgerLayout;