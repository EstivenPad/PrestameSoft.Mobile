import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-paper";
import { useUiStore } from "../../hooks";

export const DeleteClientBtn = () => {
    
    const { setShowDialogTrue } = useUiStore();

    const onDeleteClient = () => {
        setShowDialogTrue();
    };

    return (
        <TouchableOpacity
            onPress={onDeleteClient}
        >
            <Icon source="delete" size={30} color="#fff" />
        </TouchableOpacity>
    );
};
