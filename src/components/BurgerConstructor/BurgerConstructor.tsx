import { useEffect, useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import useModal from '../Modal/useModal';
import OrderDetails from '../OrderDetails/OrderDetails';
import { ADD_ITEM } from '../../services/actions/burgerConstructor';
import { DELETE_ORDER_DETAILS, createOrder } from '../../services/actions/order';
import { getUser } from '../../services/actions/user';
import { AuthStore } from '../../services/reducers/user';
import { OrderStore } from '../../services/reducers/order';
import { IngredientsStore } from '../../services/reducers/ingredients';
import { BurgerConstructorStore } from '../../services/reducers/burgerConstructor';
import BurgerConstructorIngredient from './BurgerConstructorIngredient';
import BurgerConstructorDraggable from './BurgerConstructorDraggable';
import classes from './BurgerConstructor.module.css';

const BurgerConstructor = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate()
  const { user } = useSelector<{ auth: AuthStore }, AuthStore>((state) => state.auth);
  const { items: constructorItems } = useSelector<{ burgerConstructor: BurgerConstructorStore }, BurgerConstructorStore>((state) => state.burgerConstructor);
  const { request: orderRequest } = useSelector<{ order: OrderStore }, OrderStore>((state) => state.order);
  const { details: orderDetails } = useSelector<{ order: OrderStore }, OrderStore>((state) => state.order);
  const { items: ingredients } = useSelector<{ ingredients: IngredientsStore }, IngredientsStore>((state) => state.ingredients);

  const { onClose } = useModal();
  
  const [_, dropRef] = useDrop({
    accept: 'ingredient',
    drop: (data) => {
      const { id } = data as { id: string };

      const ingredient = ingredients.find(({ _id }) => _id === id);

      dispatch({ type: ADD_ITEM, payload: {
        ...ingredient,
        uniqueId: v4()
      } });
    },
    collect: (monitor) => ({
        isOver: monitor.isOver()
    })
  });

  const bun = useMemo(() => {
    return constructorItems.find(({ type }) => type === 'bun');
  }, [constructorItems]);

  const constructorItemsWithoutBun = useMemo(() => {
    return constructorItems.filter(({ type }) => type !== 'bun');
  }, [constructorItems]);

  const totalPrice = useMemo(() => {
    const bunSum = (bun?.price || 0) * 2;
    const ingredientsSum = constructorItemsWithoutBun.reduce((acc, cur) => acc + cur.price, 0);

    return bunSum + ingredientsSum;
  }, [bun?.price, constructorItemsWithoutBun]);

  const handleCreateOrder = () => {
    if (!user) {
      return navigate('/login');
    }

    const payload = [bun?._id, ...constructorItemsWithoutBun.map(({_id}) => _id), bun?._id].filter((item) => item !== undefined);

    dispatch(createOrder(payload as string[]));
  }

  const handleCloseModal = () => {
    onClose();
    dispatch({ type: DELETE_ORDER_DETAILS });
  }

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch])

  return (
    <section className={`${classes.section} pr-4 pl-4 pt-25`}>
      <div ref={dropRef} className={`${classes.constructorBody} pl-8`}>
        {bun && (
          <BurgerConstructorIngredient 
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        )}
        <BurgerConstructorDraggable />
        {bun && (
          <BurgerConstructorIngredient 
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        )}
      </div>
      <footer className={`${classes.constructorFooter} mt-10`}>
        <p className="text text_type_digits-medium mr-10">
          <span className='mr-2'>{totalPrice}</span>
          <span className='ml-2'>
            <CurrencyIcon type='primary'  />
          </span>          
        </p>
        <Button 
          htmlType="button" 
          type="primary" 
          size="large"
          disabled={orderRequest || !constructorItems.length}
          onClick={handleCreateOrder}
        >
          Нажми на меня
        </Button>
      </footer>
      {orderDetails && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails details={orderDetails} />
        </Modal>
      )}
    </section>
  )
}

export default BurgerConstructor;