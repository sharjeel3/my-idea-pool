import React from 'react';
import { mount } from 'enzyme';
import { TitleInput } from './TitleInput';

describe('<TitleInput />', () => {
  it('should call onChange', () => {
    const onChange = jest.fn();
    const wrapper = mount(<TitleInput onChange={onChange} value="idea" />);
    wrapper.find('input').simulate('change', { target: { value: 'new idea' } });
    expect(onChange).toHaveBeenCalledWith('new idea');
  });
});
