import { 
  ConstructorElement, 
  Button, 
  CurrencyIcon,
  DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import classes from './BurgerMaker.module.css';

const BurgerMaker = () => {
  return (
    <section className={`${classes.maker} pr-4 pl-4`}>
      <div className={`${classes.makerBody} pl-8 pt-25`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
        />
        <ul className={`${classes.makerDisplayList}`}>
          <li className={`${classes.makerDisplayItem}`}>
            <div className={classes.makerDisplayItemIcon}>
              <DragIcon />  
            </div>
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={50}
              thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
            />
          </li>
          <li className={`${classes.makerDisplayItem}`}>
            <div className={classes.makerDisplayItemIcon}>
              <DragIcon />  
            </div>
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={50}
              thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
            />
          </li>
          <li className={`${classes.makerDisplayItem}`}>
            <div className={classes.makerDisplayItemIcon}>
              <DragIcon />  
            </div>
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={50}
              thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
            />
          </li>
          <li className={`${classes.makerDisplayItem}`}>
            <div className={classes.makerDisplayItemIcon}>
              <DragIcon />  
            </div>
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={50}
              thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
            />
          </li>
          <li className={`${classes.makerDisplayItem}`}>
            <div className={classes.makerDisplayItemIcon}>
              <DragIcon />  
            </div>
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={50}
              thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
            />
          </li>
        </ul>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
        />
      </div>
      <footer className={`${classes.makerFooter} mt-10`}>
        <p className="text text_type_digits-medium mr-10">
          <span className='mr-2'>610</span>
          <CurrencyIcon className='ml-2' />
        </p>
        <Button htmlType="button" type="primary" size="large">
          Нажми на меня
        </Button>
      </footer>
    </section>
  )
}

export default BurgerMaker;