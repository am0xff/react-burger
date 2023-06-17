import { 
  ORDER_CONNECTION_INIT,
  ORDER_CONNECTION_CLOSE,
  ORDER_CONNECTION_SUCCESS,
  ORDER_GET_MESSAGE,
  ORDER_CONNECTION_ERROR
} from '../constants';
import { Feed } from '../types/data';

export interface IOrderConnectionInitAction {
  readonly type: typeof ORDER_CONNECTION_INIT;
  readonly payload: string;
}

export interface IOrderConnectionCloseAction {
  readonly type: typeof ORDER_CONNECTION_CLOSE;
}

export interface IOrderConnectionSuccessAction {
  readonly type: typeof ORDER_CONNECTION_SUCCESS;
}

export interface IOrderConnectionErrorAction {
  readonly type: typeof ORDER_CONNECTION_ERROR;
  readonly payload: Event
}

export interface IOrderGetMessageAction {
  readonly type: typeof ORDER_GET_MESSAGE;
  readonly payload: Feed
}

export type TOrderActions = 
  | IOrderConnectionInitAction
  | IOrderConnectionCloseAction
  | IOrderConnectionSuccessAction
  | IOrderConnectionErrorAction
  | IOrderGetMessageAction;

export const orderConnectionInitAction = (token: string): IOrderConnectionInitAction => ({
  type: ORDER_CONNECTION_INIT,
  payload: `wss://norma.nomoreparties.space/orders?token=${token}`
});

export const orderConnectionCloseAction = (): IOrderConnectionCloseAction => ({
  type: ORDER_CONNECTION_CLOSE
});

export const orderConnectionSuccessAction = (): IOrderConnectionSuccessAction => ({
  type: ORDER_CONNECTION_SUCCESS
});

export const orderGetMessageAction = (payload: Feed): IOrderGetMessageAction => ({
  type: ORDER_GET_MESSAGE,
  payload
});

export const orderConnectionError = (payload: Event): IOrderConnectionErrorAction => ({
  type: ORDER_CONNECTION_ERROR,
  payload
});

export type TWSOrderActions = {
  wsInit: typeof ORDER_CONNECTION_INIT,
  onOpen: typeof ORDER_CONNECTION_SUCCESS,
  onClose: typeof ORDER_CONNECTION_CLOSE,
  onError: typeof ORDER_CONNECTION_ERROR,
  onMessage: typeof ORDER_GET_MESSAGE
}

export const wsOrderActions: TWSOrderActions = {
  wsInit: ORDER_CONNECTION_INIT,
  onOpen: ORDER_CONNECTION_SUCCESS,
  onClose: ORDER_CONNECTION_CLOSE,
  onError: ORDER_CONNECTION_ERROR,
  onMessage: ORDER_GET_MESSAGE
}