import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { store } from '../store';
import { TBurgerConstructorActions, TGetIngredientsActions, TOrderActions, TUserActions } from '../actions'

type TApplicationActions = TBurgerConstructorActions | TGetIngredientsActions | TOrderActions | TUserActions;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>