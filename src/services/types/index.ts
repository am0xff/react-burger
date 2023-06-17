import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { store } from '../store';
import { 
  TBurgerConstructorActions, 
  TGetIngredientsActions, 
  TOrdersActions, 
  TUserActions,
  TFeedActions,
  TWSFeedActions,
  TOrderActions,
  TWSOrderActions
} from '../actions'

export type AppActions = TBurgerConstructorActions | TGetIngredientsActions | TOrdersActions | TUserActions | TFeedActions | TOrderActions;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActions>
export type TWSStoreActions = TWSFeedActions | TWSOrderActions;