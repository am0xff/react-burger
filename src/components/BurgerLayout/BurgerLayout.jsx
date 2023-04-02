import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerMaker from '../BurgerMaker/BurgerMaker';
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
            <BurgerMaker />
          </div>
        </div>
      </div>
    </main>
  )
}

export default BurgerLayout;