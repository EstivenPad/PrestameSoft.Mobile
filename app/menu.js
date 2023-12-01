import { Stack, Link, useRouter } from "expo-router";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../constants";

export default function Menu() {
    const navigation = useRouter();

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

            {/* <Link href="clients/clientlist" asChild>     */}
                <TouchableOpacity
                    onPress={() => navigation.push("clients/clientlist")}
                    style={styles.menu}
                >
                    <Text style={styles.btn_label}>Clientes</Text>
                </TouchableOpacity>
            {/* </Link>     */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    menu: {
        backgroundColor: COLORS.lightRed,
        width: "80%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
    },
    btn_label: {
        fontSize: 25,
        color: COLORS.white,
    },
});
