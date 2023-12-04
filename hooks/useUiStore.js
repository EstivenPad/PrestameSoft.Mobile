import { useDispatch, useSelector } from "react-redux";
import { onSetSavingFalse, onSetSavingTrue } from "../store";

export const useUiStore = () => {
    const dispatch = useDispatch();
    
    const { isSaving } = useSelector(state => state.ui);

    const setSavingTrue = () => {
        dispatch(onSetSavingTrue());
    };
    
    const setSavingFalse = () => {
        dispatch(onSetSavingFalse());
    };

    return {
        //Properties
        isSaving,

        //Methods
        setSavingTrue,
        setSavingFalse
    };
}