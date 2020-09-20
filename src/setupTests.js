// jest-dom adds custom jest matchers for asserting on DOM nodes.
import '@testing-library/jest-dom/extend-expect';

// Enzyme setup
import 'jest-enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

// Local Storage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(() => null),
    setItem: jest.fn(() => null),
    removeItem: jest.fn(() => null)
  },
  writable: true
});
