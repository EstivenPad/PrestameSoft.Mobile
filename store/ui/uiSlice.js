import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isLoading: false,
        blockItem: false,
        showDialog: false,
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
        }
    }
});


export const { 
    onSetLoadingTrue,
    onSetLoadingFalse,
    onSetShowDialogTrue,
    onSetShowDialogFalse,
    onSetBlockItemTrue,
    onSetBlockItemFalse
} = uiSlice.actions;