import { request } from './';
import { Ingredient } from './types';

export const getIngredientsApi = (): Promise<{ data: Ingredient[] }> => {
  return request('/ingredients')
}