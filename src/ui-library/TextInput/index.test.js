import React from 'react';
import { mount } from 'enzyme';
import { TextInput } from './index';

describe('<TextInput />', () => {
  let props, wrapper;
  beforeEach(() => {
    props = {
      id: 'test',
      value: '123',
      required: true,
      type: 'number',
      placeholder: 'Goal'
    };
    wrapper = mount(<TextInput {...props} />);
  });

  it('should render input with correct props', () => {
    const input = wrapper.find('TextInput__Input');
    expect(input).toHaveProp('id', 'test');
    expect(input).toHaveProp('value', '123');
    expect(input).toHaveProp('required', true);
    expect(input).toHaveProp('type', 'number');
  });

  it('should call onChange when value changes', () => {
    const mockFn = jest.fn();
    wrapper.setProps({ onChange: mockFn });
    wrapper.setProps({ value: '777' });
    wrapper.find('input').simulate('change');
    expect(mockFn).toHaveBeenCalledWith('777');
  });

  it('should render placeholder', () => {
    wrapper.setProps({ value: '' });
    expect(wrapper.find('label')).toHaveText('Goal');
  });

  it('should not render placeholder when value is set', () => {
    expect(wrapper.find('label')).not.toExist();
  });

  it('should render message', () => {
    wrapper.setProps({ message: 'Enter your favorite number' });
    expect(wrapper.find('TextInput__Message')).toHaveText('Enter your favorite number');
  });
});
