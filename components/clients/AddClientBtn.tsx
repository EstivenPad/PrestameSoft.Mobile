import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useUiStore, useClientStore } from "../../hooks";
import { COLORS } from "../../assets/theme";
import Ionicons from '@expo/vector-icons/Ionicons';

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
            <Ionicons name="person-add" size={28} color={COLORS.pure_white} />
        </TouchableOpacity>
    );
};


