import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { login } from './index';
import { LOGIN_FAILURE, LOGIN_IN_PROGRESS, LOGIN_SUCCESS } from '../../actionTypes';
import { IP_ACCESS_TOKEN, IP_REFRESH_TOKEN } from '../../../app/constants/tokens';
import { DEFAULT_ERROR_MESSAGE } from '../../../app/constants/errors';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Login Action Creators', () => {
  describe('login()', () => {
    let store;
    beforeEach(() => {
      moxios.install();
      store = mockStore({ auth: {} });
    });

    afterEach(() => {
      moxios.uninstall();
      jest.clearAllMocks();
    });

    it('should return actions for successful login', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: { jwt: 'jwt', refresh_token: 'refresh token' }
        });
      });
      await store.dispatch(
        login({
          email: 'test@test.com',
          password: 'Test1234'
        })
      );
      expect(store.getActions()).toEqual([
        { type: LOGIN_IN_PROGRESS, value: true },
        { type: LOGIN_IN_PROGRESS, value: false },
        {
          type: LOGIN_SUCCESS,
          response: { jwt: 'jwt', refreshToken: 'refresh token' }
        }
      ]);
      expect(window.localStorage.setItem).toHaveBeenCalledWith(IP_ACCESS_TOKEN, 'jwt');
      expect(window.localStorage.setItem).toHaveBeenCalledWith(IP_REFRESH_TOKEN, 'refresh token');
    });

    it('should return actions for login error', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: { reason: 'Invalid request' }
        });
      });
      await store.dispatch(
        login({
          email: 'test@test.com',
          password: 'Test'
        })
      );
      expect(store.getActions()).toEqual([
        { type: LOGIN_IN_PROGRESS, value: true },
        { type: LOGIN_IN_PROGRESS, value: false },
        {
          type: LOGIN_FAILURE,
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
        login({
          email: 'test@test.com',
          password: 'Test'
        })
      );
      expect(store.getActions()).toEqual([
        { type: LOGIN_IN_PROGRESS, value: true },
        { type: LOGIN_IN_PROGRESS, value: false },
        {
          type: LOGIN_FAILURE,
          error: DEFAULT_ERROR_MESSAGE
        }
      ]);
      expect(window.localStorage.setItem).not.toHaveBeenCalled();
    });
  });
});
