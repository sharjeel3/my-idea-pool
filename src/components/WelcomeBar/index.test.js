import React from 'react';
import { WelcomeBar } from './index';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('<WelcomeBar />', () => {
  it('should render logo with link', () => {
    const store = mockStore({ ideas: { content: [] }, modal: {}, auth: {} });
    const wrapper = mount(
      <Provider store={store}>
        <WelcomeBar />
      </Provider>
    );
    expect(wrapper.find('a')).toExist();
    expect(wrapper.find('a')).toHaveProp('href', '/');
    expect(wrapper.find({ id: 'ideal-pool-logo' })).toExist();
  });
});
