import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import * as actions from './';
import * as types from '../constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Actions orders', () => {
  it('should create an action setUserAction with correct data', () => {
    const payload = {
      email: 'test@mail.com',
      name: 'name',
      password: '12345678',
    }

    expect(actions.setUserAction(payload)).toEqual({
      type: types.SET_USER,
      payload: payload
    });
  })
});

describe('async actions ingredients', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('GET_INGREDIENTS_SUCCESS', () => {
    fetchMock.getOnce('https://norma.nomoreparties.space/api/auth/user', {
      body: { user: 123, success: true },
      headers: { 'content-type': 'application/json' }
    });
    
    const store = mockStore({ items: [] })

    //@ts-ignore
    return store.dispatch(actions.getUser()).then(() => {
      expect(store.getActions()).toEqual([
        { type: types.GET_USER_REQUEST }, 
        { type: types.GET_USER_SUCCESS },
        { type: types.SET_USER, payload: 123 },
      ]);
    })
  })
});