import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import { Feed, Ingredient } from '../../services/types/data';
import FeedInformation from '../FeedInformation/FeedInformation';
import classes from './FeedInformationLayout.module.css';

type Props = {
  data?: Feed
}

const FeedInformationLayout = ({ data }: Props) => {
  const { id } = useParams();
  const { items } = useSelector((state) => state.ingredients);

  const currentOrder = data?.orders.find(({ number }) => !!id && number === +id);
  const ingredientsMap = useMemo(() => {
    return items.reduce((acc, cur) => ({...acc, [cur._id]: cur}), {} as Record<string, Ingredient>)
  }, [items]);

  if (!currentOrder) {
    return null;
  }

  const ingredients = currentOrder?.ingredients.map((ingredient) => ingredientsMap && ingredientsMap[ingredient]) || [];

  return (
    <main className={classes.main}>
      <div className={classes.container}>
        {currentOrder && (
          <FeedInformation 
            status={currentOrder.status}
            number={currentOrder.number}
            ingredients={ingredients} 
            name={currentOrder.name} 
            createdAt={currentOrder.createdAt}
          />
        )}
      </div>
    </main>
  )
}

export default FeedInformationLayout;