import { createSlice } from '@reduxjs/toolkit';

export const loanSlice = createSlice({
    name: 'loan',
    initialState: {
        loans: [],
        activeLoan: null
        //{
            // id: '',
            //client: '000-0000000-0',
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
        }
    }
});


export const { onGetLoans, onAddNewLoan, onSetActiveLoan } = loanSlice.actions;