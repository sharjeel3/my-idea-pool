import { request } from '../../../libs/request';
import {
  RESET_SIGNUP,
  SIGNUP_FAILURE,
  SIGNUP_IN_PROGRESS,
  SIGNUP_SUCCESS
} from '../../actionTypes';
import lodashGet from 'lodash.get';
import { DEFAULT_ERROR_MESSAGE } from '../../../app/constants/errors';
import { saveTokens, updateTokens } from '../auth';

export const resetSignup = () => ({
  type: RESET_SIGNUP
});

export const createAccount = ({ name, email, password }) => async dispatch => {
  try {
    dispatch({ type: SIGNUP_IN_PROGRESS, value: true });
    const [error, response] = await request({
      url: '/users',
      method: 'post',
      data: {
        name,
        email,
        password
      }
    });
    dispatch({ type: SIGNUP_IN_PROGRESS, value: false });
    if (error) {
      return dispatch({
        type: SIGNUP_FAILURE,
        error: lodashGet(error, 'data.reason', DEFAULT_ERROR_MESSAGE)
      });
    }
    const { jwt, refresh_token: refreshToken } = response;
    saveTokens({
      jwt,
      refreshToken
    });
    dispatch({
      type: SIGNUP_SUCCESS
    });
    dispatch(updateTokens({ jwt, refreshToken }));
  } catch (e) {
    dispatch({ type: SIGNUP_IN_PROGRESS, value: false });
    dispatch({ type: SIGNUP_FAILURE, error: DEFAULT_ERROR_MESSAGE });
  }
};
