import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import classes from './BurgerIngredients.module.css';

const BurgerIngredients = () => {
  return (
    <section className={`${classes.ingredients} pb-10`}>
      <h2 className='text text_type_main-large pt-10 pb-5'>
          Соберите бургер
      </h2>
      <div className={`${classes.ingredientsTabs}`}>
        <Tab active>
          Булки
        </Tab>
        <Tab>
          Соусы
        </Tab>
        <Tab>
          Начинки
        </Tab>
      </div>
      <div className={classes.ingredientsBody}>
        <h3 className='text text_type_main-medium mt-10 mb-6'>
          Булки
        </h3>
        <ul className={`${classes.ingredientsList} pl-4 pr-4`}>
          <li className={classes.ingredient}>
            <div className={`${classes.ingredientImage} pl-4 pr-4`}>
              <Counter count={1} size="default" extraClass="m-1" />
              <img src="https://code.s3.yandex.net/react/code/bun-02.png" alt="Краторная булка N-200i" />
            </div>
            <p className={`${classes.ingredientPrice} text text_type_digits-default mt-1 mb-1`}>
              1255 <CurrencyIcon className='ml-2' />
            </p>
            <p className='text text_type_main-default'>
              Краторная булка N-200i
            </p>
          </li>
          <li className={classes.ingredient}>
            <div className={`${classes.ingredientImage} pl-4 pr-4`}>
              <img src="https://code.s3.yandex.net/react/code/bun-02.png" alt="Краторная булка N-200i" />
            </div>
            <p className={`${classes.ingredientPrice} text text_type_digits-default mt-1 mb-1`}>
              1255 <CurrencyIcon className='ml-2' />
            </p>
            <p className='text text_type_main-default'>
              Краторная булка N-200i
            </p>
          </li>
        </ul>
        <h3 className='text text_type_main-medium mt-10 mb-6'>
          Соусы
        </h3>
        <ul className={`${classes.ingredientsList} pl-4 pr-4`}>
          <li className={classes.ingredient}>
            <div className={`${classes.ingredientImage} pl-4 pr-4`}>
              <img src="https://code.s3.yandex.net/react/code/bun-02.png" alt="Краторная булка N-200i" />
            </div>
            <p className={`${classes.ingredientPrice} text text_type_digits-default mt-1 mb-1`}>
              1255 <CurrencyIcon className='ml-2' />
            </p>
            <p className='text text_type_main-default'>
              Краторная булка N-200i
            </p>
          </li>
          <li className={classes.ingredient}>
            <div className={`${classes.ingredientImage} pl-4 pr-4`}>
              <img src="https://code.s3.yandex.net/react/code/bun-02.png" alt="Краторная булка N-200i" />
            </div>
            <p className={`${classes.ingredientPrice} text text_type_digits-default mt-1 mb-1`}>
              1255 <CurrencyIcon className='ml-2' />
            </p>
            <p className='text text_type_main-default'>
              Краторная булка N-200i
            </p>
          </li>
        </ul>
        <h3 className='text text_type_main-medium mt-10 mb-6'>
          Начинки
        </h3>
        <ul className={`${classes.ingredientsList} pl-4 pr-4`}>
          <li className={classes.ingredient}>
            <div className={`${classes.ingredientImage} pl-4 pr-4`}>
              <img src="https://code.s3.yandex.net/react/code/bun-02.png" alt="Краторная булка N-200i" />
            </div>
            <p className={`${classes.ingredientPrice} text text_type_digits-default mt-1 mb-1`}>
              1255 <CurrencyIcon className='ml-2' />
            </p>
            <p className='text text_type_main-default'>
              Краторная булка N-200i
            </p>
          </li>
          <li className={classes.ingredient}>
            <div className={`${classes.ingredientImage} pl-4 pr-4`}>
              <img src="https://code.s3.yandex.net/react/code/bun-02.png" alt="Краторная булка N-200i" />
            </div>
            <p className={`${classes.ingredientPrice} text text_type_digits-default mt-1 mb-1`}>
              1255 <CurrencyIcon className='ml-2' />
            </p>
            <p className='text text_type_main-default'>
              Краторная булка N-200i
            </p>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default BurgerIngredients;