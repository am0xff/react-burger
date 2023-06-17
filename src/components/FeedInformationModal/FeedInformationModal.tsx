import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import { Ingredient } from '../../services/types/data';
import Modal from '../Modal/Modal';
import FeedInformation from '../FeedInformation/FeedInformation';

const FeedInformationModal = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { feed } = useSelector((state) => state.feed);
  const { items } = useSelector((state) => state.ingredients);

  const currentOrder = feed?.orders.find(({ number }) => !!id && number === +id);
  const ingredientsMap = useMemo(() => {
    return items.reduce((acc, cur) => ({...acc, [cur._id]: cur}), {} as Record<string, Ingredient>)
  }, [items]);

  const ingredients = currentOrder?.ingredients.map((ingredient) => ingredientsMap && ingredientsMap[ingredient]) || [];

  const handleClose = () => {
    navigate('/feed');
  }

  if (!currentOrder) {
    return null;
  }
  
  return (
    <Modal heading={`#${currentOrder.number}`} onClose={handleClose}>
      <div className='mt-2'>
        <FeedInformation
          status={currentOrder.status}
          number={currentOrder.number}
          ingredients={ingredients} 
          name={currentOrder.name} 
          createdAt={currentOrder.createdAt}
          hideTitle
        />
      </div>
    </Modal>
  )
}

export default FeedInformationModal;