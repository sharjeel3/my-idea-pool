import React from 'react';
import { SignUp } from './index';
import { shallow } from 'enzyme';

describe('<Skeleton />', () => {
  it('should render Global Styles and WelcomeBar', () => {
    const wrapper = shallow(<SignUp />);
    expect(wrapper).toHaveText('Sign Up');
  });
});
