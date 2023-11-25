import { configureStore } from '@reduxjs/toolkit';
import { clientSlice } from '.';

export const store = configureStore({
  reducer: {
    client: clientSlice.reducer
  }
})