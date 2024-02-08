import { createSlice } from '@reduxjs/toolkit';

export const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        activePayment: null,
        activeLoanWithPendingPayments: null,
        pendingPayments: []
    },
    reducers: {
        onGetPendingPayments: (state, { payload } ) => {
            state.pendingPayments = payload;
        },
        onSetActivePayment: (state, { payload } ) => {
            state.activePayment = payload;
        },
        onSetActiveLoanWithPendingPayments: (state, { payload } ) => {
            state.activeLoanWithPendingPayments = payload;
        },
    }
});

export const { onGetPendingPayments, onSetActivePayment, onSetActiveLoanWithPendingPayments } = paymentSlice.actions;