import { ordersReducer as reducer } from './orders';
import { TOrdersActions } from '../actions';
import { OrderDetails } from '../types/data';
import * as types from '../constants';

const initialState = {
  details: {} as OrderDetails,
  request: false,
  failed: false
};

const mockPayload = { data: '123' } as unknown as OrderDetails;

describe('orders reducer', () => {
  it('should return the initial state', () => {
    const nextState = reducer(undefined, {} as TOrdersActions);

    expect(nextState).toEqual(initialState)
  });

  it('should handle CREATE_ORDER_REQUEST', () => {
    const action = { type: types.CREATE_ORDER_REQUEST };
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual({ details: {}, failed: false, request: true });
  });

  it('should handle CREATE_ORDER_SUCCESS', () => {
    const action = { type: types.CREATE_ORDER_SUCCESS, payload: mockPayload };
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual({ details: mockPayload, failed: false, request: false });
  });

  it('should handle CREATE_ORDER_FAILED', () => {
    const action = { type: types.CREATE_ORDER_FAILED };
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual({ details: {}, failed: true, request: false });
  });

  it('should handle RESET_ORDER_DETAILS', () => {
    const action = { type: types.RESET_ORDER_DETAILS };
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });
})