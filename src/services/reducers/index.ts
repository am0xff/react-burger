import { combineReducers } from 'redux';
import { burgerConstructorReducer } from './burgerConstructor';
import { ingredientsReducer } from './ingredients';
import { ordersReducer } from './orders';
import { userReducer } from './user';
import { feedReducer } from './feed';

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  orders: ordersReducer,
  ingredients: ingredientsReducer,
  auth: userReducer,
  feed: feedReducer
});