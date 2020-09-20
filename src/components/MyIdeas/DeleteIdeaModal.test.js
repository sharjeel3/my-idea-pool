import React from 'react';
import { DeleteIdeaModal } from './DeleteIdeaModal';
import { mount } from 'enzyme';
import * as ideasActions from '../../redux/actions/ideas';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('<DeleteIdeaModal />', () => {
  let onConfirm, onCancel, options, wrapper, store;

  beforeEach(() => {
    onConfirm = jest.fn();
    onCancel = jest.fn();
    options = { id: 'abc123' };
    store = mockStore({});
    wrapper = mount(
      <Provider store={store}>
        <DeleteIdeaModal options={options} onCancel={onCancel} onConfirm={onConfirm} />
      </Provider>
    );
  });

  it('renders title and message', () => {
    expect(wrapper.find('DeleteIdeaModal__Title')).toHaveText('Are you sure?');
    expect(wrapper.find('DeleteIdeaModal__Message')).toHaveText(
      'This idea will be permanently deleted.'
    );
  });

  it('should render action buttons', () => {
    expect(wrapper.find({ id: 'delete-idea-ok' })).toExist();
    expect(wrapper.find({ id: 'delete-idea-cancel' })).toExist();
  });

  it('should call onCancel when cancel button is clicked', () => {
    wrapper.find({ id: 'delete-idea-cancel' }).find('button').simulate('click');
    expect(onCancel).toHaveBeenCalled();
  });

  it('should call onConfirm and deleteIdea when ok button is clicked', () => {
    const deleteIdeaSpy = jest.spyOn(ideasActions, 'deleteIdea');
    wrapper.find({ id: 'delete-idea-ok' }).find('button').simulate('click');
    expect(onConfirm).toHaveBeenCalled();
    expect(deleteIdeaSpy).toHaveBeenCalled();
  });
});
