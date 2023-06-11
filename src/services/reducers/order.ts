import { OrderDetails } from '../types/data';
import { 
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  RESET_ORDER_DETAILS,
} from '../constants';
import { TOrderActions } from '../actions';

export type OrderStore = {
  details: OrderDetails,
  request: boolean,
  failed: boolean
}

const initialState: OrderStore = {
  details: {} as OrderDetails,
  request: false,
  failed: false
}

export const orderReducer = (state = initialState, action: TOrderActions) => {
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
    case RESET_ORDER_DETAILS:
      return {
        ...state,
        details: {} as OrderDetails
      }
    default:
      return state
  }
}