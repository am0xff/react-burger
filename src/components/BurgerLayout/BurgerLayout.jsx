import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import classes from './BurgerLayout.module.css';

const BurgerLayout = () => {
  return (
    <main>
      <div className={classes.container}>
        <div className={classes.row}>
          <div className={classes.col}>
            <BurgerIngredients />
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