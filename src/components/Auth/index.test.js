import React from 'react';
import { Auth } from './index';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import * as authActions from '../../redux/actions/auth';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('<SecureRoute />', () => {
  it('should return loading when user info is being fetched', () => {
    const refreshAccessTokenSpy = jest.spyOn(authActions, 'refreshAccessToken');
    const store = mockStore({
      modal: {},
      ideas: {},
      auth: {}
    });
    mount(
      <Provider store={store}>
        <Auth />
      </Provider>
    );
    expect(refreshAccessTokenSpy).toHaveBeenCalled();
  });
});
