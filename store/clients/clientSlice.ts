import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IClient } from '../../utils/interfaces/IClient';

interface ClientState {
    clients: IClient[];
    activeClient: IClient | null;
};

const initialState:ClientState = {
    clients: [],
    activeClient: null,
};

export const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        onSetClients: (state, { payload }:PayloadAction<IClient[]>) => {
            state.clients = payload;
        },
        onSetActiveClient: (state, { payload }:PayloadAction<IClient>) => {
            state.activeClient = payload;
        },
        onAddNewClient: (state, { payload }:PayloadAction<IClient>) => {
            state.clients.push(payload);
            state.activeClient = null;
        },
        onUpdateClientById: (state, { payload }:PayloadAction<IClient>) => {
            state.clients = state.clients.map(client => {
                if(client.id === payload.id)
                    return payload;

                return client;
            });
        },
        onDeleteClientById: (state, { payload }:PayloadAction<number>) => {
            state.activeClient = null;
            state.clients = state.clients.filter(client => client.id !== payload);
        }
    }
});

export const {
    onSetClients,
    onSetActiveClient, 
    onAddNewClient,
    onUpdateClientById,
    onDeleteClientById
} = clientSlice.actions;