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



// payload is ->
// {
//   "email": "", 
//   "password": "", 
//   "name": "" 
// } 
// response is ->
// {
//   "success": true,
//   "user": {
//     "email": "",
//     "name": ""
//   },
//   "accessToken": "Bearer ...",
//   "refreshToken": ""
// }
export function register(payload) {
  return (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });

    fetch('https://norma.nomoreparties.space/api/auth/register', {
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
    .then(response => response.json())
    .then((data) => {
      if(!data.success) {
        throw new Error(data.message);
      }

      dispatch({ type: REGISTER_SUCCESS });
    })
    .catch(() => {
      dispatch({ type: REGISTER_FAILED });
    });
  }
}

// payload is ->
// {
//   "email": "", 
//   "password": "" 
// } 
// response is ->
// {
//   "success": true,
//   "accessToken": "Bearer ...",
//   "refreshToken": "",
//   "user": {
//     "email": "",
//     "name": ""
//   }
// } 
export function login(payload) {
  return (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    
    fetch('https://norma.nomoreparties.space/api/auth/login', {
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
    .then(response => response.json())
    .then((data) => {
      if(!data.success) {
        dispatch({ type: LOGIN_FAILED });
        throw new Error(data.message);
      }

      // SAVE TOKEN
      localStorage.setItem('token', data.accessToken);
      
      // SAVE REFRESH_TOKEN
      localStorage.setItem('refreshToken', data.refreshToken);

      dispatch({ type: SET_USER, payload: data.user });

      dispatch({ type: LOGIN_SUCCESS });
    });
  }
}


// payload is
// {
//   "token": "значение refreshToken"
// } 
// response is
// {
//   "success": true,
//   "message": "Successful logout"
// }
export function logout() {
  return (dispatch) => {
    const refreshToken = localStorage.getItem('refreshToken');
    
    dispatch({ type: LOGOUT_REQUEST });

    fetch('https://norma.nomoreparties.space/api/auth/logout', {
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
    .then(response => response.json())
    .then((data) => {
      if(!data.success) {
        dispatch({ type: LOGOUT_FAILED });
      }

      dispatch({ type: LOGOUT_SUCCESS });
      localStorage.clear();
    });
  }
}

// payload is 
// {
//   "token": "значение refreshToken"
// }
// response is
// {
//   "success": true,
//   "accessToken": "Bearer ...",
//   "refreshToken": ""
// }
export function getToken(payload) {
  return (dispatch) => {
    dispatch({ type: GET_TOKEN_REQUEST });

    const { token, callback } = payload;

    fetch('https://norma.nomoreparties.space/api/auth/token', {
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
    .then(response => response.json())
    .then((data) => {
      if(!data.success) {
        throw new Error(data.message);
      }
      
      // SAVE TOKEN
      localStorage.setItem('token', data.accessToken);
      
      // SAVE REFRESH_TOKEN
      localStorage.setItem('refreshToken', data.refreshToken);

      dispatch({ type: GET_TOKEN_SUCCESS });

      dispatch(callback());
    });
  }
}

// payload is 
// {
//   "email": ""
// } 
// response is ->
// {
//   "success": true,
//   "message": "Reset email sent"
// }
export function getCodeForReset(payload) {
  return (dispatch) => {
    dispatch({ type: GET_CODE_REQUEST });

    fetch('https://norma.nomoreparties.space/api/password-reset', {
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
    .then((response) => response.json())
    .then((data) => {
      if (!data.success) {
        dispatch({ type: GET_CODE_FAILED });
      }

      dispatch({ type: GET_CODE_SUCCESS });
    })
  }
}

// payload is
// {
//   "password": "",
//   "token": ""
// }
// response is
// {
//   "success": true,
//   "message": "Password successfully reset"
// }
export function createNewPassword(payload) {
  return (dispatch) => {
    dispatch({ type: CREATE_PASSWORD_REQUEST });

    fetch('https://norma.nomoreparties.space/api/password-reset/reset', {
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
    .then((response) => response.json())
    .then((data) => {
      if (!data.success) {
        dispatch({ type: CREATE_PASSWORD_FAILED });
      }

      dispatch({ type: CREATE_PASSWORD_SUCCESS });
    });
  }
}

// response is
// {
//   "success": true,
//   "user": {
//     "email": "",
//     "name": ""
//   }
// }
export function getUser() {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    dispatch({ type: GET_USER_REQUEST });

    fetch('https://norma.nomoreparties.space/api/auth/user', {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
    })
    .then((response) => response.json())
    .then((data) => {
      if (!data.success && ['jwt expired', 'invalid signature'].includes(data.message)) {
        dispatch({ type: GET_USER_FAILED });
        dispatch(getToken({ name: '1', token: refreshToken, callback: () => getUser() }));
      }

      if (!data.success) {
        throw new Error(data.message)
      }

      dispatch({ type: GET_USER_SUCCESS });
      dispatch({ type: SET_USER, payload: data.user });
    })
    .catch((err) => {
      dispatch({ type: GET_USER_FAILED });
    });
  }
}

// payload is -> ?
// response is -> 
// {
//   "success": true,
//   "user": {
//     "email": "",
//     "name": ""
//   }
// }
export function updateProfile(payload) {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    dispatch({ type: UPDATE_PROFILE_REQUEST });

    fetch('https://norma.nomoreparties.space/api/auth/user', {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(payload)
    })
    .then((response) => response.json())
    .then((data) => {
      if (!data.success && ['jwt expired', 'invalid signature'].includes(data.message)) {
        dispatch({ type: UPDATE_PROFILE_FAILED });
        dispatch(getToken({ name: '2', token: refreshToken, callback: () => updateProfile(payload) }));
      }

      if (!data.success) {
        throw new Error(data.message)
      }

      dispatch({ type: UPDATE_PROFILE_SUCCESS });
      dispatch({ type: SET_USER, payload: data.user });
    })
    .catch((err) => {
      dispatch({ type: UPDATE_PROFILE_FAILED });
    });
  }
}