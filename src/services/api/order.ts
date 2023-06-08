import { request } from './';

export const createOrderApi = (payload: string[]): Promise<unknown> => {
  return request('/orders', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ingredients: payload })
  })
}