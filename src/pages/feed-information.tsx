import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from '../services/hooks';
import { 
  feedConnectionInitAction, 
  feedConnectionCloseAction,
  getIngredients
} from '../services/actions';
import FeedInformationModal from '../components/FeedInformationModal/FeedInformationModal';
import FeedInformationLayout from '../components/FeedInformationLayout/FeedInformationLayout';

const FeedInformationPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  
  useEffect(() => {
    dispatch(feedConnectionInitAction());

    return () => {
      dispatch(feedConnectionCloseAction());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return location.state ? <FeedInformationModal backLink='/feed' /> : <FeedInformationLayout />
}

export default FeedInformationPage;