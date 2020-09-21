import React from 'react';
import { Idea } from './Idea';
import { shallow, mount } from 'enzyme';
import { brandColors } from '../../ui-library/theme/colors';
import 'jest-styled-components';
import { EDIT } from '../../app/constants/idea';

describe('<Idea />', () => {
  let props;

  beforeEach(() => {
    props = {
      id: 'abc123',
      content: 'i am an arc developer',
      impact: 9,
      ease: 8,
      confidence: 7,
      average: 8.0,
      onDelete: jest.fn(),
      onAddCancel: jest.fn(),
      onAddConfirm: jest.fn(),
      onEdit: jest.fn(),
      isDeleteIdeaModalActiveNow: false,
      activeModalOptions: {}
    };
  });

  describe('Content', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<Idea {...props} />);
    });

    it('shuold render impact score', () => {
      wrapper = mount(<Idea {...props} />);
      expect(wrapper.find({ id: 'impact-score-abc123' }).find('input')).toHaveValue(9);
    });

    it('shuold render confidence score', () => {
      wrapper = mount(<Idea {...props} />);
      expect(wrapper.find({ id: 'confidence-score-abc123' }).find('input')).toHaveValue(7);
    });

    it('shuold render ease score', () => {
      wrapper = mount(<Idea {...props} />);
      expect(wrapper.find({ id: 'ease-score-abc123' }).find('input')).toHaveValue(8);
    });

    it('shuold render average score', () => {
      wrapper = mount(<Idea {...props} />);
      expect(wrapper.find({ isAverage: true, id: 'average-score-value-abc123' })).toHaveText('8');
      expect(wrapper.find({ isAverage: true, id: 'average-score-value-abc123' })).toHaveStyleRule(
        'color',
        brandColors.grey
      );
    });
  });

  describe('Actions', () => {
    it('should render Edit and Delete button', () => {
      const wrapper = shallow(<Idea {...props} />);
      expect(wrapper.find({ id: 'edit-button-abc123' })).toExist();
      expect(wrapper.find({ id: 'delete-button-abc123' })).toExist();
    });

    it('should call onDelete when delete button is clicked', () => {
      const wrapper = shallow(<Idea {...props} />);
      wrapper.find({ id: 'delete-button-abc123' }).simulate('click', new Event('click'));
      expect(props.onDelete).toHaveBeenCalledWith('abc123');
    });
  });

  describe('Edit Mode', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Idea {...props} />);
      wrapper.find({ id: 'edit-button-abc123' }).simulate('click', new Event('click'));
    });

    it('should exit edit mode when cancel edit button is clicked', () => {
      wrapper.find({ id: 'cancel-edit-abc123' }).simulate('click', new Event('click'));
      expect(wrapper.find({ id: 'cancel-edit-abc123' })).not.toExist();
      expect(wrapper.find({ id: 'confirm-edit-abc123' })).not.toExist();
    });

    it('should call onAddCancel when cancel add button is clicked', () => {
      wrapper.setProps({ mode: EDIT });
      wrapper.find({ id: 'cancel-edit-abc123' }).simulate('click', new Event('click'));
      expect(props.onAddCancel).toHaveBeenCalledWith('abc123');
    });

    it('should call onAddConfirm when confirm add button is clicked', () => {
      wrapper.setProps({ mode: EDIT });
      wrapper.find({ id: 'confirm-edit-abc123' }).simulate('click', new Event('click'));
      expect(props.onAddConfirm).toHaveBeenCalledWith({
        id: 'abc123',
        content: 'i am an arc developer',
        impact: 9,
        ease: 8,
        confidence: 7
      });
    });

    it('should call onEdit when confirm edit button is clicked', () => {
      wrapper.find({ id: 'confirm-edit-abc123' }).simulate('click', new Event('click'));
      expect(props.onEdit).toHaveBeenCalledWith({
        id: 'abc123',
        content: 'i am an arc developer',
        impact: 9,
        ease: 8,
        confidence: 7
      });
    });
  });
});
