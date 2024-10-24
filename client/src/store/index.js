import { configureStore } from '@reduxjs/toolkit';
import callReducer from './slice';

const store = configureStore({
  reducer: {
    call: callReducer,
  },
});

export default store;
