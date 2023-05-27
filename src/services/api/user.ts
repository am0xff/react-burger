import { 
  RegisterPayload, 
  RegisterResponse, 
  LoginPayload, 
  LoginResponse,
  LogoutResponse,
  GetTokenResponse,
  GetCodeForResetResponse,
  CreateNewPasswordPayload,
  CreateNewPasswordResponse,
  GetUserResponse,
  UpdateProfileResponse,
  UpdateProfilePayload
} from './types';
import { request } from './';

export const registerApi = (payload: RegisterPayload): Promise<RegisterResponse> => {
  return request('/auth/register', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
}

export const loginApi = (payload: LoginPayload): Promise<LoginResponse> => {
  return request('/auth/login', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
}

export const logoutApi = (): Promise<LogoutResponse> => {
  const refreshToken = localStorage.getItem('refreshToken');

  return request('/auth/logout', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token: refreshToken
    })
  })
}

export const getTokenApi = (token: string): Promise<GetTokenResponse> => {
  return request('/auth/token', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({token})
  })
}

export const getCodeForResetApi = (email: string): Promise<GetCodeForResetResponse> => {
  return request('/password-reset', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  })
}

export const createNewPasswordApi = (payload: CreateNewPasswordPayload): Promise<CreateNewPasswordResponse> => {
  return request('/password-reset/reset', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
}

export const getUserApi = (): Promise<GetUserResponse> => {
  const token = localStorage.getItem('token');

  return request('/auth/user', {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    } as any,
  })
}

export const updateProfileApi = (payload: UpdateProfilePayload): Promise<UpdateProfileResponse> => {
  const token = localStorage.getItem('token');
  
  return request('/auth/user', {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    } as any,
    body: JSON.stringify(payload)
  })
}