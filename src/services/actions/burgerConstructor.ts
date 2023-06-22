import { ADD_ITEM, DELETE_ITEM, CHANGE_ORDER, RESET } from '../constants';
import { Ingredient } from '../types/data';

export interface IAddItemAction {
  readonly type: typeof ADD_ITEM;
  readonly payload: Ingredient & { uniqueId: string }
}

export interface IDeleteItemAction {
  readonly type: typeof DELETE_ITEM;
  readonly payload: string
}

export interface IChangeOrderAction {
  readonly type: typeof CHANGE_ORDER;
  readonly payload: { dragIndex: number, hoverIndex: number }
}

export interface IResetAction {
  readonly type: typeof RESET;
}

export type TBurgerConstructorActions = 
  | IAddItemAction
  | IDeleteItemAction
  | IChangeOrderAction
  | IResetAction;

export const addItemAction = (payload: IAddItemAction['payload']): IAddItemAction => ({
  type: ADD_ITEM,
  payload
});

export const deleteItemAction = (id: string): IDeleteItemAction => ({
  type: DELETE_ITEM,
  payload: id
});

export const changeOrderAction = (payload: IChangeOrderAction['payload']): IChangeOrderAction => ({
  type: CHANGE_ORDER,
  payload
});

export const resetAction = (): IResetAction => ({
  type: RESET
})