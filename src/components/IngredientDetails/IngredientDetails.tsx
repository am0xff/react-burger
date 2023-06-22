import { IngredientDetails as IngredientDetailsType } from '../../services/types/data';
import IngredientDetailsInfoCard from './IngredientDetailsInfoCard';
import classes from './IngredientDetails.module.css';

type Props = IngredientDetailsType;

const IngredientDetails = ({ 
  image, 
  name,
  calories,
  proteins,
  fat,
  carbohydrates
}: Props) => {
  return (
    <>
      <div className={classes.image}>
        <img src={image} alt={name} />
      </div>
      <p className={`${classes.name} text text_type_main-medium pt-4 pb-8`}>
        {name}
      </p>
      <ul className={classes.list}>
        <li className={classes.item}>
          <IngredientDetailsInfoCard title={'Калории,ккал'} value={calories} />
        </li>
        <li className={classes.item}>
          <IngredientDetailsInfoCard title={'Белки, г'} value={proteins} />
        </li>
        <li className={classes.item}>
          <IngredientDetailsInfoCard title={'Жиры, г'} value={fat} />
        </li>
        <li className={classes.item}>
          <IngredientDetailsInfoCard title={'Углеводы, г'} value={carbohydrates} />
        </li>
      </ul>
    </>
  )
}

export default IngredientDetails;