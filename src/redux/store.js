import { configureStore } from '@reduxjs/toolkit';
import { ideasReducer } from './reducers/ideas';

export default configureStore({
  reducer: {
    ideas: ideasReducer
  }
});
