import { Stack } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { AddLoanBtn, LoanCard } from '../../../components/loans';
import { useClientStore } from '../../../hooks';

export default function LoanList () {

    const { activeClient } = useClientStore();

    return (
        <SafeAreaView style={{ padding: 10 }}>
            <Stack.Screen 
                options={{
                    headerTitle: 'Prestamos',
                    headerRight: () => (
                        <AddLoanBtn/>
                    )
                }}
            />

            <View>
                <Text style={[styles.text, styles.name_label] }>CLIENTE:</Text>
                <Text style={[styles.text, styles.name_display]}>{activeClient.nombre}.</Text>
            </View>
            
            <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <LoanCard/>

                <LoanCard/>
            </View>
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