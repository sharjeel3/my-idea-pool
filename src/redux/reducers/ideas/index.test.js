import { ideasReducer } from './index';
import {
  FETCH_IDEAS_FAILURE,
  FETCH_IDEAS_IN_PROGRESS,
  FETCH_IDEAS_SUCCESS,
  REFRESH_IDEAS,
  ADD_IDEA,
  DELETE_IDEA
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

  describe('REFRESH_IDEAS', () => {
    it('should return correct state', () => {
      const action = { type: REFRESH_IDEAS, content: [{ id: 'abc123' }] };
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

  describe('ADD_IDEA', () => {
    it('should return correct state', () => {
      const state = { content: [{ id: '123' }] };
      const action = { type: ADD_IDEA, idea: { id: '789' } };
      expect(ideasReducer(state, action)).toEqual({
        content: [{ id: '789' }, { id: '123' }]
      });
    });
  });

  describe('DELETE_IDEA', () => {
    it('should return correct state', () => {
      const state = { content: [{ id: '789' }, { id: '123' }] };
      const action = { type: DELETE_IDEA, id: '789' };
      expect(ideasReducer(state, action)).toEqual({
        content: [{ id: '123' }]
      });
    });
  });
});
