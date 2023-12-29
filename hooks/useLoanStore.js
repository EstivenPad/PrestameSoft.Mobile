import { useDispatch, useSelector } from "react-redux";
import { FirebaseDB } from "../server/firebaseConfig";
import { collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore/lite";
import { 
    onAddNewLoan,
    onGetLoans,
    onSetActiveLoan,
    onSetLoadingFalse,
    onSetLoadingTrue,
    onUpdateLoanById
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

    const updateLoan = async (loan) => {
        dispatch(onSetLoadingTrue());
        
        try {
            const loanToFirestore = {...loan};
            delete loanToFirestore.id;

            const loanRef = doc(FirebaseDB, 'Prestamos', activeLoan.id);            
            await updateDoc(loanRef, loanToFirestore);

            dispatch(onUpdateLoanById(loan));
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
        updateLoan
    };
}