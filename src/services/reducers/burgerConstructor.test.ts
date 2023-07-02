import { burgerConstructorReducer as reducer } from './burgerConstructor';
import { TBurgerConstructorActions } from '../actions';
import { Ingredient } from '../types/data';
import * as types from '../constants';

const initialState = {
  items: []
};

const mockPayload = { _id: '1', name: 'Ingredient' } as unknown as Ingredient & { uniqueId: string };
const mockPayloadArray = [
  { _id: '1', name: 'Ingredient 1' },
  { _id: '2', name: 'Ingredient 2' },
  { _id: '3', name: 'Ingredient 3' },
  { _id: '4', name: 'Ingredient 4' }
] as unknown as ReadonlyArray<Ingredient & { uniqueId: string }>

describe('burgerConstructor reducer', () => {
  it('should return the initial state', () => {
    const nextState = reducer(undefined, {} as TBurgerConstructorActions);

    expect(nextState).toEqual(initialState);
  });

  it('should handle ADD_ITEM', () => {
    const action = { type: types.ADD_ITEM, payload: mockPayload };
    const nextState = reducer(initialState, action)

    expect(nextState).toEqual({ items: [mockPayload] })
  });

  it('should handle DELETE_ITEM', () => {
    const action = { type: types.DELETE_ITEM, payload: '1' }
    const nextState = reducer({ items: [mockPayload] }, action);

    expect(nextState).toEqual({ items: [] })
  });

  it('should handle CHANGE_ORDER', () => {
    const action = { type: types.CHANGE_ORDER, payload: { dragIndex: 0, hoverIndex: 2 } };
    const nextState = reducer({ items: mockPayloadArray }, action);

    expect(nextState).toEqual({ items: [mockPayloadArray[2], mockPayloadArray[1], mockPayloadArray[0], mockPayloadArray[3]] })
  });

  it('should handle RESET', () => {
    const action = { type: types.RESET };
    const nextState = reducer({ items: mockPayloadArray }, action);

    expect(nextState).toEqual({ items: [] });
  });
})