import { ideasReducer } from './index';
import {
  FETCH_IDEAS_FAILURE,
  FETCH_IDEAS_IN_PROGRESS,
  FETCH_IDEAS_SUCCESS
} from '../../actionTypes';

describe('Ideas Reducer', () => {
  it('should return initial state', () => {
    expect(ideasReducer(undefined, { type: 'test' })).toEqual({
      content: [],
      fetchInProgress: false,
      fetchError: ''
    });
  });

  describe('FETCH_IDEAS_IN_PROGRESS', () => {
    it('should return correct state', () => {
      const action = { type: FETCH_IDEAS_IN_PROGRESS, value: true };
      expect(ideasReducer({}, action)).toEqual({
        fetchInProgress: true
      });
    });
  });

  describe('FETCH_IDEAS_SUCCESS', () => {
    it('should return correct state', () => {
      const action = { type: FETCH_IDEAS_SUCCESS, content: [{ id: 'abc123' }] };
      expect(ideasReducer({}, action)).toEqual({
        content: [{ id: 'abc123' }]
      });
    });
  });

  describe('FETCH_IDEAS_FAILURE', () => {
    it('should return correct state', () => {
      const action = { type: FETCH_IDEAS_FAILURE, error: 'fail' };
      expect(ideasReducer({}, action)).toEqual({
        fetchError: 'fail'
      });
    });
  });
});
