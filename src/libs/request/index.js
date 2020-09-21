import axios from 'axios';
import { IP_ACCESS_TOKEN } from '../../app/constants/tokens';

const API_PATH = 'https://small-project-api.herokuapp.com';

export const request = ({ method = 'get', url, data = {}, headers = {} }) => {
  return axios(`${API_PATH}${url}`, {
    method,
    data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers
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

export const secureRequest = ({ method, url, data }) => {
  return request({
    method,
    url,
    data,
    headers: {
      'X-Access-Token': localStorage.getItem(IP_ACCESS_TOKEN)
    }
  });
};
