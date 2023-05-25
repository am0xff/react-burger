export type IngredientType = 'bun' | 'main' | 'sauce';

export type Ingredient = {
  _id: string,
  name: string,
  type: IngredientType,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number
}

export type OrderDetails = {
  name: string,
  order: { number: number },
  success: boolean
}

export type IngredientDetails = {
  image: string,
  name: string, 
  calories: number,
  proteins: number,
  fat: number,
  carbohydrates: number
}

// IngredientDetails.propTypes = {
//   image: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired, 
//   calories: PropTypes.number.isRequired,
//   proteins: PropTypes.number.isRequired,
//   fat: PropTypes.number.isRequired,
//   carbohydrates: PropTypes.number.isRequired
// }