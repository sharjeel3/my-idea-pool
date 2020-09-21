import React from 'react';
import { MyIdeas } from './index';
import * as ideasActions from '../../redux/actions/ideas';
import * as modalActions from '../../redux/actions/modal';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { DELETE_IDEA_MODAL } from '../../app/constants/modal';

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

  it('should call showModal on delete click', () => {
    const showModalSpy = jest.spyOn(modalActions, 'showModal');
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
    wrapper.find('Idea').prop('onDelete')('1adzybiw21');
    expect(showModalSpy).toHaveBeenCalledWith({
      content: DELETE_IDEA_MODAL,
      options: { id: '1adzybiw21' }
    });
  });

  it('should call updateIdea on edit click', () => {
    const updateIdeaSpy = jest.spyOn(ideasActions, 'updateIdea');
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
    const editProps = {
      id: '1adzybiw21',
      content: 'I am an arc developer',
      impact: 10,
      ease: 10,
      confidence: 10
    };
    wrapper.find('Idea').prop('onEdit')(editProps);
    expect(updateIdeaSpy).toHaveBeenCalledWith(editProps);
  });
});
