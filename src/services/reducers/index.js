import { combineReducers } from 'redux';
import { burgerConstructorReducer } from './burgerConstructor';
import { ingredientReducer } from './ingredientDetails';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  ingredient: ingredientReducer,
  ingredients: ingredientsReducer,
  order: orderReducer
});