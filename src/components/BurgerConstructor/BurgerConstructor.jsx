import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import useModal from '../Modal/useModal';
import OrderDetails from '../OrderDetails/OrderDetails';
import BurgerConstructorIngredient from './BurgerConstructorIngredient';
import classes from './BurgerConstructor.module.css';

const BurgerConstructor = () => {
  const { open, onOpen, onClose } = useModal();

  return (
    <section className={`${classes.section} pr-4 pl-4`}>
      <div className={`${classes.constructorBody} pl-8 pt-25`}>
        <BurgerConstructorIngredient 
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
        />
        <ul className={`${classes.constructorList}`}>
          <li className={`${classes.constructorItem}`}>
            <BurgerConstructorIngredient 
              isDraggable={true}
              text="Краторная булка N-200i (верх)"
              price={50}
              thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
            />
          </li>
          <li className={`${classes.constructorItem}`}>
            <BurgerConstructorIngredient 
              isDraggable={true}
              text="Краторная булка N-200i (верх)"
              price={50}
              thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
            />
          </li>
          <li className={`${classes.constructorItem}`}>
            <BurgerConstructorIngredient 
              isDraggable={true}
              text="Краторная булка N-200i (верх)"
              price={50}
              thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
            />
          </li>
          <li className={`${classes.constructorItem}`}>
            <BurgerConstructorIngredient 
              isDraggable={true}
              text="Краторная булка N-200i (верх)"
              price={50}
              thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
            />
          </li>
          <li className={`${classes.constructorItem}`}>
            <BurgerConstructorIngredient 
              isDraggable={true}
              text="Краторная булка N-200i (верх)"
              price={50}
              thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
            />
          </li>
        </ul>
        <BurgerConstructorIngredient 
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
        />
      </div>
      <footer className={`${classes.constructorFooter} mt-10`}>
        <p className="text text_type_digits-medium mr-10">
          <span className='mr-2'>610</span>
          <CurrencyIcon className='ml-2' />
        </p>
        <Button 
          htmlType="button" 
          type="primary" 
          size="large"
          onClick={onOpen}
        >
          Нажми на меня
        </Button>
      </footer>
      {open && (
        <Modal onClose={onClose}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  )
}

export default BurgerConstructor;