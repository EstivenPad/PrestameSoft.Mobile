import { TouchableOpacity } from "react-native";
import { useUiStore } from "../../hooks";
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from "../../constants";

export const DeleteClientBtn = () => {
    
    const { setShowDialogTrue } = useUiStore();

    const onDeleteClient = () => {
        setShowDialogTrue();
    };

    return (
        <TouchableOpacity
            onPress={onDeleteClient}
        >
            <Ionicons name="trash" size={28} color={COLORS.pure_white} />
        </TouchableOpacity>
    );
};
