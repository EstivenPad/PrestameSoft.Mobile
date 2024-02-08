import { useDispatch, useSelector } from "react-redux";
import { supabase } from "../server/supabaseClient";
import { 
    onGetPendingPayments,
    onSetActiveLoanWithPendingPayments,
    onSetActivePayment,
    onSetLoadingFalse,
    onSetLoadingTrue
} from "../store";

export const usePaymentStore = () => {

    const dispatch = useDispatch();
    const { pendingPayments, activeLoanWithPendingPayments, activePayment } = useSelector(state => state.payment);

    const getLoansWithPendingPayments = async (actualFortnight = true) => {
        dispatch(onSetLoadingTrue());

        const loanWithPendingPayment = [];
        const paymentsGrouped = [];
        
        const { data: loans, error: loan_error } = await supabase.from('loans').select(`
            *, 
            clients (
                name,
                address,
                phone
            )`
        );
        
        if(loan_error) console.log(loan_error);

        const { data: payments, error: payments_error } = await supabase.from('payments').select(`
            id,
            fortnight,
            payment_date,
            capital_deposit,
            interest_deposit,
            loan_id`
        ).order('payment_date');
        
        if(payments_error) console.log(payments_error);

        //Group the payments by their loan
        loans.forEach(loan => {
            const paymentArray = [];

            payments.forEach(payment => {
                if(payment.loan_id === loan.id)
                    paymentArray.push(payment);
            });

            paymentsGrouped.push({loan: loan, payments: paymentArray});
        });
        
        paymentsGrouped.map(loanItem => {
            
            if(loanItem.payments[loanItem.payments.length - 1].fortnight !== actualFortnight){
                loanWithPendingPayment.push(loanItem);
            }

        });
        
        dispatch(onGetPendingPayments(loanWithPendingPayment));
        dispatch(onSetLoadingFalse());
    }

    const setActiveLoanWithPendingPayments = (payment) => {
        dispatch(onSetActiveLoanWithPendingPayments(payment));
    }

    const savePayment = async (payment) => {

        const { data, error } = supabase.from('payments').insert(payment).select();

        if(error) console.log(error);

    }

    const setActivePayment = (payment) => {
        dispatch(onSetActivePayment(payment));
    }

    return {
        //Properties
        pendingPayments,
        activeLoanWithPendingPayments,
        activePayment, 
        
        //Methods
        getLoansWithPendingPayments,        
        setActiveLoanWithPendingPayments,
        setActivePayment,
        savePayment
    }
}