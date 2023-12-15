import { Stack, useRouter } from "expo-router";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../constants";
import { useClientStore } from "../hooks/useClientStore";

export default function Menu() {
    const router = useRouter();
    const { setClients } = useClientStore();

    const onClickClients = async () => {
        router.push('clients/client-list');
        await setClients();
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Stack.Screen
                options={{
                    headerTitle: "MENU",
                    headerTitleAlign: "center",
                    headerStyle: { backgroundColor: COLORS.red },
                    headerTintColor: COLORS.white,
                }}
            ></Stack.Screen>

                <TouchableOpacity
                    onPress={onClickClients}
                    style={styles.btn_options}
                >
                    <Text style={styles.btn_label}>Clientes</Text>
                </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    btn_options: {
        backgroundColor: COLORS.lightRed,
        height: 50,
        width: "80%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
    },
    btn_label: {
        fontSize: 25,
        color: COLORS.white,
    },
});
