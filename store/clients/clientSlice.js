import { createSlice } from '@reduxjs/toolkit';

export const clientSlice = createSlice({
    name: 'client',
    initialState: {
        clients: [],
        activeClient: null,
        //  Client structure
        // {
        //     nombre: "",
        //     direccion: "",
        //     cedula: "",
        //     telefono: "",
        // }
        messageSaved: ''
    },
    reducers: {
        onSetInitialState: (state) => {
            state.clients = [];
            state.activeClient = null;
            state.messageSaved = '';
        },
        onSetActiveClient: (state, { payload }) => {
            state.activeClient = payload;
        },
        onGetClients: (state, actions) => {
            state.clients = actions.payload;
        }
    }
});

export const { setInitialState, onGetClients, onSetActiveClient } = clientSlice.actions;