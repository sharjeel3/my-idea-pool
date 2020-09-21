import React from 'react';
import { SecureRoute } from './SecureRoute';
import { BrowserRouter as ReactRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('<SecureRoute />', () => {
  it('should return loading when user info is being fetched', () => {
    const store = mockStore({
      modal: {},
      ideas: {},
      auth: {
        email: '',
        fetchUserInProgress: true
      }
    });
    const wrapper = mount(
      <Provider store={store}>
        <ReactRouter>
          <SecureRoute>My Ideas</SecureRoute>
        </ReactRouter>
      </Provider>
    );
    expect(wrapper).toHaveText('loading...');
  });

  it('should show error message when user auth data is not available', () => {
    const store = mockStore({
      modal: {},
      ideas: {},
      auth: {
        email: '',
        fetchUserInProgress: false,
        jwt: ''
      }
    });
    const wrapper = mount(
      <Provider store={store}>
        <ReactRouter>
          <SecureRoute>My Ideas</SecureRoute>
        </ReactRouter>
      </Provider>
    );
    expect(wrapper).toHaveText('You must log in to continue. Log In');
  });

  it('should render page for authenticated user', () => {
    const store = mockStore({
      modal: {},
      ideas: {},
      auth: {
        email: 'dev@arc.test',
        fetchUserInProgress: false,
        jwt: 'jwt'
      }
    });
    const wrapper = mount(
      <Provider store={store}>
        <ReactRouter>
          <SecureRoute>My Ideas</SecureRoute>
        </ReactRouter>
      </Provider>
    );
    expect(wrapper).toHaveText('My Ideas');
  });
});
