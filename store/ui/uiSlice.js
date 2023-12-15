import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isLoading: false,
        blockItem: false,
        showDialog: false
    },
    reducers: {
        onSetLoadingTrue: (state) => {
            state.isLoading = true;
        },
        onSetLoadingFalse: (state) => {
            state.isLoading = false;
        },
        onSwitchDialog: (state) => {
            state.showDialog = !state.showDialog;
        },
        onSetBlockItemTrue: (state) => {
            state.blockItem = true;
        },
        onSetBlockItemFalse: (state) => {
            state.blockItem = false;
        },
    }
});


export const { 
    onSetLoadingTrue,
    onSetLoadingFalse,
    onSwitchDialog,
    onSetBlockItemTrue,
    onSetBlockItemFalse
} = uiSlice.actions;