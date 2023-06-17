import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import FeedItem from '../FeedItem/FeedItem';
import classes from './FeedPageLayout.module.css';
import { Ingredient } from '../../services/types/data';

const MAX_ORDERS_LIST_SIZE = 10;

const FeedPageLayout = () => {
  const navigate = useNavigate();

  const { feed } = useSelector((state) => state.feed);
  const { items } = useSelector((state) => state.ingredients);
  
  const ingredientsMap = useMemo(() => {
    return items.reduce((acc, cur) => {
      return {...acc, [cur._id]: cur}
    }, {} as Record<string, Ingredient>);
  }, [items]);

  const doneOrders = useMemo(() => {
    return feed?.orders.filter((order, index) => index < MAX_ORDERS_LIST_SIZE && order.status === 'done') || []
  }, [feed?.orders]);

  const inProgressOrders = useMemo(() => {
    return feed?.orders.filter((order, index) => index < MAX_ORDERS_LIST_SIZE && order.status === 'inprogress') || []
  }, [feed?.orders]);

  const handleClick = (id: number) => {
    navigate(`/feed/${id}`, { state: 'modal' });
  }
  
  return (
    <main className={classes.main}>
      <div className={classes.container}>
        <h1 className="text text_type_main-large">
          Лента заказов
        </h1>
        <div className={classes.feedContainer}>
          <div className={classes.feedList}>
            {feed?.orders.map((order) => {
              const ingredients = order.ingredients.map((ingredientId) => ingredientsMap[ingredientId]);

              return (
                <FeedItem
                  key={order._id} 
                  number={order.number} 
                  name={order.name}
                  ingredients={ingredients}
                  createdAt={order.createdAt}
                  onClick={() => handleClick(order.number)}
                />
              )
            })}
          </div>
          <div className={classes.feedInfo}>
            <div className={classes.feedInfoRow}>
              <div className={classes.feedInfoCell}>
                <p className='text text_type_main-medium'>Готовы:</p>
                <ul className={classes.feedInfoItems}>
                  {
                    doneOrders.map((item) => {
                      return <li key={item._id} style={{ color: '#00CCCC' }} className='text text_type_digits-default'>{item.number}</li>
                    })
                  }
                </ul>
              </div>
              <div className={classes.feedInfoCell}>
                <p className='text text_type_main-medium'>В работе:</p>
                <ul className={classes.feedInfoItems}>
                  {
                    inProgressOrders.map((item) => {
                      return <li key={item._id} className='text text_type_digits-default'>{item.number}</li>
                    })
                  }
                </ul>
              </div>
            </div>
            <div className={classes.feedInfoRow}>
              <div className={classes.feedInfoCell}>
                <p className='text text_type_main-medium'>Выполнено за все время:</p>
                <p className='text text_type_digits-large'>
                  {feed?.total}
                </p>
              </div>
            </div>
            <div className={classes.feedInfoRow}>
              <div className={classes.feedInfoCell}>
                <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
                <p className='text text_type_digits-large'>
                  {feed?.totalToday}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default FeedPageLayout;