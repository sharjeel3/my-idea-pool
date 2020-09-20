import React from 'react';
import { Modal } from './index';
import { mount } from 'enzyme';
import * as modalActions from '../../redux/actions/modal';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { DELETE_IDEA_MODAL } from '../../app/constants/modal';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('<Modal />', () => {
  let options, wrapper, store, hideModalSpy;

  beforeEach(() => {
    options = { id: 'abc123' };
    hideModalSpy = jest.spyOn(modalActions, 'hideModal');
    store = mockStore({
      modal: {
        isActive: true,
        content: DELETE_IDEA_MODAL,
        options
      }
    });
    wrapper = mount(
      <Provider store={store}>
        <Modal />
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render when modal is active', async () => {
    expect(wrapper.find('Modal__Root')).toExist();
    expect(wrapper.find('ModalComponent')).toExist();
    store = mockStore({ modal: {} });
    wrapper = mount(
      <Provider store={store}>
        <Modal />
      </Provider>
    );
    expect(wrapper.find('Modal__Root')).not.toExist();
    expect(wrapper.find('ModalComponent')).not.toExist();
  });

  it('should not render when modal content is invalid', async () => {
    expect(wrapper.find('ModalComponent')).toExist();
    store = mockStore({ modal: { isActive: true, content: 'random' } });
    wrapper = mount(
      <Provider store={store}>
        <Modal />
      </Provider>
    );
    expect(wrapper.find('Modal__Root')).not.toExist();
    expect(wrapper.find('ModalComponent')).not.toExist();
  });

  it('should call closeModal on confirm', () => {
    wrapper.find('ModalComponent').prop('onConfirm')();
    expect(hideModalSpy).toHaveBeenCalled();
  });

  it('should call closeModal on cancel', () => {
    wrapper.find('ModalComponent').prop('onCancel')();
    expect(hideModalSpy).toHaveBeenCalled();
  });
});
