import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions';
import AppHeader from '../AppHeader/AppHeader';
import BurgerLayout from '../BurgerLayout/BurgerLayout';

function App() {
  const dispatch = useDispatch();
  // const { ingredients } = useSelector((state) => state.order);

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
