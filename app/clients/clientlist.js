import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Stack } from "expo-router";
import { COLORS } from "../../constants";
import ClientCard from "../../components/clients/ClientCard";


export default function ClientList() {
    
const mockData = [{
    id: 1,
    nombre: "Waldy",
    direccion: "Cenovi",
    telefono: "809-290-2222",
    cedula: "213-1234567-1"
},{
    id: 2,
    nombre: "Brailyn",
    direccion: "San francisco",
    telefono: "809-290-1111",
    cedula: "402-1234567-1"
}];

    return (
        <SafeAreaView style={{padding: 15}}>
            <Stack.Screen
                options={{
                    headerTitle: "Clientes",
                    headerTitleAlign: "center"
                }}
            />

            <View>
                <FlatList
                    data={mockData}
                    renderItem={({item}) => (
                        <ClientCard item={item}/>
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    
});
