import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import classes from './BurgerConstructor.module.css';

const BurgerConstructorIngredient = ({ 
  isDraggable,
  type = '',
  text,
  price,
  isLocked = false,
  thumbnail
}) => {
  return (
    <div className={classes.constructorIngredient}>
      {isDraggable && (
        <div className={classes.constructorIngredientIcon}>
          <DragIcon />
        </div>
      )}
      <ConstructorElement
        type={type}
        text={text}
        price={price}
        isLocked={isLocked}
        thumbnail={thumbnail}
      />
    </div>
  )
}

BurgerConstructorIngredient.propTypes = {
  isDraggable: PropTypes.bool,
  type: PropTypes.oneOf(['top', 'bottom']),
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  isLocked: PropTypes.bool,
  thumbnail: PropTypes.string.isRequired
}

export default BurgerConstructorIngredient;