import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './slices/studentSlice';
import orgReducer from './slices/orgSlice';

const store = configureStore({
  reducer: {
    student: studentReducer,
    org: orgReducer
  }
});

export default store;