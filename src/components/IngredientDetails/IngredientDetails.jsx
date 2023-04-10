import PropTypes from 'prop-types';
import IngredientDetailsInfoCard from './IngredientDetailsInfoCard';
import classes from './IngredientDetails.module.css';

const IngredientDetails = ({ 
  image, 
  name,
  calories,
  proteins,
  fat,
  carbohydrates
}) => {
  return (
    <div className={classes.details}>
      <div className={classes.detailsImage}>
        <img src={image} alt={name} />
      </div>
      <p className={`${classes.detailsName} text text_type_main-medium pt-4 pb-8`}>
        {name}
      </p>
      <ul className={classes.detailsList}>
        <li className={classes.detailsItem}>
          <IngredientDetailsInfoCard title={'Калории,ккал'} value={calories} />
        </li>
        <li className={classes.detailsItem}>
          <IngredientDetailsInfoCard title={'Белки, г'} value={proteins} />
        </li>
        <li className={classes.detailsItem}>
          <IngredientDetailsInfoCard title={'Жиры, г'} value={fat} />
        </li>
        <li className={classes.detailsItem}>
          <IngredientDetailsInfoCard title={'Углеводы, г'} value={carbohydrates} />
        </li>
      </ul>
    </div>
  )
}

IngredientDetails.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired, 
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired
}

export default IngredientDetails;