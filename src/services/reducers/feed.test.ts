import { feedReducer as reducer } from './feed';
import { TFeedActions } from '../actions';
import { Feed } from '../types/data';
import * as types from '../constants';

const initialState = {
  wsConnection: false
};

describe('feed reducer', () => {
  it('should return the initial state', () => {
    const nextState = reducer(undefined, {} as TFeedActions);

    expect(nextState).toEqual(initialState)
  });

  it('should handle FEED_CONNECTION_CLOSE', () => {
    const action = { type: types.FEED_CONNECTION_CLOSE };
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual({
      wsConnection: false
    })
  });

  it('should handle FEED_CONNECTION_SUCCESS', () => {
    const action = { type: types.FEED_CONNECTION_SUCCESS };
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual({ wsConnection: true });
  });

  it('should handle FEED_GET_MESSAGE', () => {
    const action = { type: types.FEED_GET_MESSAGE, payload: 'somefeed' as unknown as Feed };
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual({
      feed: 'somefeed',
      wsConnection: true
    });
  });

  it('should handle FEED_CONNECTION_ERROR', () => {
    const action = { type: types.FEED_CONNECTION_ERROR, payload: 'someerror' as unknown as Event };
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual({
      error: 'someerror',
      wsConnection: false
    });
  });
})