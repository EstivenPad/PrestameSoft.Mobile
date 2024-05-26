import { 
    onSetShowDialogTrue,
    onSetShowDialogFalse,
    onSetLoadingTrue,
    onSetLoadingFalse,
    onSetBlockItemTrue,
    onSetBlockItemFalse,
    onSetShowFortnightDialogTrue,
    onSetShowFortnightDialogFalse
} from "../store";
import { useAppDispatch, useAppSelector } from "./hook";

export const useUiStore = () => {
    const dispatch = useAppDispatch();
    
    const { isLoading, showDialog, blockItem, showFortnightDialog } = useAppSelector(state => state.ui);

    const setLoadingTrue = () => {
        dispatch(onSetLoadingTrue());
    };
    
    const setLoadingFalse = () => {
        dispatch(onSetLoadingFalse());
    };

    const setBlockItemTrue = () => {
        dispatch(onSetBlockItemTrue());
    };

    const setBlockItemFalse = () => {
        dispatch(onSetBlockItemFalse());
    };

    const setShowDialogTrue = () => {
        dispatch(onSetShowDialogTrue());
    };
    
    const setShowDialogFalse = () => {
        dispatch(onSetShowDialogFalse());
    };

    const setShowFortnightDialogTrue = () => {
        dispatch(onSetShowFortnightDialogTrue());
    };
    
    const setShowFortnightDialogFalse = () => {
        dispatch(onSetShowFortnightDialogFalse());
    };

    return {
        //Properties
        isLoading,
        blockItem,
        showDialog,
        showFortnightDialog,
        
        //Methods
        setLoadingTrue,
        setLoadingFalse,
        setBlockItemTrue,
        setBlockItemFalse,
        setShowDialogTrue,
        setShowDialogFalse,
        setShowFortnightDialogTrue,
        setShowFortnightDialogFalse
    };
}