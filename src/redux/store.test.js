import { store } from './store';

describe('Redux Store', () => {
  it('returns dispatch and getState functions', () => {
    expect(typeof store.dispatch).toEqual('function');
    expect(typeof store.getState).toEqual('function');
  });

  describe('getState()', () => {
    it('should return root reducer', () => {
      expect(store.getState()).toMatchObject({ ideas: {} });
    });
  });
});
