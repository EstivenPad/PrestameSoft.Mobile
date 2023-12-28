import { configureStore } from '@reduxjs/toolkit';
import { clientSlice, loanSlice, uiSlice } from './';

export const store = configureStore({
    reducer: {
        client: clientSlice.reducer,
        ui: uiSlice.reducer,
        loan: loanSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false
    })
})