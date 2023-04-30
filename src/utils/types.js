import PropTypes from 'prop-types';
import { TYPE_INGREDIENT } from '../utils/constants';

export const ProductPropTypes = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.oneOf([TYPE_INGREDIENT.BUN, TYPE_INGREDIENT.MAIN, TYPE_INGREDIENT.SAUCE]),
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number
});