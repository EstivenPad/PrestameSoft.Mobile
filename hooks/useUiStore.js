import { useDispatch, useSelector } from "react-redux";
import { onSwitchDialog, onSetSavingFalse, onSetSavingTrue, onSetBlockItemTrue, onSetBlockItemFalse } from "../store";

export const useUiStore = () => {
    const dispatch = useDispatch();
    
    const { isLoading, showDialog, blockItem } = useSelector(state => state.ui);

    const setSavingTrue = () => {
        dispatch(onSetSavingTrue());
    };
    
    const setSavingFalse = () => {
        dispatch(onSetSavingFalse());
    };

    const setBlockItemTrue = () => {
        dispatch(onSetBlockItemTrue());
    };

    const setBlockItemFalse = () => {
        dispatch(onSetBlockItemFalse());
    };
    
    const switchDialog = () => {
        dispatch(onSwitchDialog());
    };

    return {
        //Properties
        isLoading,
        showDialog,
        blockItem,
        
        //Methods
        setSavingTrue,
        setSavingFalse,
        setBlockItemTrue,
        setBlockItemFalse,
        switchDialog
    };
}