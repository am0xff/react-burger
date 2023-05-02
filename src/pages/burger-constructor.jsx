import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../services/actions/ingredients';
import AppHeader from '../components/AppHeader/AppHeader';
import BurgerLayout from '../components/BurgerLayout/BurgerLayout';

const BurgerConstructorPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <BurgerLayout />
    </>
  );
}

export default BurgerConstructorPage;
