import PropTypes from 'prop-types';
import classes from './OrderDetails.module.css';
import doneImage from '../../images/done.png';

const OrderDetails = ({ 
  numberOrder = '034536',
}) => {
  return (
    <div className={`${classes.details} pt-20 pb-20`}>
      <p className={`${classes.detailsNumber} text text_type_digits-large`}>
        {numberOrder}
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

OrderDetails.propTypes = {
  numberOrder: PropTypes.string.isRequired
}

export default OrderDetails;