import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isSaving: false
    },
    reducers: {
        onSetSavingTrue: (state) => {
            state.isSaving = true;
        },
        onSetSavingFalse: (state) => {
            state.isSaving = false;
        }
    }
});


export const { onSetSavingTrue, onSetSavingFalse } = uiSlice.actions;