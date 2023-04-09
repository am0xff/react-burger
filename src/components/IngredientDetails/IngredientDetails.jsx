import PropTypes from 'prop-types';
import classes from './IngredientDetails.module.css';

const InfoCard = ({ title, value }) => {
  return (
    <>
      <p className="text text_type_main-default text_color_inactive">
        {title}
      </p>
      <p className="text text_type_digits-default text_color_inactive">
        {value}
      </p>
    </>
  )
}

InfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
}

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
          <InfoCard title={'Калории,ккал'} value={calories} />
        </li>
        <li className={classes.detailsItem}>
          <InfoCard title={'Белки, г'} value={proteins} />
        </li>
        <li className={classes.detailsItem}>
          <InfoCard title={'Жиры, г'} value={fat} />
        </li>
        <li className={classes.detailsItem}>
          <InfoCard title={'Углеводы, г'} value={carbohydrates} />
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