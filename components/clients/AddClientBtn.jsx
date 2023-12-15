import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-paper";
import { useClientStore } from "../../hooks/useClientStore";

export default function AddClientBtn() {
        
    const router = useRouter();
    
    const { setActiveClient } = useClientStore();

    const onAddClient = () => {
        setActiveClient({
            nombre: '',
            direccion: '',
            cedula: '',
            telefono: ''
        });

        router.push('clients/client-detail/ClientDetail');
    };
 
    return (
        <TouchableOpacity
            onPress={onAddClient}
        >
            <Icon source="account-plus" size={30} color="#fff" />
        </TouchableOpacity>
    );
}

