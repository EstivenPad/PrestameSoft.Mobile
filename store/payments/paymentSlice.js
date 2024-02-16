import { createSlice } from '@reduxjs/toolkit';

export const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        loansWithPendingPayments: [],
        activeLoanItem: null,
        activeListPayments: [],
        activePayment: null,
    },
    reducers: {
        onSetActiveLoanItem: (state, { payload }) => {
            state.activeLoanItem = payload;
        },
        onSetActiveListPayments: (state, { payload }) => {
            state.activeListPayments = payload;
        },
        onSetActivePayment: (state, { payload } ) => {
            state.activePayment = payload;
        },
        onGetPendingPayments: (state, { payload } ) => {
            state.loansWithPendingPayments = payload;
        },
        onAddNewPayment: (state, { payload }) => {
            state.activeListPayments.push(payload);
            state.activeLoanItem.capital_remaining -= payload.capital_deposit;
            state.activePayment = null;
        },
        onUpdatePayment: (state, { payload }) => {
            state.activeListPayments = state.activeListPayments.map(payment => {
                if(payment.id === payload.payment_item.id)
                    return payload.payment_item;

                return payment;
            });
            state.activeLoanItem.capital_remaining -= payload.dif;
            state.activePayment = null;
        },
        onDeletePayment: (state, { payload }) => {
            state.activeListPayments = state.activeListPayments.filter(payment => payment.id !== payload.id);
            state.activeLoanItem.capital_remaining += payload.capital_deposit;
        },
    }
});

export const { 
    onSetActiveLoanItem,
    onSetActiveListPayments,
    onSetActivePayment,
    onGetPendingPayments,
    onAddNewPayment,
    onUpdatePayment,
    onDeletePayment
} = paymentSlice.actions;