import { createSlice } from '@reduxjs/toolkit';

export const clientSlice = createSlice({
    name: 'client',
    initialState: {
        clients: [],
        activeClient: null,
    },
    reducers: {
        onSetInitialState: (state) => {
            state.clients = [];
            state.activeClient = null;
        },
        onSetClients: (state, { payload }) => {
            state.clients = payload;
        },
        onGetClients: (state, { payload }) => {
            state.clients = payload;
        },
        onSetActiveClient: (state, { payload }) => {
            state.activeClient = payload;
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
        onDeleteClientById: (state, { payload }) => {
            state.activeClient = null;
            state.clients = state.clients.filter(client => client.id !== payload);
        }
    }
});

export const { 
    onSetInitialState,
    onSetClients,
    onGetClients, 
    onSetActiveClient, 
    onAddNewClient,
    onUpdateClientById,
    onDeleteClientById
} = clientSlice.actions;