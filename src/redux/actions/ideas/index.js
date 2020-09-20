import { secureRequest } from '../../../libs/request';
import {
  DELETE_IDEA_FAILURE,
  DELETE_IDEA_IN_PROGRESS,
  DELETE_IDEA_SUCCESS,
  FETCH_IDEAS_FAILURE,
  FETCH_IDEAS_IN_PROGRESS,
  FETCH_IDEAS_SUCCESS,
  REFRESH_IDEAS
} from '../../actionTypes';
import lodashGet from 'lodash.get';
import { DEFAULT_ERROR_MESSAGE } from '../../../app/constants/errors';
import { getMyIdeas } from '../../selectors/ideas';

const refreshIdeas = content => ({
  type: REFRESH_IDEAS,
  content
});

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

export const deleteIdea = ({ id }) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_IDEA_IN_PROGRESS, value: true });
    const [error] = await secureRequest({
      url: `/ideas/${id}`,
      method: 'DELETE'
    });
    dispatch({ type: DELETE_IDEA_IN_PROGRESS, value: false });
    if (error) {
      return dispatch({
        type: DELETE_IDEA_FAILURE,
        error: lodashGet(error, 'data.reason', DEFAULT_ERROR_MESSAGE)
      });
    }
    const ideas = getMyIdeas(getState());
    const updatedIdeas = ideas.filter(idea => idea.id !== id);
    dispatch({
      type: DELETE_IDEA_SUCCESS,
      value: true
    });
    dispatch(refreshIdeas(updatedIdeas));
  } catch (e) {
    dispatch({ type: DELETE_IDEA_IN_PROGRESS, value: false });
    dispatch({
      type: DELETE_IDEA_FAILURE,
      error: DEFAULT_ERROR_MESSAGE
    });
  }
};
