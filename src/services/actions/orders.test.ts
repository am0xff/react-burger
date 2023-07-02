import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import * as actions from './';
import * as types from '../constants';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Actions orders', () => {
  it('should create an action createOrderSuccessAction with correct data', () => {
    const payload = {
      name: 'name',
      order: {
        number: 111
      },
      success: true
    }

    expect(actions.createOrderSuccessAction(payload)).toEqual({
      type: types.CREATE_ORDER_SUCCESS,
      payload: payload
    });
  })
});

describe('async actions orders', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('CREATE_ORDER_SUCCESS', () => {
    fetchMock.postOnce('https://norma.nomoreparties.space/api/orders', {
      body: { success: true },
      headers: { 'content-type': 'application/json' }
    });
    
    const store = mockStore({})

    //@ts-ignore
    return store.dispatch(actions.createOrder(['1', '2'])).then(() => {
      expect(store.getActions()).toEqual([
        { type: types.CREATE_ORDER_REQUEST }, 
        { type: types.CREATE_ORDER_SUCCESS, payload: { success: true } }
      ]);
    })
  })
});