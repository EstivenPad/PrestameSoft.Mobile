import { SafeAreaView, StyleSheet, FlatList, View, ActivityIndicator } from "react-native";
import { Stack } from "expo-router";
import { COLORS } from "../../constants";
import ClientCard from "../../components/clients/ClientCard";
import AddClientBtn from "../../components/clients/AddClientBtn";
import { useClientStore } from "../../hooks/useClientStore";
import { useUiStore } from "../../hooks/useUiStore";

export default function ClientList() {
    
    const { clients } = useClientStore();
    const { isLoading } = useUiStore();
    
    return (
        <SafeAreaView style={{padding: 15}}>
            <Stack.Screen
                options={{
                    headerTitle: "Clientes",
                    headerTitleAlign: "center",
                    headerStyle: {backgroundColor: COLORS.green},
                    headerTintColor: "#fff",
                    headerRight: () => (
                        <AddClientBtn/>
                    )
                }}
            />

            <View>
                { isLoading ? (
                    <ActivityIndicator size="large"/>
                ) : (
                    <FlatList
                        data={ clients }
                        renderItem={({ item }) => (
                            <ClientCard client={ item }/>
                        )}
                        keyExtractor={ item => item.id }
                    />
                )}
            </View>
        </SafeAreaView>
    );
}

