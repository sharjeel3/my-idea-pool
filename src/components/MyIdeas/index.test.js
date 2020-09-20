import React from 'react';
import { MyIdeas } from './index';
import * as ideasActions from '../../redux/actions/ideas';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('<MyIdeas />', () => {
  it('should fetch ideas', () => {
    const fetchIdeasSpy = jest.spyOn(ideasActions, 'fetchIdeas');
    const store = mockStore({ ideas: { content: [] } });
    mount(
      <Provider store={store}>
        <MyIdeas />
      </Provider>
    );
    expect(fetchIdeasSpy).toHaveBeenCalled();
  });

  it('should render ideas', () => {
    const store = mockStore({
      ideas: {
        content: [
          {
            id: '1adzybiw21',
            content: 'i am an arc developer',
            impact: 9,
            ease: 9,
            confidence: 9,
            average_score: 9.0,
            created_at: 1600334688
          }
        ]
      }
    });
    const wrapper = mount(
      <Provider store={store}>
        <MyIdeas />
      </Provider>
    );
    expect(wrapper.find('Idea')).toExist();
    expect(wrapper.find('Idea').props()).toMatchObject({
      id: '1adzybiw21',
      ease: 9,
      impact: 9,
      confidence: 9,
      content: 'i am an arc developer',
      average: 9
    });
  });
});
