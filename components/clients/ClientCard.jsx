import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { Icon, Menu } from "react-native-paper";
import { useUiStore } from "../../hooks/useUiStore";
import { useClientStore } from "../../hooks";

export default function ClientCard({ client }) {    

    const router = useRouter();

    const { setBlockItemTrue, setBlockItemFalse } = useUiStore();
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

    const onDisplayClient = () => {
        setActiveClient(client);
        setBlockItemTrue();
        closeMenu();
        router.push('clients/client-detail/ClientDetail');
    }

    const onEditClient = () => {
        setActiveClient(client);
        setBlockItemFalse();
        closeMenu();
        router.push('clients/client-detail/ClientDetail');
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
                <Menu.Item onPress={onDisplayClient} title="Ver" />
                <Menu.Item onPress={onEditClient} title="Editar" />
            </Menu>
        </View>
    );
}

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
