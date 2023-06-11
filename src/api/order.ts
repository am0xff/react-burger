import { request } from './';
import { OrderDetails } from '../services/types/data'

export const createOrderApi = (payload: string[]): Promise<OrderDetails> => {
  return request('/orders', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ingredients: payload })
  })
}