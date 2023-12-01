import { configureStore } from '@reduxjs/toolkit';
import { clientSlice, uiSlice } from '.';

export const store = configureStore({
    reducer: {
        client: clientSlice.reducer,
        ui: uiSlice.reducer,
    }
})