import { getIngredientsApi } from '../../api/ingredients';
import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED } from '../constants';
import { Ingredient } from '../types/data';
import { AppThunk, AppDispatch } from '../types';

export interface IGetIngredientsAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: ReadonlyArray<Ingredient>
}

export type TGetIngredientsActions = 
  | IGetIngredientsAction
  | IGetIngredientsFailedAction
  | IGetIngredientsSuccessAction;

export const getIngredientsAction = (): IGetIngredientsAction => ({
  type: GET_INGREDIENTS_REQUEST
});

export const getIngredientsFailedAction = (): IGetIngredientsFailedAction => ({
  type: GET_INGREDIENTS_FAILED
});

export const getIngredientsSuccessAction = (payload: ReadonlyArray<Ingredient>) => ({
  type: GET_INGREDIENTS_SUCCESS,
  payload
})

export const getIngredients = (): AppThunk => {
  return (dispatch: AppDispatch) => {
    dispatch(getIngredientsAction());
    getIngredientsApi()
    .then(({ data }) => {
      dispatch(getIngredientsSuccessAction(data));
    })
    .catch(() => {
      dispatch(getIngredientsFailedAction());
    })
  };
}