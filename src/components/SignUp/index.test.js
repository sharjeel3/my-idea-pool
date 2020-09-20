import React from 'react';
import { SignUp } from './index';
import { mount } from 'enzyme';
import { BrowserRouter as ReactRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as signupActions from '../../redux/actions/signup';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('<SignUp />', () => {
  let wrapper, store;
  beforeEach(() => {
    store = mockStore({ signup: {} });
    wrapper = mount(
      <Provider store={store}>
        <ReactRouter>
          <SignUp />
        </ReactRouter>
      </Provider>
    );
  });

  it('should render form', () => {
    expect(wrapper.find('Form')).toExist();
  });

  it('should render name input', () => {
    expect(wrapper.find('TextInput').filter({ id: 'signup-name' })).toExist();
  });

  it('should render email input', () => {
    expect(wrapper.find('TextInput').filter({ id: 'signup-email' })).toExist();
  });

  it('should render password input', () => {
    expect(wrapper.find('TextInput').filter({ id: 'signup-password' })).toExist();
  });

  it('should render error message when active', () => {
    expect(wrapper.find('ErrorMessage')).not.toExist();
    store = mockStore({
      signup: {
        signupError: 'something went wrong'
      }
    });
    wrapper = mount(
      <Provider store={store}>
        <ReactRouter>
          <SignUp />
        </ReactRouter>
      </Provider>
    );
    expect(wrapper.find('ErrorMessage')).toExist();
  });

  it('should call createAccount when password is valid', () => {
    const createAccountSpy = jest.spyOn(signupActions, 'createAccount');
    wrapper
      .find({ id: 'signup-password' })
      .find('input')
      .simulate('change', { target: { value: 'Test' } });
    wrapper.find('Form').simulate('submit');
    expect(createAccountSpy).not.toHaveBeenCalled();

    wrapper
      .find({ id: 'signup-password' })
      .find('input')
      .simulate('change', { target: { value: 'Testing123' } });
    wrapper.find('Form').simulate('submit');
    expect(createAccountSpy).toHaveBeenCalled();
  });

  it('should call resetSignup on successful signup', () => {
    const resetSignupSpy = jest.spyOn(signupActions, 'resetSignup');
    const history = { replace: jest.fn() };
    expect(resetSignupSpy).not.toHaveBeenCalled();
    store = mockStore({
      signup: {
        signupSuccess: true
      }
    });
    wrapper = mount(
      <Provider store={store}>
        <ReactRouter>
          <SignUp.WrappedComponent history={history} />
        </ReactRouter>
      </Provider>
    );
    expect(resetSignupSpy).toHaveBeenCalled();
    expect(history.replace).toHaveBeenCalled();
  });
});
