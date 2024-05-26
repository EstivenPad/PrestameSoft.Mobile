import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-paper";
import { useLoanStore, useUiStore } from "../../hooks";

interface Props {
    clientId: number;
};

export const AddLoanBtn = ({clientId}:Props) => {
    
    const router = useRouter();
    const { setActiveLoan } = useLoanStore();
    const { setBlockItemFalse, setShowDialogFalse } = useUiStore();

    const onAddLoan = () => {
        setBlockItemFalse(); //Active the inputs and buttons to type in them
        setShowDialogFalse(); //Hide the delete dialog just in case
        
        setActiveLoan({
            client_id: clientId,
            amount: '',
            capital_remaining: ''
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

