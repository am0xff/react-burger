export const SET_USER = 'SET_USER';
export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILED = 'FAILED';

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

      // SAVE TOKEN
      // localStorage.setItem('token', data.accessToken);
      
      // SAVE REFRESH_TOKEN
      // localStorage.setItem('refreshToken', data.refreshToken);

      // dispatch({ type: SET_USER, payload: data.user });

      window.location.href = window.location.origin + '/login';
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
        throw new Error(data.message);
      }

      // SAVE TOKEN
      localStorage.setItem('token', data.accessToken);
      
      // SAVE REFRESH_TOKEN
      localStorage.setItem('refreshToken', data.refreshToken);

      dispatch({ type: SET_USER, payload: data.user });
      // redirect
      window.location.href = localStorage.getItem('url') || window.location.origin + '/';
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
export function logout(payload) {
  return (dispatch) => {
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
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then((data) => {
      if(!data.success) {
        throw new Error(data.message);
      }

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
      body: JSON.stringify(payload)
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
      
      // redirect
      window.location.href = localStorage.getItem('url') || window.location.origin + '/'
    })
    .catch(() => {
      localStorage.clear();
      window.location.href = window.location.origin + '/login';
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
        throw new Error(data.message);
      }

      window.location.href = window.location.origin + '/reset-password'
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
        throw new Error(data.message);
      }

      window.location.href = window.location.origin + '/login'
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

    dispatch({ type: REQUEST });

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
      // if (!data.success) {
      //   throw new Error(data.message);
      // }

      if (!data.success && data.message && data.message === 'jwt expired') {
        dispatch(getToken({ token: refreshToken }));
      }

      dispatch({ type: SUCCESS });
      dispatch({ type: SET_USER, payload: data.user });
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
  const token = localStorage.getItem('token');

  if (!token) {
    console.log('Token is not exist');
  }

  return (dispatch) => {
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
  }
}