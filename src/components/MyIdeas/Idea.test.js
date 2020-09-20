import React from 'react';
import { Idea } from './Idea';
import { shallow } from 'enzyme';

describe('<Idea />', () => {
  let props;

  beforeEach(() => {
    props = {
      id: 'abc123',
      content: 'i am an arc developer',
      impact: 9,
      ease: 8,
      confidence: 7,
      average: 8.0
    };
  });

  describe('Content', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<Idea {...props} />);
    });

    it('shuold render impact score', () => {
      expect(wrapper.find({ id: 'impact-score-abc123' })).toHaveText('Impact9');
    });

    it('shuold render confidence score', () => {
      expect(wrapper.find({ id: 'confidence-score-abc123' })).toHaveText('Confidence7');
    });

    it('shuold render ease score', () => {
      expect(wrapper.find({ id: 'ease-score-abc123' })).toHaveText('Ease8');
    });

    it('shuold render average score', () => {
      expect(wrapper.find({ id: 'average-score-abc123' })).toHaveText('Avg.8');
    });
  });

  describe('Actions', () => {
    it('should render Edit and Delete button', () => {
      const wrapper = shallow(<Idea {...props} />);
      expect(wrapper.find('Idea__EditButton')).toExist();
      expect(wrapper.find('Idea__DeleteButton')).toExist();
    });
  });
});
