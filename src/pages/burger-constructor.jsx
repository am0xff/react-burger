import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation, useMatch } from 'react-router-dom';
import { getIngredients } from '../services/actions/ingredients';
import BurgerLayout from '../components/BurgerLayout/BurgerLayout';
import AppHeader from '../components/AppHeader/AppHeader';

const BurgerConstructorPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isRoot = useMatch('/');
  const isModal = location.state === 'modal';

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      {!!isRoot || isModal ? <BurgerLayout /> : null}
      <Outlet />
    </>
  );
}

export default BurgerConstructorPage;
