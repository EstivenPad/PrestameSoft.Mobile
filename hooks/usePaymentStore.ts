import { supabase } from "../server/supabaseClient";
import { 
    onAddNewPayment,
    onDeletePayment,
    onGetPendingPayments,
    onSetActiveListPayments,
    onSetActiveLoanItem,
    onSetActivePayment,
    onSetLoadingFalse,
    onSetLoadingTrue,
    onUpdatePayment
} from "../store";
import { ILoan } from "../utils/interfaces/ILoan";
import { IPayment } from "../utils/interfaces/IPayment";
import { useAppDispatch, useAppSelector } from "./hook";

interface LoanWithPayments {
    loan:ILoan,
    payments:IPayment[]
};

export const usePaymentStore = () => {

    const dispatch = useAppDispatch();
    const { 
        loansWithPendingPayments,
        activeLoanItem,
        activeListPayments,
        activePayment
    } = useAppSelector(state => state.payment);

    const setActiveLoanItem = (loan:ILoan) => {
        dispatch(onSetActiveLoanItem(loan));
    };

    const setActiveListPayments = (payments:IPayment[]) => {
        dispatch(onSetActiveListPayments(payments));
    };   

    const setActivePayment = (payment:IPayment) => {
        dispatch(onSetActivePayment(payment));
    };
    
    const getLoansWithPendingPayments = async (actualFortnight = true) => {
        dispatch(onSetLoadingTrue());

        const loanWithPendingPayment:ILoan[] = [];
        const paymentsGrouped:IPayment[] = [];
        
        const { data: loans, error: loan_error } = await supabase
            .from('loans')
            .select(`
                *, 
                clients (
                    name,
                    address,
                    phone
                )`
            );
        
        if(loan_error) {
            console.log(loan_error);
            dispatch(onSetLoadingFalse());
            return;
        }

        const { data: payments, error: payments_error } = await supabase
            .from('payments')
            .select('*')
            .order('created_at');
        
        if(payments_error){
            console.log(payments_error);
            dispatch(onSetLoadingFalse());
            return;
        }

        // TODO: REFACTOR THIS PART OF CODE:
        // Group the payments by their loan
        loans?.forEach((loan:ILoan) => {
            const paymentArray:LoanWithPayments[] = [];

            payments.forEach((payment:IPayment) => {
                if(payment.loan_id === loan.id)
                    paymentArray.push(payment);
            });

            const loanWithPayments:LoanWithPayments = {
                loan: loan,
                payments: paymentArray
            }

            paymentsGrouped.push(loanWithPayments);
        });
        
        // Map the gathered loans and their payments, and if it's a new loan 
        // or if the fortnight of the last payment is different from the actual fortnight
        // then we'll add it to the final list
        paymentsGrouped.map(loanItem => {
            if((loanItem.payments.length === 0)
                    || 
                (loanItem.payments[loanItem.payments.length - 1].fortnight !== actualFortnight)
            ){
                loanWithPendingPayment.push(loanItem);
            }
        });
        // TODO: REFACTOR UNTIL HERE...
        dispatch(onGetPendingPayments(loanWithPendingPayment));
        dispatch(onSetLoadingFalse());
    };

    const savePayment = async (payment:IPayment) => {
        dispatch(onSetLoadingTrue());

        const loan_updated = {...activeLoanItem};
        delete loan_updated.clients;

        // Calculate the difference between the capital remaining's interest and the interest deposit for adding to the capital remaining
        const dif = (activeLoanItem.capital_remaining * 0.1) - payment.interest_deposit;
        
        // Save the new payment on Supabase
        const { data:created_payment, error: created_payment_error } = await supabase
            .from('payments')
            .insert({...payment, loan_id: activeLoanItem.id})
            .select();
        
        if(created_payment_error) console.log(created_payment_error);

        // Update the Capital Remaining of the loan specified on Supabase
        const { error: loan_error } = await supabase
            .from('loans')
            .update({
                ...loan_updated,
                capital_remaining: (activeLoanItem.capital_remaining - payment.capital_deposit) + dif,
            })
            .eq('id', activeLoanItem.id)

        if(loan_error) console.log(loan_error);

        dispatch(onAddNewPayment({payment_item: created_payment[0], difference: dif}));
        dispatch(onSetLoadingFalse());
    };

    const updatePayment = async (payment) => {
        dispatch(onSetLoadingTrue());

        // Calculate the difference between the past value and the updated value of the capital deposit
        const dif = payment.capital_deposit - activePayment.capital_deposit;

        // Update the payment on Supabase
        const { data:updated_payment, error: updated_payment_error } = await supabase
            .from('payments')
            .update({...payment})
            .eq('id', activePayment.id)
            .select();
        
        if(updated_payment_error) console.log(updated_payment_error);

        // Update the Capital Remaining of the loan specified on Supabase
        const { error: loan_error } = await supabase
            .from('loans')
            .update({capital_remaining: activeLoanItem.capital_remaining - dif})
            .eq('id', activeLoanItem.id);
        
        if(loan_error) console.log(loan_error);

        dispatch(onUpdatePayment({payment_item: updated_payment[0], difference: dif}));
        dispatch(onSetLoadingFalse());
    };

    const deletePayment = async (payment) => {
        dispatch(onSetLoadingTrue());

        // Delete the payment on Supabase
        const { data: updated_payment, error: updated_payment_error } = await supabase
            .from('payments')
            .delete()
            .eq('id', payment.id)
            .select();
        
        if(updated_payment_error) console.log(updated_payment_error);

        // Update the Capital Remaining of the loan specified on Supabase
        const { error: loan_error } = await supabase
            .from('loans')
            .update({capital_remaining: activeLoanItem.capital_remaining + payment.capital_deposit})
            .eq('id', activeLoanItem.id);
            
        if(loan_error) console.log(loan_error);

        dispatch(onDeletePayment(updated_payment[0]));
        dispatch(onSetLoadingFalse());
    }

    return {
        //Properties
        loansWithPendingPayments,
        activeLoanItem,
        activeListPayments,
        activePayment,
        
        //Methods
        setActiveLoanItem,   
        setActiveListPayments,
        setActivePayment,
        getLoansWithPendingPayments,     
        savePayment,
        updatePayment,
        deletePayment
    };
}