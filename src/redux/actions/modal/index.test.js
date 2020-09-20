import { HIDE_MODAL, SHOW_MODAL } from '../../actionTypes';
import { showModal, hideModal } from './index';

describe('Modal Action Creators', () => {
  describe('showModal()', () => {
    it('returns correct action', () => {
      expect(showModal({ content: 'test' })).toEqual({
        type: SHOW_MODAL,
        content: 'test',
        options: {}
      });

      expect(showModal({ content: 'test', options: { hello: 'you' } })).toEqual({
        type: SHOW_MODAL,
        content: 'test',
        options: { hello: 'you' }
      });
    });
  });

  describe('hideModal()', () => {
    it('returns correct action', () => {
      expect(hideModal()).toEqual({
        type: HIDE_MODAL
      });
    });
  });
});
