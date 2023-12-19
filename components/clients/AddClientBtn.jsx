import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-paper";
import { useClientStore } from "../../hooks/useClientStore";

export const AddClientBtn = () => {
        
    const router = useRouter();
    
    const { setActiveClient } = useClientStore();

    const onAddClient = () => {
        setActiveClient({
            nombre: '',
            direccion: '',
            cedula: '',
            telefono: ''
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


