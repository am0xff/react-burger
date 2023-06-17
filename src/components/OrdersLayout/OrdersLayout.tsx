import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import FeedItem from '../FeedItem/FeedItem';
import { Ingredient } from '../../services/types/data';
import classes from './OrdersLayout.module.css';

const OrdersLayout = () => {
  const navigate = useNavigate();
  const { feed } = useSelector((state) => state.order);
  const { items } = useSelector((state) => state.ingredients);

  const ingredientsMap = useMemo(() => {
    return items.reduce((acc, cur) => {
      return {...acc, [cur._id]: cur}
    }, {} as Record<string, Ingredient>);
  }, [items]);

  const handleClick = (id: number) => {
    navigate(`/profile/orders/${id}`);
  }

  return (
    <div className={classes.container}>
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
  )
}

export default OrdersLayout;