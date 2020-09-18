import { createReducer } from '@reduxjs/toolkit';

const INITIAL_STATE = {};

export const ideasReducer = createReducer(INITIAL_STATE, {
  test: () => 'test'
});
