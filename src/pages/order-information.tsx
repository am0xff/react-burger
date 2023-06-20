import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../services/hooks';
import { 
  orderConnectionInitAction,
  orderConnectionCloseAction,
  getIngredients
} from '../services/actions';
import FeedInformationModal from '../components/FeedInformationModal/FeedInformationModal';
import FeedInformationLayout from '../components/FeedInformationLayout/FeedInformationLayout';

const OrderInformationPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const token = localStorage.getItem('token')?.split(' ')[1];
  const { feed } = useSelector((state) => state.order);
  
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

  return location.state ? <FeedInformationModal backLink='/profile/orders' data={feed} /> : <FeedInformationLayout data={feed} />
}

export default OrderInformationPage;