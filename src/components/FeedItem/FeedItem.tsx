import { useMemo } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Order, Ingredient, OrderStatus } from '../../services/types/data';
import classes from './FeedItem.module.css';

type Props = Omit<Order, '_id' | 'ingredients' | 'status' | 'createdAt' | 'updatedAt'> & {
  status?: string,
  ingredients: Ingredient[],
  createdAt: string,
  onClick: () => void
}

const statusLabel: Record<OrderStatus, string> = {
  created: 'Создан',
  inprogress: 'Готовится',
  done: 'Выполнен',
};

const MAX_INGREDIENTS = 6;

const FeedItem = ({ name, status, number, ingredients, createdAt, onClick }: Props) => {
  const price = useMemo(() => {
    return ingredients.reduce((acc, cur) => acc + cur.price, 0)
  }, [ingredients]);
  
  return (
    <div className={classes.feed} onClick={onClick}>
      <div className={classes.feedHeader}>
        <p className='text text_type_digits-default'>
          #{number}
        </p>
        <p className='text text_type_main-default text_color_inactive'>
          {new Date(createdAt).toDateString()}
        </p>
      </div>
      <div className={classes.feedTitle}>
        <p className="text text_type_main-medium">
          {name}
        </p>
        {!!status && (
          <p className='text text_type_main-default'>
            {statusLabel[status as OrderStatus]}
          </p>
        )}
      </div>
      
      <div className={classes.feedFooter}>
        <div className={classes.feedIngredients}>
          {
            ingredients
              .filter((_, index) => index < MAX_INGREDIENTS)
              .map((ingredient, index) => {
                const size = ingredients.length;

                const style = {
                  left: `-${index * 16}px`,
                  zIndex: size - index
                }

                const isLast = index + 1 === MAX_INGREDIENTS && size - MAX_INGREDIENTS !== 0;

                return (
                  <div key={ingredient._id + index} style={style} className={classes.feedIngredient}>
                    <img src={ingredient.image_mobile} alt="" />
                    {isLast && <span className={classes.feedIngredientCount + ' text text_type_main-default'}>+{size - MAX_INGREDIENTS}</span>}
                  </div>
                )
              })
          }
        </div>
        <div className={classes.feedPrice}>
          <p className='text text_type_digits-default'>
            {price}
          </p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  )
}

export default FeedItem;