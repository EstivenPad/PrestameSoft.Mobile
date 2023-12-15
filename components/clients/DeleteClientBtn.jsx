import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-paper";
import { useUiStore } from "../../hooks";

export default function DeleteClientBtn() {
    
    const { switchDialog } = useUiStore();

    const onDeleteClient = () => {
        switchDialog();
    };

    return (
        <TouchableOpacity
            onPress={onDeleteClient}
        >
            <Icon source="delete" size={30} color="#fff" />
        </TouchableOpacity>
    );
}
