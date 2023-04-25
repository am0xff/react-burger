import { combineReducers } from 'redux';
import { TYPE_INGREDIENT } from '../../utils/constants';

import { 
  GET_INGREDIENTS_REQUEST, 
  GET_INGREDIENTS_SUCCESS, 
  GET_INGREDIENTS_FAILED,
  ADD_INGREDIENT_DETAILS,
  DELETE_INGREDIENT_DETAILS,
  DELETE_ORDER_DETAILS,
  ADD_IN_CONSTRUCTOR,
  DELETE_FROM_CONSTRUCTOR,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  OPEN_DETAILS_MODAL,
  CLOSE_DETAILS_MODAL,
  OPEN_ORDER_MODAL,
  CLOSE_ORDER_MODAL
} from '../actions';

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,

  constructorList: [],
  ingredientDetails: null,

  orderDetails: null,
  orderRequest: false,
  orderFailed: false,

  modalDetails: false,
  modalOrder: false
}

const orderReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsFailed: false
      }
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: false,
        ingredients: action.payload
      }
    case GET_INGREDIENTS_FAILED:
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true
      }
    case ADD_INGREDIENT_DETAILS:
      return {
        ...state,
        ingredientDetails: state.ingredients.find(({ _id }) => action.payload === _id)
      }
    case DELETE_INGREDIENT_DETAILS:
      return {
        ...state,
        ingredientDetails: null
      }
    case DELETE_ORDER_DETAILS:
      return {
        ...state,
        orderDetails: null
      }
    case ADD_IN_CONSTRUCTOR: {
      const newIngredient = state.ingredients.find(({ _id }) => action.payload === _id);
      const isBun = newIngredient.type === TYPE_INGREDIENT.BUN;

      return {
        ...state,
        constructorList: isBun
          ? [...[...state.constructorList].filter(({ type }) => type !== TYPE_INGREDIENT.BUN), newIngredient]
          : [...state.constructorList, newIngredient]
      }
    }
    case DELETE_FROM_CONSTRUCTOR: {
      let deleted = false;
      const newList = [];

      // Filter only first element by id, after that just skip
      for (let i = 0; i < state.constructorList.length; i++) {
        const item = state.constructorList[i];

        if (!deleted && action.payload === item._id) {
          deleted = true;
          continue;
        }

        newList.push(item);
      }

      return {
        ...state,
        constructorList: newList
      }
    }
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        orderRequest: true,
        orderFailed: false
      }
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        orderDetails: action.payload
      }
    case CREATE_ORDER_FAILED:
      return {
        ...state,
        orderRequest: false,
        orderFailed: true
      }
    case OPEN_DETAILS_MODAL:
      return {
        ...state,
        modalDetails: true
      }
    case CLOSE_DETAILS_MODAL:
      return {
        ...state,
        modalDetails: false
      }
    case OPEN_ORDER_MODAL:
      return {
        ...state,
        modalOrder: true
      }
    case CLOSE_ORDER_MODAL:
      return {
        ...state,
        modalOrder: false
      }
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  order: orderReducer
});