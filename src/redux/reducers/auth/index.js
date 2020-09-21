import { createReducer } from '@reduxjs/toolkit';
import {
  FETCH_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_IN_PROGRESS,
  LOGIN_SUCCESS,
  UPDATE_ACCESS_TOKEN,
  UPDATE_TOKENS,
  RESET_AUTH
} from '../../actionTypes';

const INITIAL_STATE = {
  loginInProgress: false,
  loginSuccess: false,
  loginError: '',
  jwt: '',
  refreshToken: '',
  name: '',
  email: '',
  avatarUrl: '',
  fetchUserInProgress: false,
  fetchUserSuccess: false,
  fetchUserError: ''
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
  [FETCH_USER_SUCCESS]: (state, action) => {
    state.fetchUserSuccess = true;
    state.name = action.name;
    state.email = action.email;
    state.avatarUrl = action.avatarUrl;
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
  },
  [RESET_AUTH]: () => {
    return { ...INITIAL_STATE };
  }
});
