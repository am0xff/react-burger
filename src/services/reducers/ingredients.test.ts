import { ingredientsReducer as reducer } from './ingredients';
import * as types from '../constants';
import { Ingredient } from '../types/data';
import { TGetIngredientsActions } from '../actions';

const initialState = {
  items: [],
  request: false,
  failed: false,
  success: false
};

const mockPayload = [
  { id: 1, name: 'Ingredient 1' },
  { id: 2, name: 'Ingredient 2' }
] as unknown as ReadonlyArray<Ingredient>;

describe('ingredients reducer', () => {
  it('should return the initial state', () => {
    const nextState = reducer(undefined, {} as TGetIngredientsActions);

    expect(nextState).toEqual(initialState);
  });

  it('should handle GET_INGREDIENTS_REQUEST', () => {
    const action = { type: types.GET_INGREDIENTS_REQUEST };
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual({
      items: [],
      request: true,
      failed: false,
      success: false
    });
  });

  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    const action = {
      type: types.GET_INGREDIENTS_SUCCESS,
      payload: mockPayload
    };

    const nextState = reducer(initialState, action);

    expect(nextState).toEqual({
      items: mockPayload,
      request: false,
      failed: false,
      success: true
    });
  });

  it('should handle GET_INGREDIENTS_FAILED', () => {
    const action = { type: types.GET_INGREDIENTS_FAILED };
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual({
      items: [],
      request: false,
      failed: true,
      success: false
    });
  });
});
