import { modalReducer } from './index';
import { SHOW_MODAL, HIDE_MODAL } from '../../actionTypes';

describe('Modal Reducer', () => {
  it('should return initial state', () => {
    expect(modalReducer(undefined, { type: 'test' })).toEqual({
      isActive: false,
      content: null,
      options: {}
    });
  });

  describe('SHOW_MODAL', () => {
    it('should return correct state', () => {
      const action = {
        type: SHOW_MODAL,
        content: 'test',
        options: { id: '123' }
      };
      expect(modalReducer({}, action)).toEqual({
        isActive: true,
        content: 'test',
        options: { id: '123' }
      });
    });
  });

  describe('HIDE_MODAL', () => {
    it('should return correct state', () => {
      const action = { type: HIDE_MODAL };
      expect(modalReducer({}, action)).toEqual({
        isActive: false,
        content: null,
        options: {}
      });
    });
  });
});
