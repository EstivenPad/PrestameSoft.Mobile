import { useDispatch, useSelector } from "react-redux";
import { 
    onSetShowDialogTrue,
    onSetShowDialogFalse,
    onSetLoadingTrue,
    onSetLoadingFalse,
    onSetBlockItemTrue,
    onSetBlockItemFalse
} from "../store";

export const useUiStore = () => {
    const dispatch = useDispatch();
    
    const { isLoading, showDialog, blockItem } = useSelector(state => state.ui);

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
        setLoadingTrue,
        setLoadingFalse,
        setBlockItemTrue,
        setBlockItemFalse,
        setShowDialogTrue,
        setShowDialogFalse
    };
}