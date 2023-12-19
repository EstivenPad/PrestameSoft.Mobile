import { useDispatch, useSelector } from "react-redux";
import { 
    onSetShowDialogTrue,
    onSetShowDialogFalse,
    onSetSavingFalse,
    onSetSavingTrue,
    onSetBlockItemTrue,
    onSetBlockItemFalse
} from "../store";

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

    const setShowDialogTrue = () => {
        dispatch(onSetShowDialogTrue());
    }
    
    const setShowDialogFalse = () => {
        dispatch(onSetShowDialogFalse());
    };

    return {
        //Properties
        isLoading,
        blockItem,
        showDialog,
        
        //Methods
        setSavingTrue,
        setSavingFalse,
        setBlockItemTrue,
        setBlockItemFalse,
        setShowDialogTrue,
        setShowDialogFalse,
    };
}