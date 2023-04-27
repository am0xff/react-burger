import { INGREDIENTS_API_URL } from '../../utils/constants';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

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