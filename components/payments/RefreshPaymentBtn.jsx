import { TouchableOpacity } from "react-native";
import { useUiStore } from "../../hooks";
import { COLORS } from "../../constants";
import Ionicons from '@expo/vector-icons/Ionicons';

export const RefreshPaymentBtn = () => {
    
    const { setShowFortnightDialogTrue } = useUiStore();

    const onRefreshPayment = () => {
        setShowFortnightDialogTrue();
    };

    return (
        <TouchableOpacity
            onPress={onRefreshPayment}
        >
            <Ionicons name="refresh" size={28} color={COLORS.pure_white} />
        </TouchableOpacity>
    );
};
