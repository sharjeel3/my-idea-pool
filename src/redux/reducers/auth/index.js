import { createReducer } from '@reduxjs/toolkit';
import {
  LOGIN_FAILURE,
  LOGIN_IN_PROGRESS,
  LOGIN_SUCCESS,
  UPDATE_ACCESS_TOKEN,
  UPDATE_TOKENS
} from '../../actionTypes';

const INITIAL_STATE = {
  loginInProgress: false,
  loginSuccess: false,
  loginError: '',
  jwt: '',
  refreshToken: ''
};

export const authReducer = createReducer(INITIAL_STATE, {
  [LOGIN_IN_PROGRESS]: (state, action) => {
    state.loginInProgress = action.value;
  },
  [LOGIN_SUCCESS]: (state, action) => {
    state.loginSuccess = true;
    state.jwt = action.jwt;
    state.refreshToken = action.refreshToken;
  },
  [LOGIN_FAILURE]: (state, action) => {
    state.loginError = action.error;
  },
  [UPDATE_TOKENS]: (state, action) => {
    state.jwt = action.jwt;
    state.refreshToken = action.refreshToken;
  },
  [UPDATE_ACCESS_TOKEN]: (state, action) => {
    state.jwt = action.jwt;
  }
});
