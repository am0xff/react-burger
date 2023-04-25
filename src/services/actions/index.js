import { BASE_API_URL } from '../../utils/constants';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';

export const ADD_INGREDIENT_DETAILS = 'ADD_INGREDIENT_DETAILS';
export const DELETE_INGREDIENT_DETAILS = 'DELETE_INGREDIENT_DETAILS';

export const ADD_IN_CONSTRUCTOR = 'ADD_IN_CONSTRUCTOR';
export const DELETE_FROM_CONSTRUCTOR = 'DELETE_FROM_CONSTRUCTOR';

export const DELETE_ORDER_DETAILS = 'DELETE_ORDER_DETAILS';

export const OPEN_DETAILS_MODAL = 'OPEN_DETAILS_MODAL';
export const CLOSE_DETAILS_MODAL = 'CLOSE_DETAILS_MODAL';

export const OPEN_ORDER_MODAL = 'OPEN_ORDER_MODAL';
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';

const INGREDIENTS_API_URL = `${BASE_API_URL}/ingredients`;
const CREATE_ORDER_API_URL = `${BASE_API_URL}/orders`;

export const getIngredients = () => {
  return (dispatch) => {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    fetch(INGREDIENTS_API_URL)
      .then(response => {
        if (!response.ok) {
          dispatch({
            type: GET_INGREDIENTS_FAILED
          });
        }
        
        return response.json();
      })
      .then(({ data }) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          payload: data
        });
      })
      .catch(() => {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        });
      })
  };
}

export const createOrder = (payload) => {
  return (dispatch) => {
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