import { ClientCard, AddClientBtn } from "../../../components/clients";
import { IClient } from "../../../utils/interfaces/IClient";
import { SafeAreaView, FlatList, View, ActivityIndicator } from "react-native";
import { Searchbar } from 'react-native-paper';
import { Stack } from "expo-router";
import { useClientStore, useUiStore } from "../../../hooks";
import { useState, useEffect } from "react";

export default function ClientScreen() {
    
    const { clients, getClients } = useClientStore();
    const { isLoading } = useUiStore();
    const [search, setSearch] = useState<string>('');
    const [filteredData, setFilteredData] = useState<IClient[]>([]);

    useEffect(() => {
        getClients();
    }, []);

    useEffect(() => {
      setFilteredData(clients);
    }, [clients])
    
    const searchFunction = (text:string) => {
        if(text){
            const updatedData = clients.filter((item:IClient) => { 
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
                        renderItem={({ item }: {item: IClient}) => (
                            <ClientCard client={ item }/>
                        )}
                        keyExtractor={(item: IClient, index: number) => index.toString()}
                        refreshing={isLoading}
                        onRefresh={() => getClients()}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};