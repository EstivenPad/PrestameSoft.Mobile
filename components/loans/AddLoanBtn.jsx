import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-paper";
import { useLoanStore, useUiStore } from "../../hooks";

export const AddLoanBtn = () => {
    
    const router = useRouter();
    
    const { setActiveLoan } = useLoanStore();
    const { setBlockItemFalse, setShowDialogFalse } = useUiStore();

    const onAddClient = () => {
        setBlockItemFalse(); //Active the inputs and buttons to type in them
        setShowDialogFalse(); //Hide the delete dialog just in case

        setActiveLoan({
            cantidadPrestada: '',
            fechaPrestamo: new Date(),
            descripcionGarantia: '',
            cantidadQuincenas: 0,
            quincenaInicio: false
        });

        router.push('/(tabs)/clients/loan-detail');
    };

    return (
        <TouchableOpacity
            onPress={onAddClient}
        >
            <Icon source="cash-plus" size={30} color="#fff" />
        </TouchableOpacity>
    )
};

