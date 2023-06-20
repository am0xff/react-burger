import { request } from './';
import { OrderDetails } from '../services/types/data'

export const createOrderApi = (payload: string[]): Promise<OrderDetails> => {
  const token = localStorage.getItem('token');

  return request('/orders', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    } as any,
    body: JSON.stringify({ ingredients: payload })
  })
}