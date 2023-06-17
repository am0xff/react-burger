import { useEffect } from 'react';
import { useDispatch } from '../services/hooks';
import { 
  feedConnectionInitAction, 
  feedConnectionCloseAction,
  getIngredients
} from '../services/actions';
import FeedPageLayout from '../components/FeedPageLayout/FeedPageLayout';

const FeedPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(feedConnectionInitAction());

    return () => {
      dispatch(feedConnectionCloseAction());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return <FeedPageLayout />
}

export default FeedPage;