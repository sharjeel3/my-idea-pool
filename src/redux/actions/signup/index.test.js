import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { createAccount, resetSignup } from './index';
import {
  FETCH_USER_IN_PROGRESS,
  RESET_SIGNUP,
  SIGNUP_FAILURE,
  SIGNUP_IN_PROGRESS,
  SIGNUP_SUCCESS,
  UPDATE_TOKENS
} from '../../actionTypes';
import { IP_ACCESS_TOKEN, IP_REFRESH_TOKEN } from '../../../app/constants/tokens';
import { DEFAULT_ERROR_MESSAGE } from '../../../app/constants/errors';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Signup Action Creators', () => {
  describe('createAccount()', () => {
    let store;
    beforeEach(() => {
      moxios.install();
      store = mockStore({ signup: {} });
    });

    afterEach(() => {
      moxios.uninstall();
      jest.clearAllMocks();
    });

    it('should return actions for successful signup', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: { jwt: 'jwt', refresh_token: 'refresh token' }
        });
      });
      await store.dispatch(
        createAccount({
          name: 'Arc',
          email: 'test@test.com',
          password: 'Test1234'
        })
      );
      expect(store.getActions()).toEqual([
        { type: SIGNUP_IN_PROGRESS, value: true },
        { type: SIGNUP_IN_PROGRESS, value: false },
        { type: SIGNUP_SUCCESS },
        { type: UPDATE_TOKENS, jwt: 'jwt', refreshToken: 'refresh token' },
        { type: FETCH_USER_IN_PROGRESS, value: true }
      ]);
      expect(window.localStorage.setItem).toHaveBeenCalledWith(IP_ACCESS_TOKEN, 'jwt');
      expect(window.localStorage.setItem).toHaveBeenCalledWith(IP_REFRESH_TOKEN, 'refresh token');
    });

    it('should return actions for signup error', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: { reason: 'Invalid request' }
        });
      });
      await store.dispatch(
        createAccount({
          name: 'Arc',
          email: 'test@test.com',
          password: 'Test'
        })
      );
      expect(store.getActions()).toEqual([
        { type: SIGNUP_IN_PROGRESS, value: true },
        { type: SIGNUP_IN_PROGRESS, value: false },
        {
          type: SIGNUP_FAILURE,
          error: 'Invalid request'
        }
      ]);
      expect(window.localStorage.setItem).not.toHaveBeenCalled();
    });

    it('should return actions for unexpected failure', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject();
      });
      await store.dispatch(
        createAccount({
          name: 'Arc',
          email: 'test@test.com',
          password: 'Test'
        })
      );
      expect(store.getActions()).toEqual([
        { type: SIGNUP_IN_PROGRESS, value: true },
        { type: SIGNUP_IN_PROGRESS, value: false },
        {
          type: SIGNUP_FAILURE,
          error: DEFAULT_ERROR_MESSAGE
        }
      ]);
      expect(window.localStorage.setItem).not.toHaveBeenCalled();
    });
  });

  describe('resetSignup()', () => {
    it('should return action', () => {
      expect(resetSignup()).toEqual({
        type: RESET_SIGNUP
      });
    });
  });
});
