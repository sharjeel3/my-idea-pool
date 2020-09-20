import axios from 'axios';

const API_PATH = 'https://small-project-api.herokuapp.com/';

export const request = ({ method = 'get', url, data = {} }) => {
  return axios(`${API_PATH}${url}`, {
    method,
    data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(json => {
      return [null, json.data];
    })
    .catch(error => {
      const { status, statusText, data } = error.response;
      return [{ status, statusText, data }, null];
    });
};
