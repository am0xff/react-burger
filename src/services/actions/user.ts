import { 
  registerApi, 
  loginApi, 
  logoutApi, 
  getTokenApi, 
  getCodeForResetApi, 
  createNewPasswordApi,
  getUserApi,
  updateProfileApi
} from '../../api/user';
import { 
  User,
  RegisterPayload, 
  LoginPayload, 
  CreateNewPasswordPayload, 
  UpdateProfilePayload 
} from '../types/data';
import { 
  SET_USER,
  GET_USER_REQUEST,
  GET_USER_FAILED,
  GET_USER_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_FAILED,
  LOGOUT_SUCCESS,
  GET_TOKEN_REQUEST,
  GET_TOKEN_FAILED,
  GET_TOKEN_SUCCESS,
  GET_CODE_REQUEST,
  GET_CODE_FAILED,
  GET_CODE_SUCCESS,
  CREATE_PASSWORD_REQUEST,
  CREATE_PASSWORD_FAILED,
  CREATE_PASSWORD_SUCCESS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_FAILED,
  UPDATE_PROFILE_SUCCESS
} from '../constants';
import { AppThunk, AppDispatch } from '../types';

export interface ISetUserAction {
  readonly type: typeof SET_USER;
  readonly payload: User
}

export interface IGetUserAction {
  readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED;
}

