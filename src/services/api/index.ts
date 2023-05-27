import { BASE_API_URL } from "./constants"

const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  
  if (res.status === 403) {
    return res.json();
  }

  return Promise.reject(res);
}

export const request = <T>(endpoint: string, options: RequestInit): Promise<T & { message: string }> => {
  return fetch(`${BASE_API_URL}${endpoint}`, options)
    .then<T & { message: string }>(checkResponse)
}