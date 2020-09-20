import { configureStore } from '@reduxjs/toolkit';
import { ideasReducer } from './reducers/ideas';
import { signupReducer } from './reducers/signup';
import { authReducer } from './reducers/auth';

export const store = configureStore({
  reducer: {
    ideas: ideasReducer,
    signup: signupReducer,
    auth: authReducer
  }
});
