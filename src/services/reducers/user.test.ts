import { userReducer as reducer } from './user';
import { TUserActions } from '../actions';
import { User } from '../types/data';
import * as types from '../constants';

const initialState = {
  user: {} as User,
  request: false,
  success: false,
  failed: false,
  logoutSuccess: false,
  registerSuccess: false
}

describe('user reducer', () => {
  it('should return the initial state', () => {
    const nextState = reducer(undefined, {} as TUserActions);

    expect(nextState).toEqual(initialState)
  });

  describe('should handle', () => {
    it.each([
      [types.REGISTER_REQUEST],
      [types.LOGIN_REQUEST],
      [types.LOGOUT_REQUEST],
      [types.GET_TOKEN_REQUEST],
      [types.GET_CODE_REQUEST],
      [types.CREATE_PASSWORD_REQUEST],
      [types.GET_USER_REQUEST],
      [types.UPDATE_PROFILE_REQUEST],
    ])('%p', (actionType) => {
      const result = {
        user: {},
        request: true,
        success: false,
        failed: false,
        logoutSuccess: false,
        registerSuccess: false
      }

      const action = { type: actionType };
      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(result);
    });

    it.each([
      [types.LOGIN_SUCCESS],
      [types.GET_TOKEN_SUCCESS],
      [types.GET_CODE_SUCCESS],
      [types.CREATE_PASSWORD_SUCCESS],
      [types.GET_USER_SUCCESS],
      [types.UPDATE_PROFILE_SUCCESS],
    ])('%p', (actionType) => {
      const result = {
        user: {},
        request: false,
        failed: false,
        logoutSuccess: false,
        registerSuccess: false,
        success: true
      }

      const action = { type: actionType };
      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(result);
    });

    it('REGISTER_SUCCESS', () => {
      const action = { type: types.REGISTER_SUCCESS };
      const nextState = reducer(initialState, action);

      expect(nextState).toEqual({
        failed: false,
        logoutSuccess: false,
        registerSuccess: true,
        request: false,
        success: false,
        user: {}
      });
    });

    it('LOGOUT_SUCCESS', () => {
      const action = { type: types.LOGOUT_SUCCESS };
      const nextState = reducer(initialState, action);

      expect(nextState).toEqual({
        failed: false,
        logoutSuccess: true,
        registerSuccess: false,
        request: false,
        success: false,
        user: {}
      });
    });

    it.each([
      [types.REGISTER_FAILED],
      [types.LOGIN_FAILED],
      [types.LOGOUT_FAILED],
      [types.GET_TOKEN_FAILED],
      [types.GET_CODE_FAILED],
      [types.CREATE_PASSWORD_FAILED],
      [types.GET_USER_FAILED],
      [types.UPDATE_PROFILE_FAILED],
    ])('%p', (actionType) => {
      const result = {
        user: {},
        request: false,
        logoutSuccess: false,
        success: false,
        registerSuccess: false,
        failed: true
      }

      const action = { type: actionType };
      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(result);
    });

    it('SET_USER', () => {
      const action = { type: types.SET_USER, payload: '123' as unknown as User };
      const nextState = reducer(initialState, action);

      expect(nextState).toEqual({
        ...initialState,
        user: '123'
      });
    });
  });
});