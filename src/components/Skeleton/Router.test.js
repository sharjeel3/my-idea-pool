import React from 'react';
import { Router } from './Router';
import { shallow } from 'enzyme';
import { LOGIN, SIGN_UP } from '../../app/constants/routes';

describe('<Router />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Router />);
  });

  it('should render', () => {
    expect(wrapper.find('BrowserRouter')).toExist();
    expect(wrapper.find('Switch')).toExist();
    expect(wrapper.find('Route').length).toEqual(3);
  });

  it('should render sign up route', () => {
    expect(wrapper.find('Route').filter({ path: SIGN_UP })).toExist();
  });

  it('should render login route', () => {
    expect(wrapper.find('Route').filter({ path: LOGIN })).toExist();
  });

  it('should render default not found route', () => {
    expect(wrapper.find('Route').filter({ path: '/' })).toExist();
  });
});
