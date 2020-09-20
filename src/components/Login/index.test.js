import React from 'react';
import { Login } from './index';
import { mount } from 'enzyme';
import { BrowserRouter as ReactRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as authActions from '../../redux/actions/auth';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('<Login />', () => {
  let wrapper, store;
  beforeEach(() => {
    store = mockStore({ auth: {} });
    wrapper = mount(
      <Provider store={store}>
        <ReactRouter>
          <Login />
        </ReactRouter>
      </Provider>
    );
  });

  it('should render form', () => {
    expect(wrapper.find('Form')).toExist();
  });

  it('should render email input', () => {
    expect(wrapper.find('TextInput').filter({ id: 'login-email' })).toExist();
  });

  it('should render password input', () => {
    expect(wrapper.find('TextInput').filter({ id: 'login-password' })).toExist();
  });

  it('should render error message when active', () => {
    expect(wrapper.find('ErrorMessage')).not.toExist();
    store = mockStore({
      auth: {
        loginError: 'something went wrong'
      }
    });
    wrapper = mount(
      <Provider store={store}>
        <ReactRouter>
          <Login />
        </ReactRouter>
      </Provider>
    );
    expect(wrapper.find('ErrorMessage')).toExist();
  });

  it('should call login action creator', () => {
    const loginSpy = jest.spyOn(authActions, 'login');
    wrapper.find('Form').simulate('submit');
    expect(loginSpy).toHaveBeenCalled();
  });

  it('should call history replace on successful login', () => {
    const history = { replace: jest.fn() };
    store = mockStore({
      auth: {
        loginSuccess: true
      }
    });
    wrapper = mount(
      <Provider store={store}>
        <ReactRouter>
          <Login.WrappedComponent history={history} />
        </ReactRouter>
      </Provider>
    );
    expect(history.replace).toHaveBeenCalled();
  });
});
