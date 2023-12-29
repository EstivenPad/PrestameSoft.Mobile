import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-paper";
import { useLoanStore, useUiStore } from "../../hooks";

export const AddLoanBtn = ({client}) => {
    
    const router = useRouter();
    const { setActiveLoan } = useLoanStore();
    const { setBlockItemFalse, setShowDialogFalse } = useUiStore();

    const onAddLoan = () => {
        setBlockItemFalse(); //Active the inputs and buttons to type in them
        setShowDialogFalse(); //Hide the delete dialog just in case

        setActiveLoan({
            cliente: client.cedula,
            cantidadPrestada: '',
            fechaPrestamo: new Date(),
            descripcionGarantia: '',
            cantidadQuincenas: '',
            quincenaInicio: false
        });

        router.push('/(tabs)/clients/loan-detail');
    };

    return (
        <TouchableOpacity
            onPress={onAddLoan}
        >
            <Icon source="cash-plus" size={30} color="#fff" />
        </TouchableOpacity>
    )
};

