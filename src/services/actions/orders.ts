import { createOrderApi } from '../../api/orders';
import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILED, RESET_ORDER_DETAILS } from '../constants';
import { OrderDetails } from '../types/data';
import { AppThunk, AppDispatch } from '../types';

export interface ICreateOrderAction {
  readonly type: typeof CREATE_ORDER_REQUEST;
}

export interface ICreateOrderFailedAction {
  readonly type: typeof CREATE_ORDER_FAILED;
}

export interface ICreateOrderSuccessAction {
  readonly type: typeof CREATE_ORDER_SUCCESS;
  readonly payload: OrderDetails
}

export interface IResetOrderDetailsAction {
  readonly type: typeof RESET_ORDER_DETAILS;
}

export type TOrdersActions = 
  | ICreateOrderAction
  | ICreateOrderFailedAction
  | ICreateOrderSuccessAction
  | IResetOrderDetailsAction;

export const createOrderAction = (): ICreateOrderAction => ({
  type: CREATE_ORDER_REQUEST
});

export const createOrderFailedAction = (): ICreateOrderFailedAction => ({
  type: CREATE_ORDER_FAILED
});

export const createOrderSuccessAction = (payload: OrderDetails): ICreateOrderSuccessAction => ({
  type: CREATE_ORDER_SUCCESS,
  payload
});

export const resetOrderDetailsAction = (): IResetOrderDetailsAction => ({
  type: RESET_ORDER_DETAILS
});

export const createOrder = (payload: string[]) => {
  return (dispatch: AppDispatch) => {
    dispatch(createOrderAction());

    return createOrderApi(payload)
      .then((data) => {
        dispatch(createOrderSuccessAction(data));
      })
      .catch(() => {
        dispatch(createOrderFailedAction());
      });
  }
}