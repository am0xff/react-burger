import { 
  ORDER_CONNECTION_CLOSE,
  ORDER_CONNECTION_SUCCESS,
  ORDER_GET_MESSAGE,
  ORDER_CONNECTION_ERROR
} from '../constants';
import { TOrderActions } from '../actions';
import { Feed } from '../types/data';

type OrderStore = {
  feed?: Feed,
  wsConnection: boolean,
  error?: Event
}

const initialStore: OrderStore = {
  wsConnection: false
}

export const orderReducer = (state = initialStore, action: TOrderActions) => {
  switch(action.type) {
    case ORDER_CONNECTION_CLOSE: {
      return {
        ...state,
        feed: undefined,
        wsConnection: false
      }
    }

    case ORDER_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnection: true
      }  
    }

    case ORDER_GET_MESSAGE: {
      return {
        ...state,
        feed: action.payload
      }
    }

    case ORDER_CONNECTION_ERROR: {
      return {
        ...state,
        wsConnection: false,
        error: action.payload
      }
    }

    default:
      return state;
  }
}