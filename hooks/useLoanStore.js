import { useDispatch, useSelector } from "react-redux";
import { FirebaseDB } from "../server/firebaseConfig";
import { collection, doc, getDocs, setDoc } from "firebase/firestore/lite";
import { 
    onAddNewLoan,
    onGetLoans,
    onSetActiveLoan,
    onSetLoadingFalse,
    onSetLoadingTrue
} from "../store";

export const useLoanStore = () => {
    const dispatch = useDispatch();
    
    const { loans, activeLoan } = useSelector(state => state.loan);
    
    const getLoans = async () => {
        dispatch(onSetLoadingTrue());
        
        try {
            const loansToDispatch = [];
            const loansRef = await getDocs(collection(FirebaseDB, 'Prestamos'));
            
            loansRef.forEach((doc) => {
                const { cantidadPrestada, fechaPrestamo, descripcionGarantia, cantidadQuincenas, quincenaInicio } = doc.data();
                
                loansToDispatch.push({
                    id: doc.id,
                    cantidadPrestada,
                    fechaPrestamo: fechaPrestamo.toDate(),
                    descripcionGarantia,
                    cantidadQuincenas,
                    quincenaInicio
                });
            });

            dispatch(onGetLoans(loansToDispatch));
        } catch (error) {
            throw new Error(error);
        } finally {            
            dispatch(onSetLoadingFalse());
        }
    };

    const setActiveLoan = (loan = null) => {
        dispatch(onSetActiveLoan(loan));
    };

    const setNewLoan = async (loan) => {
        dispatch(onSetLoadingTrue());

        try {
            const loanRef = doc(collection(FirebaseDB, 'Prestamos'));
            await setDoc(loanRef, {...loan});

            dispatch(onAddNewLoan({ id: loanRef.id, ...loan }));
        } catch (error) {
            throw new Error(error);
        } finally {
            dispatch(onSetLoadingFalse());
        }
    };    

    return {
        //Properties
        loans,
        activeLoan,

        //Methods
        getLoans,
        setActiveLoan,
        setNewLoan,
    };
}