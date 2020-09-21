import { authReducer } from './index';
import {
  FETCH_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_IN_PROGRESS,
  LOGIN_SUCCESS,
  UPDATE_ACCESS_TOKEN,
  UPDATE_TOKENS
} from '../../actionTypes';

describe('Auth Reducer', () => {
  it('should return initial state', () => {
    expect(authReducer(undefined, { type: 'test' })).toEqual({
      loginInProgress: false,
      loginSuccess: false,
      loginError: '',
      jwt: '',
      refreshToken: '',
      name: '',
      email: '',
      avatarUrl: '',
      fetchUserInProgress: false,
      fetchUserSuccess: false,
      fetchUserError: ''
    });
  });

  describe('LOGIN_IN_PROGRESS', () => {
    it('should return correct state', () => {
      const action = { type: LOGIN_IN_PROGRESS, value: true };
      expect(authReducer({}, action)).toEqual({
        loginInProgress: true
      });
    });
  });

  describe('LOGIN_SUCCESS', () => {
    it('should return correct state', () => {
      const action = {
        type: LOGIN_SUCCESS,
        value: true,
        jwt: 'jwt',
        refreshToken: 'it is refreshing'
      };
      expect(authReducer({}, action)).toEqual({
        loginSuccess: true,
        jwt: 'jwt',
        refreshToken: 'it is refreshing'
      });
    });
  });

  describe('FETCH_USER_SUCCESS', () => {
    it('should return correct state', () => {
      const action = {
        type: FETCH_USER_SUCCESS,
        value: true,
        name: 'Alice',
        email: 'dev@arc.test',
        avatarUrl: 'http://test.com'
      };
      expect(authReducer({}, action)).toEqual({
        fetchUserSuccess: true,
        name: 'Alice',
        email: 'dev@arc.test',
        avatarUrl: 'http://test.com'
      });
    });
  });

  describe('LOGIN_FAILURE', () => {
    it('should return correct state', () => {
      const action = { type: LOGIN_FAILURE, error: 'fail' };
      expect(authReducer({}, action)).toEqual({
        loginError: 'fail'
      });
    });
  });

  describe('UPDATE_TOKENS', () => {
    it('should return correct state', () => {
      const action = {
        type: UPDATE_TOKENS,
        jwt: 'jwt',
        refreshToken: 'it is refreshing'
      };
      expect(authReducer({}, action)).toEqual({
        jwt: 'jwt',
        refreshToken: 'it is refreshing'
      });
    });
  });

  describe('UPDATE_ACCESS_TOKEN', () => {
    it('should return correct state', () => {
      const action = {
        type: UPDATE_ACCESS_TOKEN,
        jwt: 'jwt'
      };
      expect(authReducer({}, action)).toEqual({
        jwt: 'jwt'
      });
    });
  });
});
