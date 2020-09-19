import React from 'react';
import { shallow } from 'enzyme';
import { Form } from './index';

describe('<Form />', () => {
  it('should render', () => {
    const wrapper = shallow(<Form>sign up form</Form>);
    expect(wrapper.find('form')).toHaveText('sign up form');
  });

  it('should call onSubmit', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(<Form onSubmit={onSubmit}>sign up form</Form>);
    wrapper.find('form').simulate('submit');
    expect(onSubmit.mock.calls.length).toBe(1);
  });
});
