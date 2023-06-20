import { useEffect } from 'react';
import { useDispatch } from '../services/hooks';
import { 
  orderConnectionInitAction, 
  orderConnectionCloseAction,
  getIngredients
} from '../services/actions';
import OrdersLayout from '../components/OrdersLayout/OrdersLayout';

const OrderPage = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token')?.split(' ')[1];
  
  useEffect(() => {
    if (token) {
      dispatch(orderConnectionInitAction(token));
    }

    return () => {
      dispatch(orderConnectionCloseAction());
    }
  }, [token, dispatch]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);


  return <OrdersLayout />
}

export default OrderPage;