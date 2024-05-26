import { TouchableOpacity } from "react-native";
import { useUiStore } from "../../hooks";
import { COLORS } from "../../assets";
import Ionicons from '@expo/vector-icons/Ionicons';

export const DeletePaymentBtn = () => {
    
    const { setShowDialogTrue } = useUiStore();

    const onDeletePayment = () => {
        setShowDialogTrue();
    };

    return (
        <TouchableOpacity
            onPress={onDeletePayment}
        >
        <Ionicons name="trash" size={28} color={COLORS.pure_white} />
        </TouchableOpacity>
    );
};
