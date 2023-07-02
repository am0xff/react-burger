import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import * as actions from './';
import * as types from '../constants';
import { Ingredient } from '../types/data';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Actions ingredients', () => {
  it('should create an action getIngredientsSuccessAction with correct data', () => {
    const payload = {
      _id: '1',
      __v: 1,
      name: '1',
      type: 'bun',
      proteins: 1,
      fat: 1,
      carbohydrates: 1,
      calories: 1,
      price: 1,
      image: 'https://image.png',
      image_mobile: 'https://image.png',
      image_large: 'https://image.png'
    };

    // @ts-ignore
    expect(actions.getIngredientsSuccessAction([payload] as Ingredient[])).toEqual({
      type: types.GET_INGREDIENTS_SUCCESS,
      payload: [payload]
    });
  });
});

describe('async actions ingredients', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('GET_INGREDIENTS_SUCCESS', () => {
    fetchMock.getOnce('https://norma.nomoreparties.space/api/ingredients', {
      body: { data: { ingredients: [1, 2] }, success: true },
      headers: { 'content-type': 'application/json' }
    });
    
    const store = mockStore({ items: [] })

    //@ts-ignore
    return store.dispatch(actions.getIngredients()).then(() => {
      expect(store.getActions()).toEqual([
        { type: types.GET_INGREDIENTS_REQUEST }, 
        { type: types.GET_INGREDIENTS_SUCCESS, payload: { ingredients: [1, 2] } }
      ]);
    })
  })
});
  