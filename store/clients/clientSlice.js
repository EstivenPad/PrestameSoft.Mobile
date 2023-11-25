import { createSlice } from '@reduxjs/toolkit';

export const clientSlice = createSlice({
    name: 'client',
    initialState: {
        clients: []       
    },
    reducers: {
        setInitialState: (state) => {
            state.clients = [];
        },
    }
});

export const { setInitialState } = clientSlice.actions;