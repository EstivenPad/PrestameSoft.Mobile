import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-paper";
import { useUiStore } from "../../hooks";

export const RefreshPaymentBtn = () => {
    
    const { setShowFortnightDialogTrue } = useUiStore();

    const onRefreshPayment = () => {
        setShowFortnightDialogTrue();
    };

    return (
        <TouchableOpacity
            onPress={onRefreshPayment}
        >
            <Icon source="refresh" size={30} color="#fff" />
        </TouchableOpacity>
    );
};
