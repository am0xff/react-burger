import { request } from './';
import { Ingredient } from '../services/types/data';

export const getIngredientsApi = (): Promise<{ data: Ingredient[] }> => {
  return request('/ingredients')
}