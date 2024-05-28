import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { useClientStore, useUiStore } from "../../hooks";
import { COLORS } from "../../assets/theme";
import Ionicons from '@expo/vector-icons/Ionicons';
import { IClient } from "../../utils/interfaces/IClient";

interface Props {
    client: IClient
};

export const ClientCard = ({ client }:Props) => {    

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
            <View style={styles.label_wraper}>
                <Ionicons name="person-circle-outline" size={28} color={COLORS.primary} />
                <Text style={styles.label}>{ client.name }</Text>
            </View>
            
            <View style={styles.iconBtn}>
                <Ionicons name="chevron-forward" size={25} color={COLORS.primary} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderColor: COLORS.gray,
        borderWidth: 1,
        height: 55,
        marginBottom: 8,
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        borderRadius: 8,
    },
    label_wraper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    label: {
        fontSize: 20,
        marginLeft: 2
    },
    iconBtn: {
        position: 'absolute',
        right: 5
    }
});
