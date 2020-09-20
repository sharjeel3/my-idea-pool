import { configureStore } from '@reduxjs/toolkit';
import { ideasReducer } from './reducers/ideas';
import { signupReducer } from './reducers/signup';

export const store = configureStore({
  reducer: {
    ideas: ideasReducer,
    signup: signupReducer
  }
});
