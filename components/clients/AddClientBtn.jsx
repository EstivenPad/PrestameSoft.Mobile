import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-paper";
import { useUiStore, useClientStore } from "../../hooks";

export const AddClientBtn = () => {
        
    const router = useRouter();
    
    const { setBlockItemFalse, setShowDialogFalse } = useUiStore();
    const { setActiveClient } = useClientStore();

    const onAddClient = () => {
        setBlockItemFalse(); //Active the inputs and buttons to type in them
        setShowDialogFalse(); //Hide the delete dialog just in case

        setActiveClient({
            name: '',
            address: '',
            identification: '',
            phone: ''
        });

        router.push('/(tabs)/clients/client-detail');
    };
 
    return (
        <TouchableOpacity
            onPress={onAddClient}
        >
            <Icon source="account-plus" size={30} color="#fff" />
        </TouchableOpacity>
    );
};


