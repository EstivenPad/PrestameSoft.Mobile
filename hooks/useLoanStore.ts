import { supabase } from "../server/supabaseClient";
import { 
    onAddNewLoan,
    onDeleteLoan,
    onGetLoans,
    onUpdateLoan,
    onSetActiveLoan,
    onSetLoadingFalse,
    onSetLoadingTrue,
    onSetShowDialogFalse
} from "../store";
import { ILoan } from "../utils/interfaces/ILoan";
import { useAppDispatch, useAppSelector } from "./hook";

export const useLoanStore = () => {
    const dispatch = useAppDispatch();
    const { loans, activeLoan } = useAppSelector(state => state.loan);
    
    const getLoans = async (clientId:number) => {
        dispatch(onSetLoadingTrue());
        
        const loansToDispatch:ILoan[] = [];
        const { data: Loans, error } = await supabase.from('loans').select('*').eq('client_id', clientId);
        
        if(error){
            console.log(error);
            dispatch(onSetLoadingFalse());
            return;
        };

        Loans?.map(({ id, client_id, amount, capital_remaining, created_at:created_date }) => {
            loansToDispatch.push({
                id,
                client_id,
                amount,
                capital_remaining,
                created_at: new Date(created_date)
            });
        });
        
        dispatch(onGetLoans(loansToDispatch));
        dispatch(onSetLoadingFalse());
    };

    const setActiveLoan = (loan:ILoan) => {
        dispatch(onSetActiveLoan(loan));
    };

    const createNewLoan = async (loan:ILoan) => {
        dispatch(onSetLoadingTrue());
        
        const newLoan = {...loan, capital_remaining: loan.amount};
        const { data:Loan, error } = await supabase.from('loans').insert(newLoan).select();
        
        if(error){
            console.log(error);
            dispatch(onSetLoadingFalse());
            return;
        };
        
        // Converte the returned date into a Date object of JS 
        dispatch(onAddNewLoan({ ...Loan[0], created_at: new Date(Loan[0].created_at) }));
        dispatch(onSetLoadingFalse());
    };    

    const updateLoan = async (loan:ILoan) => {
        dispatch(onSetLoadingTrue());

        const loanToDB = {...loan, capital_remaining: loan.amount};
        delete loanToDB.id;

        const { data:Loan, error } = await supabase.from('loans').update(loanToDB).eq('id', activeLoan?.id).select();
        
        if(error){
            console.log(error);
            dispatch(onSetLoadingFalse());
            return;
        };

        dispatch(onUpdateLoan({ ...Loan[0], created_at: new Date(Loan[0].created_at) }));
        dispatch(onSetLoadingFalse());
    };

    const deleteLoan = async (loanId:number) => {
        dispatch(onSetLoadingTrue());
           
        const { error } = await supabase.from('loans').delete().eq('id', loanId)
        
        if(error){
            console.log(error);
            dispatch(onSetLoadingFalse());
            return;
        };

        dispatch(onDeleteLoan(loanId));
        dispatch(onSetLoadingFalse());
        dispatch(onSetShowDialogFalse());
    };

    return {
        //Properties
        loans,
        activeLoan,

        //Methods
        getLoans,
        setActiveLoan,
        createNewLoan,
        updateLoan,
        deleteLoan
    };
}