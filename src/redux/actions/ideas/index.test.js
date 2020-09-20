import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { fetchIdeas, deleteIdea } from './index';
import {
  FETCH_IDEAS_SUCCESS,
  FETCH_IDEAS_IN_PROGRESS,
  FETCH_IDEAS_FAILURE,
  DELETE_IDEA_IN_PROGRESS,
  DELETE_IDEA_SUCCESS,
  DELETE_IDEA_FAILURE,
  REFRESH_IDEAS
} from '../../actionTypes';
import { DEFAULT_ERROR_MESSAGE } from '../../../app/constants/errors';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Ideas Action Creators', () => {
  describe('fetchIdeas()', () => {
    let store;
    beforeEach(() => {
      moxios.install();
      store = mockStore({ auth: {}, ideas: {} });
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

  describe('deleteIdea()', () => {
    let store;
    beforeEach(() => {
      moxios.install();
      store = mockStore({
        auth: {},
        ideas: {
          content: [{ id: 'abc123' }, { id: 'xyz987' }]
        }
      });
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should return actions for successful deletion', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 204
        });
      });
      await store.dispatch(deleteIdea({ id: 'abc123' }));
      expect(store.getActions()).toEqual([
        { type: DELETE_IDEA_IN_PROGRESS, value: true },
        { type: DELETE_IDEA_IN_PROGRESS, value: false },
        { type: DELETE_IDEA_SUCCESS, value: true },
        { type: REFRESH_IDEAS, content: [{ id: 'xyz987' }] }
      ]);
    });

    it('should return actions for delete error', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: { reason: 'Invalid request' }
        });
      });
      await store.dispatch(deleteIdea({ id: 'abc123' }));
      expect(store.getActions()[2]).toEqual({
        type: DELETE_IDEA_FAILURE,
        error: 'Invalid request'
      });
    });

    it('should return actions for unexpected failure', async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject();
      });
      await store.dispatch(deleteIdea({ id: 'abc123' }));
      expect(store.getActions()[2]).toEqual({
        type: DELETE_IDEA_FAILURE,
        error: DEFAULT_ERROR_MESSAGE
      });
    });
  });
});
