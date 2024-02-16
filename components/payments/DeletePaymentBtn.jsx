import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-paper";
import { useUiStore } from "../../hooks";

export const DeletePaymentBtn = () => {
    
    const { setShowDialogTrue } = useUiStore();

    const onDeletePayment = () => {
        setShowDialogTrue();
    };

    return (
        <TouchableOpacity
            onPress={onDeletePayment}
        >
            <Icon source="delete" size={30} color="#fff" />
        </TouchableOpacity>
    );
};
