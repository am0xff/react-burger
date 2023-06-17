import { 
  FEED_CONNECTION_INIT,
  FEED_CONNECTION_CLOSE,
  FEED_CONNECTION_SUCCESS,
  FEED_GET_MESSAGE,
  FEED_CONNECTION_ERROR
} from '../constants';
import { Feed } from '../types/data';

export interface IFeedConnectionInitAction {
  readonly type: typeof FEED_CONNECTION_INIT;
  readonly payload: string;
}

export interface IFeedConnectionCloseAction {
  readonly type: typeof FEED_CONNECTION_CLOSE;
}

export interface IFeedConnectionSuccessAction {
  readonly type: typeof FEED_CONNECTION_SUCCESS;
}

export interface IFeedConnectionErrorAction {
  readonly type: typeof FEED_CONNECTION_ERROR;
  readonly payload: Event
}

export interface IFeedGetMessageAction {
  readonly type: typeof FEED_GET_MESSAGE;
  readonly payload: Feed
}

export type TFeedActions = 
  | IFeedConnectionInitAction
  | IFeedConnectionCloseAction
  | IFeedConnectionSuccessAction
  | IFeedConnectionErrorAction
  | IFeedGetMessageAction;

export const feedConnectionInitAction = (): IFeedConnectionInitAction => ({
  type: FEED_CONNECTION_INIT,
  payload: 'wss://norma.nomoreparties.space/orders/all'
});

export const feedConnectionCloseAction = (): IFeedConnectionCloseAction => ({
  type: FEED_CONNECTION_CLOSE
});

export const feedConnectionSuccessAction = (): IFeedConnectionSuccessAction => ({
  type: FEED_CONNECTION_SUCCESS
});

export const feedGetMessageAction = (payload: Feed): IFeedGetMessageAction => ({
  type: FEED_GET_MESSAGE,
  payload
});

export const feedConnectionError = (payload: Event): IFeedConnectionErrorAction => ({
  type: FEED_CONNECTION_ERROR,
  payload
});

export type TWSFeedActions = {
  wsInit: typeof FEED_CONNECTION_INIT,
  onOpen: typeof FEED_CONNECTION_SUCCESS,
  onClose: typeof FEED_CONNECTION_CLOSE,
  onError: typeof FEED_CONNECTION_ERROR,
  onMessage: typeof FEED_GET_MESSAGE
}

export const wsFeedActions: TWSFeedActions = {
  wsInit: FEED_CONNECTION_INIT,
  onOpen: FEED_CONNECTION_SUCCESS,
  onClose: FEED_CONNECTION_CLOSE,
  onError: FEED_CONNECTION_ERROR,
  onMessage: FEED_GET_MESSAGE
}