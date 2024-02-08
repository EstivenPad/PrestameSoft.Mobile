import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-paper";
import { useUiStore } from "../../hooks";

export const DeleteLoanBtn = () => {
    
    const { setShowDialogTrue } = useUiStore();

    const onDeleteLoan = () => {
        setShowDialogTrue();
    };

    return (
        <TouchableOpacity
            onPress={onDeleteLoan}
        >
            <Icon source="delete" size={30} color="#fff" />
        </TouchableOpacity>
    );
};
