import { 
  registerApi, 
  loginApi, 
  logoutApi, 
  getTokenApi, 
  getCodeForResetApi, 
  createNewPasswordApi,
  getUserApi,
  updateProfileApi
} from '../api/user';
import { 
  RegisterPayload, 
  LoginPayload, 
  CreateNewPasswordPayload, 
  UpdateProfilePayload 
} from '../api/types';

export const SET_USER = 'SET_USER';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const GET_TOKEN_REQUEST = 'GET_TOKEN_REQUEST';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_TOKEN_FAILED = 'GET_TOKEN_FAILED';

export const GET_CODE_REQUEST = 'GET_CODE_REQUEST';
export const GET_CODE_SUCCESS = 'GET_CODE_SUCCESS';
export const GET_CODE_FAILED = 'GET_CODE_FAILED';

export const CREATE_PASSWORD_REQUEST = 'CREATE_PASSWORD_REQUEST';
export const CREATE_PASSWORD_SUCCESS = 'CREATE_PASSWORD_SUCCESS';
export const CREATE_PASSWORD_FAILED = 'CREATE_PASSWORD_FAILED';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILED = 'UPDATE_PROFILE_FAILED';

export function register(payload: RegisterPayload) {
  return (dispatch: any) => {
    dispatch({ type: REGISTER_REQUEST });

    registerApi(payload)
    .then(() => {
      dispatch({ type: REGISTER_SUCCESS });
    })
    .catch(() => {
      dispatch({ type: REGISTER_FAILED });
    });
  }
}

export function login(payload: LoginPayload) {
  return (dispatch: any) => {
    dispatch({ type: LOGIN_REQUEST });

    loginApi(payload)
    .then((data) => {
      // SAVE TOKEN
      localStorage.setItem('token', data.accessToken);
      
      // SAVE REFRESH_TOKEN
      localStorage.setItem('refreshToken', data.refreshToken);

      dispatch({ type: SET_USER, payload: data.user });

      dispatch({ type: LOGIN_SUCCESS });
    })
    .catch(() => {
      dispatch({ type: LOGIN_FAILED });
    });
  }
}

export function logout() {
  return (dispatch: any) => {
    dispatch({ type: LOGOUT_REQUEST });

    logoutApi()
    .then(() => {
      dispatch({ type: LOGOUT_SUCCESS });
      localStorage.clear();
    })
    .catch(() => {
      dispatch({ type: LOGOUT_FAILED });
    });
  }
}

export function getToken(payload: { token?: string, callback: () => void }) {
  return (dispatch: any) => {
    dispatch({ type: GET_TOKEN_REQUEST });

    const { token, callback } = payload;

    if(!token) return;

    getTokenApi(token)
    .then((data) => {
      // SAVE TOKEN
      localStorage.setItem('token', data.accessToken);
      
      // SAVE REFRESH_TOKEN
      localStorage.setItem('refreshToken', data.refreshToken);

      dispatch({ type: GET_TOKEN_SUCCESS });

      dispatch(callback());
    })
    .catch((err) => {      
      dispatch({ type: GET_TOKEN_FAILED });
    });
  }
}

export function getCodeForReset({ email }: { email: string }) {
  return (dispatch: any) => {
    dispatch({ type: GET_CODE_REQUEST });

    getCodeForResetApi(email)
    .then(() => {
      dispatch({ type: GET_CODE_SUCCESS });
    })
    .catch(() => {
      dispatch({ type: GET_CODE_FAILED });
    });
  }
}

export function createNewPassword(payload: CreateNewPasswordPayload) {
  return (dispatch: any) => {
    dispatch({ type: CREATE_PASSWORD_REQUEST });

    createNewPasswordApi(payload)
    .then(() => {
      dispatch({ type: CREATE_PASSWORD_SUCCESS });
    })
    .catch(() => {
      dispatch({ type: CREATE_PASSWORD_FAILED });
    });
  }
}

export function getUser() {
  return (dispatch: any) => {
    const refreshToken = localStorage.getItem('refreshToken') || '';

    dispatch({ type: GET_USER_REQUEST });

    getUserApi()
    .then((data) => {
      dispatch({ type: GET_USER_SUCCESS });
      dispatch({ type: SET_USER, payload: data.user });
    })
    .catch((err) => {
      dispatch({ type: GET_USER_FAILED });

      if (err.status === 403) {
        dispatch(getToken({ token: refreshToken, callback: () => getUser() }));
      }
    });
  }
}

export function updateProfile(payload: UpdateProfilePayload) {
  return (dispatch: any) => {
    const refreshToken = localStorage.getItem('refreshToken') || '';

    dispatch({ type: UPDATE_PROFILE_REQUEST });

    updateProfileApi(payload)
    .then((data) => {
      dispatch({ type: UPDATE_PROFILE_SUCCESS });
      dispatch({ type: SET_USER, payload: data.user });
    })
    .catch((err) => {
      dispatch({ type: UPDATE_PROFILE_FAILED });

      if (err.status === 403) {
        dispatch(getToken({ token: refreshToken, callback: () => updateProfile(payload) }));
      }
    });
  }
}