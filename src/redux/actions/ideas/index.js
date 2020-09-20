import { secureRequest } from '../../../libs/request';
import {
  FETCH_IDEAS_FAILURE,
  FETCH_IDEAS_IN_PROGRESS,
  FETCH_IDEAS_SUCCESS
} from '../../actionTypes';
import lodashGet from 'lodash.get';
import { DEFAULT_ERROR_MESSAGE } from '../../../app/constants/errors';

export const fetchIdeas = ({ page }) => async dispatch => {
  try {
    dispatch({ type: FETCH_IDEAS_IN_PROGRESS, value: true });
    const [error, response] = await secureRequest({
      url: `/ideas?page=${page}`
    });
    dispatch({ type: FETCH_IDEAS_IN_PROGRESS, value: false });
    if (error) {
      return dispatch({
        type: FETCH_IDEAS_FAILURE,
        error: lodashGet(error, 'data.reason', DEFAULT_ERROR_MESSAGE)
      });
    }
    dispatch({
      type: FETCH_IDEAS_SUCCESS,
      content: response
    });
  } catch (e) {
    dispatch({ type: FETCH_IDEAS_IN_PROGRESS, value: false });
    dispatch({
      type: FETCH_IDEAS_FAILURE,
      error: DEFAULT_ERROR_MESSAGE
    });
  }
};
