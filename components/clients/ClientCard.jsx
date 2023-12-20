import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { Icon, Menu } from "react-native-paper";
import { useClientStore, useUiStore } from "../../hooks";

export const ClientCard = ({ client }) => {    

    const router = useRouter();

    const { setBlockItemTrue, setBlockItemFalse, setShowDialogFalse } = useUiStore();
    const { setActiveClient } = useClientStore();

    const [showMenu, setShowMenu] = useState(false);
    const [menuAnchor, setMenuAnchor] = useState({ x:0, y:0 });
    const openMenu = () => setShowMenu(true);
    const closeMenu = () => setShowMenu(false);
    
    const onDisplayMenu = ({ nativeEvent }) => {
        const anchor = {
            x: nativeEvent.pageX,
            y: nativeEvent.pageY,
        }
        setMenuAnchor(anchor);
        openMenu();
    }

    const onShowClient = () => {
        setActiveClient(client);
        
        setBlockItemTrue(); //Active the inputs and buttons to type in them
        setShowDialogFalse(); //Hide the delete dialog just in case
        closeMenu(); //Close de floating menu

        router.push('/(tabs)/clients/client-detail');
    }

    const onEditClient = () => {
        setActiveClient(client);
        
        setBlockItemFalse(); //Disable the inputs and buttons to type in them
        setShowDialogFalse(); //Hide the delete dialog just in case
        closeMenu(); //Close de floating menu
        
        router.push('/(tabs)/clients/client-detail');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{client.nombre}</Text>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        height: 50,
        borderColor: "#555",
        borderWidth: 1,
        marginBottom: 10,
        display: "flex",
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 8,
    },
    label: {
        fontSize: 20,
    },
    iconBtn: {
        position: "absolute",
        right: 5
    }
});
