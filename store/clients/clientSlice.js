import { createSlice } from '@reduxjs/toolkit';

export const clientSlice = createSlice({
    name: 'client',
    initialState: {
        clients: [],
        activeClient: null,
        //  Client structure
        // {
        //     id: 0,
        //     nombre: "",
        //     direccion: "",
        //     cedula: "",
        //     telefono: "",
        // }
    },
    reducers: {
        onSetInitialState: (state) => {
            state.clients = [];
            state.activeClient = null;
        },
        onSetActiveClient: (state, { payload }) => {
            state.activeClient = payload;
        },
        onGetClients: (state, { payload }) => {
            state.clients = payload;
        },
        onAddNewClient: (state, { payload }) => {
            state.clients.push(payload);
            state.activeClient = null;
        },
        onUpdateClientById: (state, { payload }) => {
            state.clients = state.clients.map(client => {
                if(client.id === payload.id)
                    return payload;

                return client;
            });
        },
        onDeleteClientById: (state, {payload}) => {
            state.activeClient = null;
            state.clients = state.clients.filter((client) => client.id !== payload);
        }
    }
});

export const { 
    setInitialState, 
    onGetClients, 
    onSetActiveClient, 
    onAddNewClient,
    onUpdateClientById,
    onDeleteClientById
} = clientSlice.actions;