const BASE_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res: any) => {
  if (res.ok) {
    return res.json();
  }
  
  return Promise.reject(res);
};

const checkSuccess = (res: any) => {
  if (res && res.success) {
    return res;
  }

  return Promise.reject(res);
};

export const request = <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};
