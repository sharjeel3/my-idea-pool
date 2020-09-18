import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import { shallow } from 'enzyme';

describe('<App />', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper.find('App')).toExist();
  });
});
