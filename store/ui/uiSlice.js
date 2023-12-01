import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isSaving: false
    },
    reducers: {
        setSavingTrue: (state) => {
            state.isSaving = true;
        },
        setSavingFalse: (state) => {
            state.isSaving = false;
        }
    }
});


export const { setSavingTrue, setSavingFalse } = uiSlice.actions;