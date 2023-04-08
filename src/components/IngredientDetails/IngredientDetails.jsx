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

const IngredientDetails = ({ 
  image, 
  name,  
  proteins,
  fat,
  carbohydrates,
  calories
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

export default IngredientDetails;