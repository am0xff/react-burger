import { 
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  DELETE_ORDER_DETAILS,
  OPEN_ORDER_MODAL,
  CLOSE_ORDER_MODAL
} from '../actions/order';

const initialState = {
  details: null,
  request: false,
  failed: false
}

export const orderReducer = (state = initialState, action) => {
  switch(action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        request: true,
        failed: false
      }
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        request: false,
        failed: false,
        details: action.payload
      }
    case CREATE_ORDER_FAILED:
      return {
        ...state,
        request: false,
        failed: true
      }
    case DELETE_ORDER_DETAILS:
      return {
        ...state,
        details: null
      }
    case OPEN_ORDER_MODAL:
      return {
        ...state,
        modalOrder: true
      }
    case CLOSE_ORDER_MODAL:
      return {
        ...state,
        modalOrder: false
      }
    default:
      return state
  }
}