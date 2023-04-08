import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import classes from './BurgerIngredients.module.css';

const Ingredient = ({ image, price, name }) => {
  return (
    <>
      <div className={`${classes.ingredientImage} pl-4 pr-4`}>
        <Counter count={1} size="default" extraClass="m-1" />
        <img src={image} alt={name} />
      </div>
      <p className={`${classes.ingredientPrice} text text_type_digits-default mt-1 mb-1`}>
        {price} <CurrencyIcon className='ml-2' />
      </p>
      <p className='text text_type_main-default'>
        {name}
      </p>
    </>
  )
}

const BurgerIngredients = ({ bunList, mainList, sauceList }) => {
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
          {bunList.map((product) => (
            <li className={classes.ingredient}>
              <Ingredient 
                image={product.image} 
                name={product.name}
                price={product.price}
              />
            </li>
          ))}
        </ul>
        <h3 className='text text_type_main-medium mt-10 mb-6'>
          Соусы
        </h3>
        <ul className={`${classes.ingredientsList} pl-4 pr-4`}>
          {mainList.map((product) => (
            <li className={classes.ingredient}>
              <Ingredient 
                image={product.image} 
                name={product.name}
                price={product.price}
              />
            </li>
          ))}
        </ul>
        <h3 className='text text_type_main-medium mt-10 mb-6'>
          Начинки
        </h3>
        <ul className={`${classes.ingredientsList} pl-4 pr-4`}>
          {sauceList.map((product) => (
            <li className={classes.ingredient}>
              <Ingredient 
                image={product.image} 
                name={product.name}
                price={product.price}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default BurgerIngredients;