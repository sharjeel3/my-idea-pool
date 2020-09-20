import { createReducer } from '@reduxjs/toolkit';
import {
  FETCH_IDEAS_FAILURE,
  FETCH_IDEAS_IN_PROGRESS,
  FETCH_IDEAS_SUCCESS,
  REFRESH_IDEAS
} from '../../actionTypes';

const INITIAL_STATE = {
  content: [],
  fetchInProgress: false,
  fetchError: ''
};

export const ideasReducer = createReducer(INITIAL_STATE, {
  [FETCH_IDEAS_IN_PROGRESS]: (state, action) => {
    state.fetchInProgress = action.value;
  },
  [FETCH_IDEAS_SUCCESS]: (state, action) => {
    state.content = action.content;
  },
  [REFRESH_IDEAS]: (state, action) => {
    state.content = action.content;
  },
  [FETCH_IDEAS_FAILURE]: (state, action) => {
    state.fetchError = action.error;
  }
});
