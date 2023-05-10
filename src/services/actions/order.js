import { CREATE_ORDER_API_URL } from '../../utils/constants';

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';
export const DELETE_ORDER_DETAILS = 'DELETE_ORDER_DETAILS';
export const OPEN_ORDER_MODAL = 'OPEN_ORDER_MODAL';
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';

export const createOrder = (payload) => {
  return (dispatch) => {
    const token = localStorage.getItem('token');

    if(!token) {
      // редирект на LOGIN
    }

    dispatch({ type: CREATE_ORDER_REQUEST });

    fetch(CREATE_ORDER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ingredients: payload })
    })
    .then(response => {
      if (!response.ok) {
        dispatch({ type: CREATE_ORDER_FAILED });
      }

      return response.json()
    })
    .then(data => {
      dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    })
    .catch(err => {
      dispatch({ type: CREATE_ORDER_FAILED });
    })
  }
}