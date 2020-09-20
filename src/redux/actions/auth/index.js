import { request } from '../../../libs/request';
import { LOGIN_FAILURE, LOGIN_IN_PROGRESS, LOGIN_SUCCESS } from '../../actionTypes';
import lodashGet from 'lodash.get';
import { DEFAULT_ERROR_MESSAGE } from '../../../app/constants/errors';
import { saveTokens } from '../signup';

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
