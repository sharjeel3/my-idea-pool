import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { fetchIdeas } from './index';
import {
  FETCH_IDEAS_SUCCESS,
  FETCH_IDEAS_IN_PROGRESS,
  FETCH_IDEAS_FAILURE
} from '../../actionTypes';
import { DEFAULT_ERROR_MESSAGE } from '../../../app/constants/errors';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Ideas Action Creators', () => {
  describe('fetchIdeas()', () => {
    let store;
    beforeEach(() => {
      moxios.install();
      store = mockStore({ auth: {} });
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should return actions for successful fetch', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: [
            {
              id: '1adzybiw21',
              content: 'i am an arc developer',
              impact: 9,
              ease: 9,
              confidence: 9,
              average_score: 9.0,
              created_at: 1600334688
            }
          ]
        });
      });
      await store.dispatch(fetchIdeas({ page: 1 }));
      expect(store.getActions()).toEqual([
        { type: FETCH_IDEAS_IN_PROGRESS, value: true },
        { type: FETCH_IDEAS_IN_PROGRESS, value: false },
        {
          type: FETCH_IDEAS_SUCCESS,
          content: [
            {
              id: '1adzybiw21',
              content: 'i am an arc developer',
              impact: 9,
              ease: 9,
              confidence: 9,
              average_score: 9.0,
              created_at: 1600334688
            }
          ]
        }
      ]);
    });

    it('should return actions for fetch error', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: { reason: 'Invalid request' }
        });
      });
      await store.dispatch(fetchIdeas({ page: 1 }));
      expect(store.getActions()).toEqual([
        { type: FETCH_IDEAS_IN_PROGRESS, value: true },
        { type: FETCH_IDEAS_IN_PROGRESS, value: false },
        {
          type: FETCH_IDEAS_FAILURE,
          error: 'Invalid request'
        }
      ]);
    });

    it('should return actions for unexpected failure', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject();
      });
      await store.dispatch(fetchIdeas({ page: 1 }));
      expect(store.getActions()).toEqual([
        { type: FETCH_IDEAS_IN_PROGRESS, value: true },
        { type: FETCH_IDEAS_IN_PROGRESS, value: false },
        {
          type: FETCH_IDEAS_FAILURE,
          error: DEFAULT_ERROR_MESSAGE
        }
      ]);
    });
  });
});
