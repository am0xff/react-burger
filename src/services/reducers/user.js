import { SET_USER, REQUEST, SUCCESS, FAILED } from '../actions/user';

const initialState = {
  user: null,
  request: false,
  failed: false
}

export const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case REQUEST:
      return {
        ...state,
        request: true
      }
    case SUCCESS:
      return {
        ...state,
        request: false,
        failed: false
      }
    case FAILED:
      return {
        ...state,
        request: false,
        failed: true
      }
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
}