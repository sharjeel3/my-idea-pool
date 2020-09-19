import React from 'react';
import { Container } from './index';
import { shallow } from 'enzyme';

describe('<Container />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Container>React component</Container>);
    expect(wrapper.find('Container__StyledContainer')).toExist();
    expect(wrapper).toHaveText('React component');
  });
});
