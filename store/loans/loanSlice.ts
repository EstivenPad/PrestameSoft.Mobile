import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ILoan } from '../../utils/interfaces/ILoan';

interface LoanState {
    loans: ILoan[];
    activeLoan: ILoan | null;
};

const initialState:LoanState = {
    loans: [],
    activeLoan: null,
};

export const loanSlice = createSlice({
    name: 'loan',
    initialState,
    reducers: {
        onGetLoans: (state, { payload }:PayloadAction<ILoan[]>) => {
            state.loans = payload;
        },
        onAddNewLoan: (state, { payload }:PayloadAction<ILoan>) => {
            state.loans.push(payload);
            state.activeLoan = null;
        },
        onSetActiveLoan: (state, { payload }:PayloadAction<ILoan>) => {
            state.activeLoan = payload;
        },
        onUpdateLoan: (state, { payload }:PayloadAction<ILoan>) => {
            state.loans = state.loans.map(loan => {
                if(loan.id === payload.id)
                    return payload;

                return loan;
            });
        },
        onDeleteLoan: (state, { payload }:PayloadAction<number>) => {
            state.activeLoan = null;
            state.loans = state.loans.filter((loan) => loan.id !== payload);
        }
    }
});


export const { 
    onGetLoans,
    onAddNewLoan,
    onSetActiveLoan,
    onUpdateLoan,
    onDeleteLoan
} = loanSlice.actions;