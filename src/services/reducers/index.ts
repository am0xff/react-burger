import { combineReducers } from 'redux';
import { burgerConstructorReducer } from './burgerConstructor';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { userReducer } from './user';
import { feedReducer } from './feed';

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  ingredients: ingredientsReducer,
  auth: userReducer,
  feed: feedReducer
});