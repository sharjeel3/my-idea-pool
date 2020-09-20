import { signupReducer } from './index';
import {
  RESET_SIGNUP,
  SIGNUP_FAILURE,
  SIGNUP_IN_PROGRESS,
  SIGNUP_SUCCESS
} from '../../actionTypes';

describe('Signup Reducer', () => {
  it('should return initial state', () => {
    expect(signupReducer(undefined, { type: 'test' })).toEqual({
      signupInProgress: false,
      signupSuccess: false,
      signupError: '',
      response: {}
    });
  });

  describe('SIGNUP_IN_PROGRESS', () => {
    it('should return correct state', () => {
      const action = { type: SIGNUP_IN_PROGRESS, value: true };
      expect(signupReducer({}, action)).toEqual({
        signupInProgress: true
      });
    });
  });

  describe('SIGNUP_SUCCESS', () => {
    it('should return correct state', () => {
      const action = { type: SIGNUP_SUCCESS, value: true, response: 'test' };
      expect(signupReducer({}, action)).toEqual({
        signupSuccess: true,
        response: 'test'
      });
    });
  });

  describe('SIGNUP_FAILURE', () => {
    it('should return correct state', () => {
      const action = { type: SIGNUP_FAILURE, error: 'fail' };
      expect(signupReducer({}, action)).toEqual({
        signupError: 'fail'
      });
    });
  });

  describe('RESET_SIGNUP', () => {
    it('should return initial state', () => {
      const action = { type: RESET_SIGNUP };
      expect(signupReducer({}, action)).toEqual({
        signupInProgress: false,
        signupSuccess: false,
        signupError: '',
        response: {}
      });
    });
  });
});
