import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import classes from './OrderDetails.module.css';
import { OrderDetails as OrderDetailsType } from '../../services/types/data';
import { resetAction } from '../../services/actions';
import doneImage from '../../images/done.png';

type Props = {
  details: OrderDetailsType
}

const OrderDetails = ({ details }: Props) => {
  const dispatch = useDispatch();
  const { order, success } = details;

  if (!success) {
    <div className={`${classes.details} pt-20 pb-20`}>
      <p className={`${classes.detailsNumber} text text_type_digits-large`}>
        Ошибка
      </p>
    </div>
  }

  useEffect(() => {
    dispatch(resetAction());
  }, [dispatch])

  return (
    <div className={`${classes.details} pt-20 pb-20`}>
      <p className={`${classes.detailsNumber} text text_type_digits-large`}>
        {order.number}
      </p>
      <p className='text text_type_main-medium mt-8'>
        идентификатор заказа
      </p>
      <div className={classes.detailsImage}>
        <img src={doneImage} alt="done" />
      </div>
      <p className='text text_type_main-default'>
        Ваш заказ начали готовить
      </p>
      <p className='text text_type_main-default text_color_inactive mt-2'>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}

export default OrderDetails;