import { createReducer } from '@reduxjs/toolkit';
import { HIDE_MODAL, SHOW_MODAL } from '../../actionTypes';

const INITIAL_STATE = {
  isActive: false,
  content: null,
  options: {}
};

export const modalReducer = createReducer(INITIAL_STATE, {
  [SHOW_MODAL]: (state, action) => {
    state.isActive = true;
    state.content = action.content;
    state.options = action.options;
  },
  [HIDE_MODAL]: (state, action) => ({ ...INITIAL_STATE })
});
