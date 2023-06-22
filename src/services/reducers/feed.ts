import { 
  FEED_CONNECTION_CLOSE,
  FEED_CONNECTION_SUCCESS,
  FEED_GET_MESSAGE,
  FEED_CONNECTION_ERROR
} from '../constants';
import { TFeedActions } from '../actions';
import { Feed } from '../types/data';

type FeedStore = {
  feed?: Feed,
  wsConnection: boolean,
  error?: Event
}

const initialStore: FeedStore = {
  wsConnection: false
}

export const feedReducer = (state = initialStore, action: TFeedActions) => {
  switch(action.type) {
    case FEED_CONNECTION_CLOSE: {
      return {
        ...state,
        feed: undefined,
        wsConnection: false
      }
    }

    case FEED_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnection: true
      }  
    }

    case FEED_GET_MESSAGE: {
      return {
        ...state,
        feed: action.payload
      }
    }

    case FEED_CONNECTION_ERROR: {
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