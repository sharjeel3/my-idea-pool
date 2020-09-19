import React from 'react';
import { Skeleton } from './index';
import { shallow } from 'enzyme';

describe('<Skeleton />', () => {
  it('should render Global Styles and WelcomeBar', () => {
    const wrapper = shallow(<Skeleton />);
    expect(wrapper.find('GlobalStyles')).toExist();
    expect(wrapper.find('WelcomeBar')).toExist();
  });

  it('should render Router', () => {
    const wrapper = shallow(<Skeleton />);
    expect(wrapper.find('Router')).toExist();
  });
});
