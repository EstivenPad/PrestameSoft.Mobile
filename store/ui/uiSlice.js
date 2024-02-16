import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isLoading: false,
        blockItem: false,
        showDialog: false,
        showFortnightDialog: false,
    },
    reducers: {
        onSetLoadingTrue: (state) => {
            state.isLoading = true;
        },
        onSetLoadingFalse: (state) => {
            state.isLoading = false;
        },
        onSetBlockItemTrue: (state) => {
            state.blockItem = true;
        },
        onSetBlockItemFalse: (state) => {
            state.blockItem = false;
        },
        onSetShowDialogTrue: (state) => {
            state.showDialog = true;
        },
        onSetShowDialogFalse: (state) => {
            state.showDialog = false;
        },
        onSetShowFortnightDialogTrue: (state) => {
            state.showFortnightDialog = true;
        },
        onSetShowFortnightDialogFalse: (state) => {
            state.showFortnightDialog = false;
        },
    }
});


export const { 
    onSetLoadingTrue,
    onSetLoadingFalse,
    onSetShowDialogTrue,
    onSetShowDialogFalse,
    onSetBlockItemTrue,
    onSetBlockItemFalse,
    onSetShowFortnightDialogTrue,
    onSetShowFortnightDialogFalse
} = uiSlice.actions;