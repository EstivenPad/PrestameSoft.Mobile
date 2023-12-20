import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-paper";

export const AddLoanBtn = () => {
    
    const router = useRouter();

    const onAddClient = () => {
        router.push('');
    };

    return (
        <TouchableOpacity
            onPress={onAddClient}
        >
            <Icon source="cash-plus" size={30} color="#fff" />
        </TouchableOpacity>
    )
};

