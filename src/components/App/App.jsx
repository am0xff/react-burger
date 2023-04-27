import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';
import AppHeader from '../AppHeader/AppHeader';
import BurgerLayout from '../BurgerLayout/BurgerLayout';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  return (
    <>
      <AppHeader />
      <BurgerLayout />
    </>
  );
}

export default App;
