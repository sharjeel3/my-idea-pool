import React from 'react';
import { NotFound } from './index';
import { mount } from 'enzyme';

describe('<NotFound />', () => {
  it('should render Global Styles and WelcomeBar', () => {
    const wrapper = mount(<NotFound />);
    expect(wrapper.find('Title')).toHaveText('Not Found...');
  });
});
