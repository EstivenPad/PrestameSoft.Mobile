import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-paper";
import { useClientStore } from "../../../hooks/useClientStore";

export default function AddClientBtn() {
    const newClient = {
        nombre: '',
        direccion: '',
        cedula: '',
        telefono: ''
    }
    
    const router = useRouter();
    const { setActiveClient } = useClientStore();

    const onAddClient = () => {
        setActiveClient(newClient);

        router.push('clients/client-detail/ClientDetail');
    };

    return (
        <TouchableOpacity
            onPress={onAddClient}
            style={styles.btn}
        >
            <Icon source="account-plus" size={30} color="#fff" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({});
