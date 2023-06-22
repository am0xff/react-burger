import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Order, Ingredient, OrderStatus } from '../../services/types/data';
import classes from './FeedInformation.module.css';

type Props = Omit<Order, '_id' | 'ingredients' | 'status' | 'createdAt' | 'updatedAt' | 'name'> & {
  name?: string,
  status?: string,
  ingredients: Ingredient[],
  createdAt: string,
  hideTitle?: boolean
}

const statusLabel: Record<OrderStatus, string> = {
  created: 'Создан',
  pending: 'Готовится',
  done: 'Выполнен',
};

const FeedInformation = ({ name, status, number, createdAt, ingredients, hideTitle }: Props) => {
  const totalPrice = ingredients.reduce((acc, cur) => acc + cur.price, 0);

  const reducedIngredients = ingredients.reduce((acc, cur) => {
    if(acc[cur._id]) {
      acc[cur._id].count++;
    } else {
      acc[cur._id] = {
        ...cur,
        count: 1
      }
    }

    return acc;
  }, {} as Record<string, Ingredient & { count: number }>);
  
  return (
    <div className={classes.feed}>
      {!hideTitle && (
        <p className={`${classes.feedNumber} text text_type_digits-default`}>
          #{number}
        </p>
      )}
      <p className='text text_type_main-medium'>
        {name}
      </p>
      <p className={`${classes.feedStatus} text text_type_main-default`}>
        {statusLabel[status as OrderStatus]}
      </p>
      <div className={classes.feedComposition}>
        <p className='text text_type_main-medium'>
          Состав:
        </p>
        <ul className={classes.feedCompositionList}>
          {Object.values(reducedIngredients).map((ingredient, index) => {
            const { _id, name, image_mobile, count, price } = ingredient;

            return (
              <li key={_id + index} className={classes.feedCompositionItem}>
                <div className={classes.feedCompositionImage}>
                  <img src={image_mobile} alt="" />
                </div>
                <p className={`${classes.feedCompositionName} text text_type_main-default`}>
                  {name}
                </p>
                <div className={classes.feedCompositionPrice}>
                  <span className='text text_type_digits-default'>{count} X {price}</span>
                  <CurrencyIcon type='primary' />
                </div>
              </li>
              )
          })}
        </ul>
      </div>
      <div className={classes.feedFooter}>
        <p className='text text_type_main-default text_color_inactive'>
          {new Date(createdAt).toDateString()}
        </p>
        <div className={classes.feedPrice}>
          <p className='text text_type_digits-default'>
            {totalPrice}
          </p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  )
}

export default FeedInformation;