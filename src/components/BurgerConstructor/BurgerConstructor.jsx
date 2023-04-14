import { useCallback, useContext, useMemo, useState } from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import useModal from '../Modal/useModal';
import OrderDetails from '../OrderDetails/OrderDetails';
import BurgerConstructorIngredient from './BurgerConstructorIngredient';
import { ConstructorContext } from '../../services/constructorContext';
import classes from './BurgerConstructor.module.css';

const API_URL = 'https://norma.nomoreparties.space/api/orders';

const BurgerConstructor = () => {
  const { constructorState, constructorDispatcher } = useContext(ConstructorContext);
  const { open, onOpen, onClose } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState();

  const { bun, products } = constructorState;

  const handleDelete = useCallback((productId) => {
    constructorDispatcher({ type: 'delete', payload: productId })
  }, [constructorDispatcher])

  const totalPrice = useMemo(() => {
    const bunPrice = bun?.price || 0;
    const productsSum = products.reduce((acc, cur) => acc + cur.price, 0);

    return productsSum + bunPrice * 2
  }, [bun, products]);

  const createOrder = () => {
    setIsLoading(true);

    const ingredients = [bun._id, ...products.map((_id) => _id)];

    console.log('ingredients - ', ingredients);

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ingredients })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: Status code ${response.status}`)
      }

      return response.json()
    })
    .then(data => {
      setDetails(data);
      onOpen();
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  return (
    <section className={`${classes.section} pr-4 pl-4`}>
      <div className={`${classes.constructorBody} pl-8 pt-25`}>
        {bun && (
          <BurgerConstructorIngredient 
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image_mobile}
        />
        )}
        {!!products.length && (
          <ul className={`${classes.constructorList}`}>
            {products.map((product) => {
              return (
                <li className={`${classes.constructorItem}`} key={product._id}>
                  <BurgerConstructorIngredient 
                    isDraggable={true}
                    text={product.name}
                    price={product.price}
                    thumbnail={product.image}
                    onDelete={() => handleDelete(product._id)}
                  />
                </li>
              )
            })}
          </ul>
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
          disabled={isLoading}
          onClick={createOrder}
        >
          Нажми на меня
        </Button>
      </footer>
      {open && (
        <Modal onClose={onClose}>
          <OrderDetails details={details} />
        </Modal>
      )}
    </section>
  )
}

export default BurgerConstructor;