import { TouchableOpacity } from "react-native";
import { useUiStore } from "../../hooks";
import { COLORS } from "../../assets";
import Ionicons from '@expo/vector-icons/Ionicons';

export const DeleteLoanBtn = () => {
    
    const { setShowDialogTrue } = useUiStore();

    const onDeleteLoan = () => {
        setShowDialogTrue();
    };

    return (
        <TouchableOpacity
            onPress={onDeleteLoan}
        >
            <Ionicons name="trash" size={28} color={COLORS.pure_white} />
        </TouchableOpacity>
    );
};
