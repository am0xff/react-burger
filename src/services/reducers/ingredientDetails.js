import { 
  ADD_INGREDIENT_DETAILS,
  DELETE_INGREDIENT_DETAILS,
  OPEN_DETAILS_MODAL,
  CLOSE_DETAILS_MODAL
 } from '../actions/ingredientDetails';


const initialState = {
  details: null,
  modal: false
}

export const ingredientReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_INGREDIENT_DETAILS:
      return {
        ...state,
        // details: state.ingredients.find(({ _id }) => action.payload === _id)
        details: action.payload
      }
    case DELETE_INGREDIENT_DETAILS:
      return {
        ...state,
        details: null
      }
    
    case OPEN_DETAILS_MODAL:
      return {
        ...state,
        modal: true
      }
    case CLOSE_DETAILS_MODAL:
      return {
        ...state,
        modal: false
      }
    default:
      return state
  }
}