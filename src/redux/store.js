import { configureStore } from '@reduxjs/toolkit';
import { ideasReducer } from './reducers/ideas';

export const store = configureStore({
  reducer: {
    ideas: ideasReducer
  }
});
