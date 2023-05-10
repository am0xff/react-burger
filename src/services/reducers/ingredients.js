import { 
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from '../actions/ingredients';

const initialState = {
  items: [],
  request: false,
  failed: false,
  success: false
}

export const ingredientsReducer = (state = initialState, action) => {
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