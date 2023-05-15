import { 
  SET_USER, 
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  GET_TOKEN_REQUEST,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_FAILED,
  GET_CODE_REQUEST,
  GET_CODE_SUCCESS,
  GET_CODE_FAILED,
  CREATE_PASSWORD_REQUEST,
  CREATE_PASSWORD_SUCCESS,
  CREATE_PASSWORD_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILED,
} from '../actions/user';

const initialState = {
  user: null,
  request: false,
  success: false,
  failed: false,
  logoutSuccess: false,
  registerSuccess: false
}

export const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case LOGOUT_REQUEST:
    case GET_TOKEN_REQUEST:
    case GET_CODE_REQUEST:
    case CREATE_PASSWORD_REQUEST:
    case GET_USER_REQUEST:
    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        request: true,
        success: false,
        failed: false,
        logoutSuccess: false,
        registerSuccess: false
      }
    case LOGIN_SUCCESS:
    case GET_TOKEN_SUCCESS:
    case GET_CODE_SUCCESS:
    case CREATE_PASSWORD_SUCCESS:
    case GET_USER_SUCCESS:
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        request: false,
        failed: false,
        logoutSuccess: false,
        success: true
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerSuccess: true
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        logoutSuccess: true
      }
    case REGISTER_FAILED:
    case LOGIN_FAILED:
    case LOGOUT_FAILED:
    case GET_TOKEN_FAILED:
    case GET_CODE_FAILED:
    case CREATE_PASSWORD_FAILED:
    case GET_USER_FAILED:
    case UPDATE_PROFILE_FAILED:
      return {
        ...state,
        request: false,
        logoutSuccess: false,
        success: false,
        registerSuccess: false,
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