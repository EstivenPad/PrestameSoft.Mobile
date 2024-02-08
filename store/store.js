import { configureStore } from '@reduxjs/toolkit';
import { clientSlice, paymentSlice, loanSlice, uiSlice } from './';

export const store = configureStore({
    reducer: {
        client: clientSlice.reducer,
        loan: loanSlice.reducer,
        payment: paymentSlice.reducer,
        ui: uiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false
    })
})