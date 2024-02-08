import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Icon, Menu } from "react-native-paper";
import { useClientStore, useMenu, useUiStore } from "../../hooks";

export const ClientCard = ({ client }) => {    

    const router = useRouter();
    const { setActiveClient } = useClientStore();
    const { setBlockItemTrue, setBlockItemFalse, setShowDialogFalse } = useUiStore();
    const { showMenu, menuAnchor, closeMenu, onDisplayMenu } = useMenu();
    
    const onShowClient = () => {
        setActiveClient(client);
        
        setBlockItemTrue(); //Disable the inputs and buttons to type in them
        setShowDialogFalse(); //Hide the delete dialog just in case
        closeMenu(); //Close de floating menu

        router.push('/(tabs)/clients/client-detail');
    };

    const onEditClient = () => {
        setActiveClient(client);
        
        setBlockItemFalse(); //Enable the inputs and buttons to type in them
        setShowDialogFalse(); //Hide the delete dialog just in case
        closeMenu(); //Close de floating menu
        
        router.push('/(tabs)/clients/client-detail');
    };

    return (
        <TouchableOpacity onPress={onShowClient} style={styles.container}>
            <Text style={styles.label}>{client.name}</Text>
            <TouchableOpacity onPress={onDisplayMenu} style={styles.iconBtn}>
                <Icon source="dots-vertical" size={25} color="#999" />
            </TouchableOpacity>
            <Menu
                visible={showMenu}
                onDismiss={closeMenu}
                anchor={menuAnchor}
            >
                <Menu.Item onPress={onShowClient} title="Ver" />
                <Menu.Item onPress={onEditClient} title="Editar" />
            </Menu>
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
