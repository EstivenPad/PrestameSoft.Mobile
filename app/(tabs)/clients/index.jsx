import { useEffect, useState } from "react";
import { SafeAreaView, FlatList, View, ActivityIndicator } from "react-native";
import { Stack } from "expo-router";
import { ClientCard, AddClientBtn } from "../../../components/clients";
import { useClientStore, useUiStore } from "../../../hooks";
import { Searchbar } from 'react-native-paper';

export default function ClientScreen() {
    
    const { clients, getClients } = useClientStore();
    const { isLoading } = useUiStore();
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        getClients();
    }, []);

    useEffect(() => {
      setFilteredData(clients);
    }, [clients])
    
    const searchFunction = (text) => {
        if(text){
            const updatedData = clients.filter((item) => { 
                const item_data = item.name ? item.name.toUpperCase() : ''.toUpperCase(); 
                const text_data = text.toUpperCase(); 
                return item_data.indexOf(text_data) > -1; 
            });
    
            setFilteredData(updatedData);
        }else{
            setFilteredData(clients);
        }

        setSearch(text);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack.Screen
                options={{
                    headerTitle: 'Clientes',
                    headerRight: () => !isLoading && (<AddClientBtn/>)
                }}
            />

            <View style={{ margin: 10, marginBottom: 0 }}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={(text) => searchFunction(text)}
                    value={search}
                    theme={{ colors: { elevation: { level3: '#fff' } } }}
                />
            </View>

            <View style={{ flex: 1, padding: 10 }}>
                { isLoading ? (
                    <ActivityIndicator size="large"/>
                ) : (
                    <FlatList
                        data={ filteredData }
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