import React from 'react';
import { ScoreInput } from './ScoreInput';
import { mount } from 'enzyme';

describe('<ScoreInput />', () => {
  it('should call onChange', () => {
    const onChange = jest.fn();
    const wrapper = mount(<ScoreInput isEditMode onChange={onChange} value={123} />);
    wrapper.find('input').simulate('change', { target: { value: 456 } });
    expect(onChange).toHaveBeenCalledWith(456);
  });
});
