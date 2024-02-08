import { useDispatch, useSelector } from "react-redux";
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

export const useLoanStore = () => {
    const dispatch = useDispatch();
    const { loans, activeLoan } = useSelector(state => state.loan);
    
    const getLoans = async (clientId) => {
        dispatch(onSetLoadingTrue());
        
        const loansToDispatch = [];
        const { data: Loans, error } = await supabase.from('loans').select('*').eq('client_id', clientId);
        
        if(error) console.log(error);

        Loans.map(({ id, client_id, amount, capital_remaining, loan_date:supabaseDate }) => {
            loansToDispatch.push({
                id,
                client_id,
                amount,
                capital_remaining,
                loan_date: new Date(supabaseDate)
            });
        });
        
        dispatch(onGetLoans(loansToDispatch));
        dispatch(onSetLoadingFalse());
    };

    const setActiveLoan = (loan = null) => {
        dispatch(onSetActiveLoan(loan));
    };

    const createNewLoan = async (loan) => {
        dispatch(onSetLoadingTrue());
        
        const newLoan = {...loan, capital_remaining: loan.amount};
        const { data:Loan, error } = await supabase.from('loans').insert(newLoan).select();
        
        if(error) console.log(error);
        
        //Converte the returned date into a Date object of JS 
        dispatch(onAddNewLoan({ ...Loan[0], loan_date: new Date(Loan[0].loan_date) }));
        dispatch(onSetLoadingFalse());
    };    

    const updateLoan = async (loan) => {
        dispatch(onSetLoadingTrue());

        const loanToDB = {...loan, capital_remaining: loan.amount};
        delete loanToDB.id;

        const { data:Loan, error } = await supabase.from('loans').update(loanToDB).eq('id', activeLoan.id).select();
        if(error) console.log(error);

        dispatch(onUpdateLoan({ ...Loan[0], loan_date: new Date(Loan[0].loan_date) }));
        dispatch(onSetLoadingFalse());
    };

    const deleteLoan = async (loanId) => {
        dispatch(onSetLoadingTrue());
           
        const { error } = await supabase.from('loans').delete().eq('id', loanId)
        
        if(error) console.log(error);

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