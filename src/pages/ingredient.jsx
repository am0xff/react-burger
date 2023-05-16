import { useLocation } from 'react-router-dom';
import IngredientModal from '../components/IngredientModal/IngredientModal';
import IngredientLayout from '../components/IngredientLayout/IngredientLayout';

const IngredientPage = () => {
  const location = useLocation();

  return location.state ? <IngredientModal /> : <IngredientLayout />
}

export default IngredientPage;