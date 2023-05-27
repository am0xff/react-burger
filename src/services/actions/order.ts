import { createOrderApi } from '../api/order';

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';
export const DELETE_ORDER_DETAILS = 'DELETE_ORDER_DETAILS';
export const OPEN_ORDER_MODAL = 'OPEN_ORDER_MODAL';
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';

export const createOrder = (payload: string[]) => {
  return (dispatch: any) => {
    dispatch({ type: CREATE_ORDER_REQUEST });

    createOrderApi(payload)
    .then(data => {
      dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    })
    .catch(err => {
      dispatch({ type: CREATE_ORDER_FAILED });
    })
  }
}