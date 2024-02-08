import { createSlice } from '@reduxjs/toolkit';

export const loanSlice = createSlice({
    name: 'loan',
    initialState: {
        loans: [],
        activeLoan: null,
    },
    reducers: {
        onGetLoans: (state, { payload }) => {
            state.loans = payload;
        },
        onAddNewLoan: (state, { payload }) => {
            state.loans.push(payload);
        },
        onSetActiveLoan: (state, { payload }) => {
            state.activeLoan = payload;
        },
        onUpdateLoan: (state, { payload }) => {
            state.loans = state.loans.map(loan => {
                if(loan.id === payload.id)
                    return payload;

                return loan;
            });
        },
        onDeleteLoan: (state, { payload }) => {
            state.activeLoan = null;
            state.loans = state.loans.filter((loan) => loan.id !== payload);
        },
        onSetLoanPayments: (state, {payload}) => {
            state.loanPayments = payload;
        }
    }
});


export const { 
    onGetLoans,
    onAddNewLoan,
    onSetActiveLoan,
    onUpdateLoan,
    onDeleteLoan,
    onSetLoanPayments
} = loanSlice.actions;