export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
}
export interface IRegisterAction {
  readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterFailedAction {
  readonly type: typeof REGISTER_FAILED;
}

export interface IRegisterSuccessAction {
  readonly type: typeof REGISTER_SUCCESS;
}

export interface ILoginAction {
  readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginFailedAction {
  readonly type: typeof LOGIN_FAILED;
}

export interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
}

export interface ILogoutAction {
  readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutFailedAction {
  readonly type: typeof LOGOUT_FAILED;
}

export interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS;
}

export interface IGetTokenAction {
  readonly type: typeof GET_TOKEN_REQUEST;
}

export interface IGetTokenFailedAction {
  readonly type: typeof GET_TOKEN_FAILED;
}

export interface IGetTokenSuccessAction {
  readonly type: typeof GET_TOKEN_SUCCESS;
}

export interface IGetCodeAction {
  readonly type: typeof GET_CODE_REQUEST;
}

export interface IGetCodeFailedAction {
  readonly type: typeof GET_CODE_FAILED;
}

export interface IGetCodeSuccessAction {
  readonly type: typeof GET_CODE_SUCCESS;
}

export interface ICreatePasswordAction {
  readonly type: typeof CREATE_PASSWORD_REQUEST;
}

export interface ICreatePasswordFailedAction {
  readonly type: typeof CREATE_PASSWORD_FAILED;
}

export interface ICreatePasswordSuccessAction {
  readonly type: typeof CREATE_PASSWORD_SUCCESS;
}

export interface IUpdateProfileAction {
  readonly type: typeof UPDATE_PROFILE_REQUEST;
}

export interface IUpdateProfileFailedAction {
  readonly type: typeof UPDATE_PROFILE_FAILED;
}

export interface IUpdateProfileSuccessAction {
  readonly type: typeof UPDATE_PROFILE_SUCCESS;
}

export type TUserActions = 
  | ISetUserAction
  | IGetUserAction 
  | IGetUserFailedAction 
  | IGetUserSuccessAction
  | IRegisterAction 
  | IRegisterFailedAction
  | IRegisterSuccessAction
  | ILoginAction 
  | ILoginFailedAction 
  | ILoginSuccessAction
  | ILogoutAction 
  | ILogoutFailedAction 
  | ILogoutSuccessAction
  | IGetTokenAction 
  | IGetTokenFailedAction 
  | IGetTokenSuccessAction
  | IGetCodeAction 
  | IGetCodeFailedAction
  | IGetCodeSuccessAction
  | ICreatePasswordAction 
  | ICreatePasswordFailedAction
  | ICreatePasswordSuccessAction 
  | IUpdateProfileAction
  | IUpdateProfileFailedAction 
  | IUpdateProfileSuccessAction;


export const setUserAction = (payload: User): ISetUserAction => ({
  type: SET_USER,
  payload
});

export const getUserAction = (): IGetUserAction => ({
  type: GET_USER_REQUEST
});

export const getUserFailedAction = (): IGetUserFailedAction => ({
  type: GET_USER_FAILED
});

export const getUserSuccessAction = (): IGetUserSuccessAction => ({
  type: GET_USER_SUCCESS
});

export const registerAction = (): IRegisterAction => ({
  type: REGISTER_REQUEST
});

export const registerFailedAction = (): IRegisterFailedAction => ({
  type: REGISTER_FAILED
});

export const registerSuccessAction = (): IRegisterSuccessAction => ({
  type: REGISTER_SUCCESS
});

export const loginAction = (): ILoginAction => ({
  type: LOGIN_REQUEST
});

export const loginFailedAction = (): ILoginFailedAction => ({
  type: LOGIN_FAILED
});

export const loginSuccessAction = (): ILoginSuccessAction => ({
  type: LOGIN_SUCCESS
});

export const logoutAction = (): ILogoutAction => ({
  type: LOGOUT_REQUEST
});

export const logoutFailedAction = (): ILogoutFailedAction => ({
  type: LOGOUT_FAILED
});

export const logoutSuccessAction = (): ILogoutSuccessAction => ({
  type: LOGOUT_SUCCESS
});

export const getTokenAction = (): IGetTokenAction => ({
  type: GET_TOKEN_REQUEST
});

export const getTokenFailedAction = (): IGetTokenFailedAction => ({
  type: GET_TOKEN_FAILED
});

export const getTokenSuccessAction = (): IGetTokenSuccessAction => ({
  type: GET_TOKEN_SUCCESS
});

export const getCodeAction = (): IGetCodeAction => ({
  type: GET_CODE_REQUEST
});

export const getCodeFailedAction = (): IGetCodeFailedAction => ({
  type: GET_CODE_FAILED
});

export const getCodeSuccessAction = (): IGetCodeSuccessAction => ({
  type: GET_CODE_SUCCESS
});

export const createPasswordAction = (): ICreatePasswordAction => ({
  type: CREATE_PASSWORD_REQUEST
});

export const createPasswordFailedAction = (): ICreatePasswordFailedAction => ({
  type: CREATE_PASSWORD_FAILED
});

export const createPasswordSuccessAction = (): ICreatePasswordSuccessAction => ({
  type: CREATE_PASSWORD_SUCCESS
});

export const updateProfileAction = (): IUpdateProfileAction => ({
  type: UPDATE_PROFILE_REQUEST
});

export const updateProfileFailedAction = (): IUpdateProfileFailedAction => ({
  type: UPDATE_PROFILE_FAILED
});

export const updateProfileSuccessAction = (): IUpdateProfileSuccessAction => ({
  type: UPDATE_PROFILE_SUCCESS
});

export function register(payload: RegisterPayload): AppThunk {
  return (dispatch: AppDispatch) => {
    dispatch(registerAction());

    registerApi(payload)
    .then(() => {
      dispatch(registerSuccessAction());
    })
    .catch(() => {
      dispatch(registerFailedAction());
    });
  }
}

export function login(payload: LoginPayload): AppThunk {
  return (dispatch: AppDispatch) => {
    dispatch(loginAction());

    loginApi(payload)
    .then((data) => {
      // SAVE TOKEN
      localStorage.setItem('token', data.accessToken);
      
      // SAVE REFRESH_TOKEN
      localStorage.setItem('refreshToken', data.refreshToken);

      dispatch(setUserAction(data.user))

      dispatch(loginSuccessAction());
    })
    .catch(() => {
      dispatch(loginFailedAction());
    });
  }
}

export function logout(): AppThunk {
  return (dispatch: AppDispatch) => {
    dispatch(logoutAction());

    logoutApi()
    .then(() => {
      dispatch(logoutSuccessAction());
      localStorage.clear();
    })
    .catch(() => {
      dispatch(logoutFailedAction());
    });
  }
}

export function getToken(payload: { token?: string, callback: () => void }): AppThunk {
  return (dispatch: AppDispatch) => {
    dispatch(getTokenAction());

    const { token, callback } = payload;

    if(!token) return;

    getTokenApi(token)
    .then((data) => {
      // SAVE TOKEN
      localStorage.setItem('token', data.accessToken);
      
      // SAVE REFRESH_TOKEN
      localStorage.setItem('refreshToken', data.refreshToken);

      dispatch(getTokenSuccessAction());
      // TODO: Сработает ли это?
      callback();
      // dispatch(callback());
    })
    .catch((err) => {      
      dispatch(getTokenFailedAction());
    });
  }
}

export function getCodeForReset({ email }: { email: string }): AppThunk {
  return (dispatch: AppDispatch) => {
    dispatch(getCodeAction());

    getCodeForResetApi(email)
    .then(() => {
      dispatch(getCodeSuccessAction());
    })
    .catch(() => {
      dispatch(getCodeFailedAction());
    });
  }
}

export function createNewPassword(payload: CreateNewPasswordPayload): AppThunk {
  return (dispatch: AppDispatch) => {
    dispatch(createPasswordAction());

    createNewPasswordApi(payload)
    .then(() => {
      dispatch(createPasswordSuccessAction());
    })
    .catch(() => {
      dispatch(createPasswordFailedAction());
    });
  }
}

export function getUser(): AppThunk {
  return (dispatch: AppDispatch) => {
    const refreshToken = localStorage.getItem('refreshToken') || '';

    dispatch(getUserAction());

    getUserApi()
    .then((data) => {
      // TODO: Заменить setUserAction(payload) на getUserSuccessAction(payload)
      dispatch(getUserSuccessAction());
      dispatch(setUserAction(data.user));
    })
    .catch((err) => {
      if (err.status === 403) {
        dispatch(getToken({ token: refreshToken, callback: () => getUser() }));
      } else {
        dispatch(getUserFailedAction());
      }
    });
  }
}

export function updateProfile(payload: UpdateProfilePayload): AppThunk {
  return (dispatch: AppDispatch) => {
    const refreshToken = localStorage.getItem('refreshToken') || '';

    dispatch(updateProfileAction());

    updateProfileApi(payload)
    .then((data) => {
      // TODO: Заменить setUserAction(payload) на updateProfileSuccessAction(payload)
      dispatch(updateProfileSuccessAction());
      dispatch(setUserAction(data.user));
    })
    .catch((err) => {
      if (err.status === 403) {
        dispatch(getToken({ token: refreshToken, callback: () => updateProfile(payload) }));
      } else {
        dispatch(updateProfileFailedAction());
      }
    });
  }
}