import { 
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from '../constants';
import { TGetIngredientsActions } from '../actions'
import { Ingredient } from '../types/data';

export type IngredientsStore = {
  items: ReadonlyArray<Ingredient>,
  request: boolean,
  failed: boolean,
  success: boolean
}

const initialState: IngredientsStore = {
  items: [],
  request: false,
  failed: false,
  success: false
}

export const ingredientsReducer = (state = initialState, action: TGetIngredientsActions) => {
  switch(action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        request: true,
        failed: false,
        success: false
      }
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        request: false,
        failed: false,
        success: true,
        items: action.payload
      }
    case GET_INGREDIENTS_FAILED:
      return {
        ...state,
        request: false,
        failed: true,
        success: false
      }
    default:
      return state
  }
}