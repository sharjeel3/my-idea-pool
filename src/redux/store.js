import { configureStore } from '@reduxjs/toolkit';
import { ideasReducer } from './reducers/ideas';
import { signupReducer } from './reducers/signup';
import { authReducer } from './reducers/auth';
import { modalReducer } from './reducers/modal';

export const store = configureStore({
  reducer: {
    ideas: ideasReducer,
    signup: signupReducer,
    auth: authReducer,
    modal: modalReducer
  }
});
