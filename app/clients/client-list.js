import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Stack } from "expo-router";
import { COLORS } from "../../constants";
import ClientCard from "../../components/clients/ClientCard";
import AddClientBtn from "../../components/common/header/AddClientBtn";
import { useClientStore } from "../../hooks/useClientStore";

const mockData = [{
    id: 1,
    nombre: 'Etiven',
    direccion: 'un lugar por ahi',
    cedula: '123-1231231-1'
},{
    id: 2,
    nombre: 'luis',
    direccion: 'un lugar por ahi',
    cedula: '123-1231231-1'
}];

export default function ClientList() {
    
    const { clients } = useClientStore();

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
                <FlatList
                    data={mockData}
                    renderItem={({item}) => (
                        <ClientCard client={item}/>
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    
});
