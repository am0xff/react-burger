import { orderReducer as reducer } from './order';
import { TOrderActions } from '../actions';
import { Feed } from '../types/data';
import * as types from '../constants';

const initialState = {
  wsConnection: false
};

describe('order reducer', () => {
  it('should return the initial state', () => {
    const nextState = reducer(undefined, {} as TOrderActions);

    expect(nextState).toEqual(initialState)
  });

  it('should handle ORDER_CONNECTION_CLOSE', () => {
    const action = { type: types.ORDER_CONNECTION_CLOSE };
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual({
      wsConnection: false
    })
  });

  it('should handle ORDER_CONNECTION_SUCCESS', () => {
    const action = { type: types.ORDER_CONNECTION_SUCCESS };
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual({ wsConnection: true });
  });

  it('should handle ORDER_GET_MESSAGE', () => {
    const action = { type: types.ORDER_GET_MESSAGE, payload: 'somefeed' as unknown as Feed };
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual({
      feed: 'somefeed',
      wsConnection: true
    });
  });

  it('should handle ORDER_CONNECTION_ERROR', () => {
    const action = { type: types.ORDER_CONNECTION_ERROR, payload: 'someerror' as unknown as Event };
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual({
      error: 'someerror',
      wsConnection: false
    });
  });
})