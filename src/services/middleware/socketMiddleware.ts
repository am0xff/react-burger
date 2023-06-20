import type { Middleware, MiddlewareAPI } from 'redux';
import { getToken } from '../actions';
import { AppDispatch, RootState, AppActions, TWSStoreActions } from '../types';

export const socketMiddleware = (wsActions: TWSStoreActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: AppActions) => {
      const { dispatch } = store;
      
      const { wsInit, onOpen, onError, onClose, onMessage } = wsActions;

      if (action.type === wsInit) {
        socket = new WebSocket(action.payload);
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event })
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { message } = parsedData;

          if (message && message === 'Invalid or missing token') {
            const refreshToken = localStorage.getItem('refreshToken');

            if (refreshToken) {
              dispatch(getToken({ token: refreshToken }));
            }
          } else {
            dispatch({ type: onMessage, payload: parsedData });
          }
        };
      }

      if (action.type === onClose && socket) {
        socket.close();
      }

      next(action);
    }
  }) as Middleware;
};
