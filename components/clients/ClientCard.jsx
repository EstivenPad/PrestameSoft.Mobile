import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-paper";

export default function ClientCard({ item }) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{item.nombre}</Text>
            <Icon source="arrow-right" size={25} color="#999" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
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
});
