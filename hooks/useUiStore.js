import { useDispatch, useSelector } from "react-redux";
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

export const useUiStore = () => {
    const dispatch = useDispatch();
    
    const { isLoading, showDialog, blockItem, showFortnightDialog } = useSelector(state => state.ui);

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