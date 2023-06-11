export type IngredientType = 'bun' | 'main' | 'sauce';

export type Ingredient = {
  _id: string,
  name: string,
  type: IngredientType,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number
}

export type OrderDetails = {
  name: string,
  order: { number: number },
  success: boolean
}

export type IngredientDetails = {
  image: string,
  name: string, 
  calories: number,
  proteins: number,
  fat: number,
  carbohydrates: number
}

export type User = { 
  email: string, 
  name: string, 
  password?: string 
}

export type LoginResponse = {
  success: boolean,
  accessToken: string,
  refreshToken: string,
  user: User,
  // user: {
  //   email: string,
  //   name: string
  // },
  message: string
}

export type LoginPayload = {
  email: string, 
  password: string 
}

export type RegisterResponse = {
  success: boolean,
  user: User,
  // user: {
  //   email: string,
  //   name: string
  // },
  accessToken: string,
  refreshToken: string,
  message: string
}

export type RegisterPayload = { 
  name: string,
  email: string, 
  password: string 
}

export type LogoutResponse = {
  success: boolean,
  message: string
}

export type GetTokenResponse = {
  success: boolean,
  accessToken: string,
  refreshToken: string,
  message: string
}

export type GetCodeForResetResponse = {
  success: boolean,
  message: string
}

export type CreateNewPasswordResponse = {
  success: boolean,
  message: string
}

export type CreateNewPasswordPayload = {
  password: string,
  token: string
}

export type GetUserResponse = {
  success: boolean,
  // user: {
  //   email: string,
  //   name: string
  // },
  user: User,
  message: string
}

export type UpdateProfileResponse = {
  success: boolean,
  // user: {
  //   email: string,
  //   name: string
  // },
  user: User,
  message: string
}

export type UpdateProfilePayload = {
  email: string,
  name: string,
  password: string
}

