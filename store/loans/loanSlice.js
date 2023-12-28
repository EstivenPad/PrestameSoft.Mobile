import { createSlice } from '@reduxjs/toolkit';

export const loanSlice = createSlice({
    name: 'loan',
    initialState: {
        loans: [
            {
                id: '',
                cantidadPrestada: '',
                fechaPrestamo: new Date(),
                descripcionGarantia: '',
                cantidadQuincenas: '',
                quincenaInicio: false
            }
        ],
        activeLoan: null
        //{
            // id: '',
            // cantidadPrestada: '',
            // fechaPrestamo: new Date(),
            // descripcionGarantia: '',
            // cantidadQuincenas: '',
            // quincenaInicio: false
        //}
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
        onSetLoanDate: (state, { payload }) => {
            state.activeLoan = { ...state.activeLoan, fechaPrestamo: payload };
        },
    }
});


export const { onGetLoans, onAddNewLoan, onSetActiveLoan, onSetLoanDate } = loanSlice.actions;