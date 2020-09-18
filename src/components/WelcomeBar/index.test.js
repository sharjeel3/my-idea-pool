import React from 'react';
import { WelcomeBar } from './index';
import { shallow } from 'enzyme';

describe('<WelcomeBar />', () => {
  it('should render logo with link', () => {
    const wrapper = shallow(<WelcomeBar />);
    expect(wrapper.find('a')).toExist();
    expect(wrapper.find('a')).toHaveProp('href', '/');
    expect(wrapper.find('WelcomeBar__Logo')).toExist();
  });
});
