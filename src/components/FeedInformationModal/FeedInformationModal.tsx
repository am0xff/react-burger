import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import { Ingredient, Feed } from '../../services/types/data';
import Modal from '../Modal/Modal';
import FeedInformation from '../FeedInformation/FeedInformation';

type Props = {
  data?: Feed;
  backLink: string;
}

const FeedInformationModal = ({ backLink, data }: Props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { items } = useSelector((state) => state.ingredients);

  const currentOrder = data?.orders.find(({ number }) => !!id && number === +id);
  const ingredientsMap = useMemo(() => {
    return items.reduce((acc, cur) => ({...acc, [cur._id]: cur}), {} as Record<string, Ingredient>)
  }, [items]);

  const handleClose = () => {
    navigate(backLink);
  }

  if (!currentOrder) {
    return null;
  }

  const ingredients = currentOrder.ingredients.map((ingredient) => ingredientsMap && ingredientsMap[ingredient]);
  
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