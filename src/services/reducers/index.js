import { combineReducers } from 'redux';
import { burgerConstructorReducer } from './burgerConstructor';
import { ingredientReducer } from './ingredientDetails';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { userReducer } from './user';

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  ingredient: ingredientReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  auth: userReducer
});