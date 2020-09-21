import { request, secureRequest } from '../../../libs/request';
import {
  FETCH_USER_FAILURE,
  FETCH_USER_IN_PROGRESS,
  FETCH_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_IN_PROGRESS,
  LOGIN_SUCCESS,
  RESET_AUTH,
  UPDATE_ACCESS_TOKEN,
  UPDATE_TOKENS
} from '../../actionTypes';
import lodashGet from 'lodash.get';
import { DEFAULT_ERROR_MESSAGE } from '../../../app/constants/errors';
import { IP_ACCESS_TOKEN, IP_REFRESH_TOKEN } from '../../../app/constants/tokens';

export const saveTokens = ({ jwt, refreshToken }) => {
  const localStorage = window.localStorage;
  localStorage.setItem(IP_ACCESS_TOKEN, jwt);
  localStorage.setItem(IP_REFRESH_TOKEN, refreshToken);
};

const removeTokensFromDevice = () => {
  window.localStorage.removeItem(IP_ACCESS_TOKEN);
  window.localStorage.removeItem(IP_REFRESH_TOKEN);
};

export const getAccessToken = () => {
  return window.localStorage.getItem(IP_ACCESS_TOKEN);
};

export const getRefreshToken = () => {
  return window.localStorage.getItem(IP_REFRESH_TOKEN);
};

export const fetchUser = () => async dispatch => {
  try {
    dispatch({ type: FETCH_USER_IN_PROGRESS, value: true });
    const [error, response] = await secureRequest({
      url: '/me'
    });
    dispatch({ type: FETCH_USER_IN_PROGRESS, value: false });
    if (error) {
      return dispatch({
        type: FETCH_USER_FAILURE,
        error: lodashGet(error, 'data.reason', DEFAULT_ERROR_MESSAGE)
      });
    }
    const { email, name, avatar_url: avatarUrl } = response;
    dispatch({
      type: FETCH_USER_SUCCESS,
      avatarUrl,
      email,
      name
    });
  } catch (e) {
    dispatch({ type: FETCH_USER_IN_PROGRESS, value: false });
    dispatch({ type: FETCH_USER_FAILURE, error: DEFAULT_ERROR_MESSAGE });
  }
};

export const login = ({ email, password }) => async dispatch => {
  try {
    dispatch({ type: LOGIN_IN_PROGRESS, value: true });
    const [error, response] = await request({
      url: '/access-tokens',
      method: 'post',
      data: {
        email,
        password
      }
    });
    dispatch({ type: LOGIN_IN_PROGRESS, value: false });
    if (error) {
      return dispatch({
        type: LOGIN_FAILURE,
        error: lodashGet(error, 'data.reason', DEFAULT_ERROR_MESSAGE)
      });
    }
    const { jwt, refresh_token: refreshToken } = response;
    saveTokens({
      jwt,
      refreshToken
    });
    dispatch(fetchUser());
    dispatch({
      type: LOGIN_SUCCESS,
      jwt,
      refreshToken
    });
  } catch (e) {
    dispatch({ type: LOGIN_IN_PROGRESS, value: false });
    dispatch({ type: LOGIN_FAILURE, error: DEFAULT_ERROR_MESSAGE });
  }
};

const resetAuth = () => ({
  type: RESET_AUTH
});

export const logout = () => async dispatch => {
  try {
    await secureRequest({
      url: '/access-tokens',
      method: 'DELETE',
      data: {
        refresh_token: getRefreshToken()
      }
    });
    removeTokensFromDevice();
    dispatch(resetAuth());
    window.location.href = '/';
  } catch (e) {
    removeTokensFromDevice();
    dispatch(resetAuth());
    window.location.href = '/';
  }
};

export const updateTokens = ({ jwt, refreshToken }) => ({
  type: UPDATE_TOKENS,
  jwt,
  refreshToken
});

export const updateAccessToken = ({ jwt }) => ({
  type: UPDATE_ACCESS_TOKEN,
  jwt
});

export const refreshAccessToken = () => async dispatch => {
  const localStorage = window.localStorage;
  let interval;
  const refreshToken = localStorage.getItem(IP_REFRESH_TOKEN);
  const refreshFn = async refreshToken => {
    const [error, response] = await request({
      url: '/access-tokens/refresh',
      method: 'POST',
      data: {
        refresh_token: refreshToken
      }
    });
    if (error) {
      removeTokensFromDevice();
      clearInterval(interval);
    } else if (response) {
      const { jwt } = response;
      localStorage.setItem(IP_ACCESS_TOKEN, jwt);
      dispatch(updateAccessToken({ jwt }));
      dispatch(fetchUser());
    }
  };
  if (refreshToken) {
    try {
      await refreshFn(refreshToken);
    } catch (e) {}
    interval = setInterval(async () => {
      try {
        await refreshFn(refreshToken);
      } catch (e) {}
    }, 540000);
  }
};
