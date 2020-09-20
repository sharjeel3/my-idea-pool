import React from 'react';
import { Button } from './index';
import { shallow } from 'enzyme';

describe('<Button />', () => {
  it('renders correctly with onClick prop', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Button onClick={onClick}>Press me</Button>);
    expect(wrapper).toHaveText('Press me');
    expect(wrapper.find('Button__StyledButton')).toHaveProp('onClick', onClick);
  });
});
