import React from 'react';
import { NotFound } from './index';
import { shallow } from 'enzyme';

describe('<NotFound />', () => {
  it('should render Global Styles and WelcomeBar', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper).toHaveText('Not Found...');
  });
});
