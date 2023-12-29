import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Stack } from 'expo-router';
import { AddLoanBtn, LoanCard } from '../../../components/loans';
import { useClientStore, useLoanStore, useUiStore } from '../../../hooks';
import { useEffect } from 'react';

export default function LoanList () {

    const { activeClient } = useClientStore();
    const { loans, getLoans } = useLoanStore();
    const { isLoading } = useUiStore();

    useEffect(() => {
        getLoans();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, padding: 10 }}>
            <Stack.Screen 
                options={{
                    headerTitle: 'Prestamos',
                    headerRight: () => (
                        <AddLoanBtn client={activeClient}/>
                    )
                }}
            />

            <View>
                <Text style={[styles.text, styles.name_label]}>CLIENTE:</Text>
                <Text style={[styles.text, styles.name_display]}>{activeClient.nombre}</Text>
            </View>
            
            <FlatList
                data={ loans }
                renderItem={({ item }) => (
                    <LoanCard loan={ item } client={activeClient}/>
                )}
                keyExtractor={ item => item.id }
                refreshing={isLoading}
                onRefresh={() => getLoans()}
            />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        alignSelf: 'center'

    },
    name_label: {
        fontWeight: 'bold',
    },
    name_display: {
        marginBottom: 15,
    },
})