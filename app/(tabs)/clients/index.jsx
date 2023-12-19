import { useEffect } from "react";
import { SafeAreaView, FlatList, View, ActivityIndicator } from "react-native";
import { Stack } from "expo-router";
import { ClientCard, AddClientBtn } from "../../../components/clients";
import { useClientStore, useUiStore } from "../../../hooks";

export default function ClientPage() {
    
    const { clients, getClients } = useClientStore();
    const { isLoading } = useUiStore();
    
    useEffect(() => {
        getClients();
    }, []);

    return (
        <SafeAreaView style={{padding: 10}}>
            <Stack.Screen
                options={{
                    headerTitle: 'Clientes',
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
                        refreshing={isLoading}
                        onRefresh={() => getClients()}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

