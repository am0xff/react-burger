import { useCallback, useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import useModal from '../Modal/useModal';
import OrderDetails from '../OrderDetails/OrderDetails';
import { ADD_IN_CONSTRUCTOR, DELETE_ORDER_DETAILS, DELETE_FROM_CONSTRUCTOR, createOrder } from '../../services/actions';
import { TYPE_INGREDIENT } from '../../utils/constants';
import BurgerConstructorIngredient from './BurgerConstructorIngredient';
import BurgerConstructorDraggable from './BurgerConstructorDraggable';
import classes from './BurgerConstructor.module.css';

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { constructorList, orderRequest, orderDetails } = useSelector((state) => ({
    constructorList: state.order.constructorList,
    orderRequest: state.order.orderRequest,
    orderDetails: state.order.orderDetails
  }));
  const { onClose } = useModal();
  
  const [{ isOver }, dropRef] = useDrop({
    accept: 'ingredient',
    drop: ({ id }) => {
      dispatch({ type: ADD_IN_CONSTRUCTOR, payload: id });
    },
    collect: (monitor) => ({
        isOver: monitor.isOver()
    })
  });

  const bun = useMemo(() => {
    return constructorList.find(({ type }) => type === TYPE_INGREDIENT.BUN);
  }, [constructorList]);

  const ingredientsWithoutBun = useMemo(() => {
    return constructorList.filter(({ type }) => type !== TYPE_INGREDIENT.BUN);
  }, [constructorList]);

  const totalPrice = useMemo(() => {
    const bunSum = (bun?.price || 0) * 2;
    const ingredientsSum = ingredientsWithoutBun.reduce((acc, cur) => acc + cur.price, 0);

    return bunSum + ingredientsSum;
  }, [bun?.price, ingredientsWithoutBun]);

  const handleDelete = useCallback((id) => {
    dispatch({ type: DELETE_FROM_CONSTRUCTOR, payload: id })
  }, [dispatch]);

  const handleCreateOrder = () => {
    dispatch(createOrder([bun._id, ...ingredientsWithoutBun.map(({_id}) => _id), bun._id]));
  }

  const handleCloseModal = () => {
    onClose();
    dispatch({ type: DELETE_ORDER_DETAILS });
  }

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
        {!!ingredientsWithoutBun.length && (
          <BurgerConstructorDraggable ingredients={ingredientsWithoutBun} onDelete={handleDelete} />
        )}
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
          <CurrencyIcon className='ml-2' />
        </p>
        <Button 
          htmlType="button" 
          type="primary" 
          size="large"
          disabled={orderRequest || !constructorList.length}
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