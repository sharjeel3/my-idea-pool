import { createReducer } from '@reduxjs/toolkit';
import {
  RESET_SIGNUP,
  SIGNUP_FAILURE,
  SIGNUP_IN_PROGRESS,
  SIGNUP_SUCCESS
} from '../../actionTypes';

const INITIAL_STATE = {
  signupInProgress: false,
  signupSuccess: false,
  signupError: '',
  response: {}
};

export const signupReducer = createReducer(INITIAL_STATE, {
  [SIGNUP_IN_PROGRESS]: (state, action) => {
    state.signupInProgress = action.value;
  },
  [SIGNUP_SUCCESS]: (state, action) => {
    state.signupSuccess = true;
    state.response = action.response;
  },
  [SIGNUP_FAILURE]: (state, action) => {
    state.signupError = action.error;
  },
  [RESET_SIGNUP]: () => ({ ...INITIAL_STATE })
});
