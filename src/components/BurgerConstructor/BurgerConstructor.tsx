import { useEffect, useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import useModal from '../Modal/useModal';
import OrderDetails from '../OrderDetails/OrderDetails';
import { addItemAction, resetOrderDetailsAction, createOrder, getUser } from '../../services/actions';
import { useSelector, useDispatch } from '../../services/hooks';
import BurgerConstructorIngredient from './BurgerConstructorIngredient';
import BurgerConstructorDraggable from './BurgerConstructorDraggable';
import classes from './BurgerConstructor.module.css';

const BurgerConstructor = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth);
  const { items: constructorItems } = useSelector((state) => state.burgerConstructor);
  const { request: orderRequest } = useSelector((state) => state.order);
  const { details: orderDetails } = useSelector((state) => state.order);
  const { items: ingredients } = useSelector((state) => state.ingredients);

  const { onClose } = useModal();
  
  const [_, dropRef] = useDrop({
    accept: 'ingredient',
    drop: (data) => {
      const { id } = data as { id: string };

      const ingredient = ingredients.find(({ _id }) => _id === id);

      if(ingredient) {
        dispatch(addItemAction({...ingredient, uniqueId: v4()}))
      }
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
    dispatch(resetOrderDetailsAction());
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
      {!!orderDetails.name && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails details={orderDetails} />
        </Modal>
      )}
    </section>
  )
}

export default BurgerConstructor;