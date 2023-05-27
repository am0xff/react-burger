import { getIngredientsApi } from '../api/ingredients';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const getIngredients = () => {
  return (dispatch: any) => {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    getIngredientsApi()
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