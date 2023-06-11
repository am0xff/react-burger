import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation, useMatch } from 'react-router-dom';
import { getIngredients } from '../services/actions';
import BurgerLayout from '../components/BurgerLayout/BurgerLayout';

const BurgerConstructorPage = () => {
  const dispatch: any = useDispatch();
  const location = useLocation();
  const isRoot = useMatch('/');
  const isModal = location.state === 'modal';

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      {!!isRoot || isModal ? <BurgerLayout /> : null}
      <Outlet />
    </>
  );
}

export default BurgerConstructorPage;
