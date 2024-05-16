import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { useClientStore, useUiStore } from "../../hooks";
import { COLORS } from "../../constants/theme";
import Ionicons from '@expo/vector-icons/Ionicons';

export const ClientCard = ({ client }) => {    

    const router = useRouter();
    const { setActiveClient } = useClientStore();
    const { setShowDialogFalse } = useUiStore();
    
    const onDisplayClient = () => {
        setActiveClient(client);
        setShowDialogFalse(); //Hide the delete dialog just in case

        router.push('/(tabs)/clients/client-detail');
    };

    return (
        <TouchableOpacity onPress={onDisplayClient} style={styles.container}>
            <Text style={styles.label}>{ client.name }</Text>
            
            <View style={styles.iconBtn}>
                <Ionicons name="chevron-forward" size={25} color={COLORS.gray} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderWidth: 1,
        height: 50,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 8,
    },
    label: {
        fontSize: 20
    },
    iconBtn: {
        position: 'absolute',
        right: 5
    }
});
