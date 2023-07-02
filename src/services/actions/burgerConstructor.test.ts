import * as actions from './';
import * as types from '../constants';
import { Ingredient } from '../types/data';

describe('Actions burgerConstructor', () => {
  it('should create an action addItemAction with correct data', () => {
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
      image_large: 'https://image.png',
      uniqueId: '1'
    } as Ingredient & { uniqueId: string };

    expect(actions.addItemAction(payload)).toEqual({
      type: types.ADD_ITEM,
      payload
    });
  });

  it('should create an action deleteItemAction with correct data', () => {
    const payload = '1';

    expect(actions.deleteItemAction(payload)).toEqual({
      type: types.DELETE_ITEM,
      payload: payload
    });
  });

  it('should create an action changeOrderAction with correct data', () => {
    const payload = { dragIndex: 0, hoverIndex: 1 };

    expect(actions.changeOrderAction(payload)).toEqual({
      type: types.CHANGE_ORDER,
      payload: payload
    });
  });
})