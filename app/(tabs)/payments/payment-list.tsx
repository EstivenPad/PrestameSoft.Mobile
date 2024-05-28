import { Stack, useRouter } from 'expo-router';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { usePaymentStore, useUiStore } from '../../../hooks';
import { COLORS } from '../../../assets/theme';
import { PaymentCard } from '../../../components/payments';
import { useState } from 'react';
import { numericFormatter } from 'react-number-format';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function PaymentList() {
    const router = useRouter();
    const { activeLoanItem, activeListPayments, setActivePayment } = usePaymentStore();
    const { setBlockItemFalse } = useUiStore();
    const [showMoreClient, setShowMoreClient] = useState<boolean>(false);

    const createNewPayment = () => {
        setActivePayment({
            created_at: new Date(),
            capital_deposit: 0,
            interest_deposit: 0,
            fortnight: false
        });
        
        setBlockItemFalse();

        router.push('/(tabs)/payments/payment-detail');
    }
    
    return (
        <SafeAreaView style={{flex: 1, margin: 5}}>
            <Stack.Screen
                options={{
                    headerTitle: 'Cobros'
                }}
            />
            
            <TouchableOpacity onPress={() => setShowMoreClient(!showMoreClient)}>
                <View style={[styles.card, {paddingBottom: 4}]}>
                    <Text style={[styles.label, {alignSelf: 'center', fontWeight: 'bold'}]}>CLIENTE</Text>
                    <Text style={styles.label}>Nombre: {activeLoanItem.clients.name}</Text>
                    {showMoreClient && (
                        <>
                            <Text style={styles.label}>Dirección: {activeLoanItem.clients.address}</Text>
                            <Text style={styles.label}>Teléfono: {activeLoanItem.clients.phone}</Text>
                        </>
                    )}
                    <Ionicons name={showMoreClient ? "chevron-up" : "chevron-down"} style={{alignSelf: 'center'}} size={20} color={COLORS.gray} />
                </View>
            </TouchableOpacity>

            <View style={styles.card}>
                <Text style={[styles.label, {alignSelf: 'center', fontWeight: 'bold'}]}>PRESTAMO</Text>
                <Text style={styles.label}>
                    Capital restante: ${numericFormatter(activeLoanItem.capital_remaining.toString(), {thousandSeparator: true, decimalScale: 0})}
                </Text>
                <Text style={styles.label}>
                    Interes a pagar: ${numericFormatter((activeLoanItem.capital_remaining * 0.1).toString(), {thousandSeparator: true, decimalScale: 0})}
                </Text>
            </View>

            <TouchableOpacity onPress={createNewPayment}>
                <View style={styles.payment_button_wrapper}>
                    <Ionicons name="add" size={28} color={COLORS.pure_white} />
                    <Text style={styles.payment_button_label}>Crear nuevo cobro</Text>
                </View>
            </TouchableOpacity>

            <FlatList
                style={styles.payment_container}
                data={ activeListPayments }
                renderItem={({ item, index }) => (
                    <PaymentCard paymentItem={ item } index={ index + 1 } /> 
                )}
                keyExtractor={ item => item.id }
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    card: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.gray,
        backgroundColor: COLORS.pure_white,
        marginBottom: 10,
    },
    label: {
        fontSize: 18,
    },
    payment_container: {
        borderColor: COLORS.gray,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: COLORS.pure_white,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    payment_button_wrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        padding: 10,
        borderTopLeftRadius: 9,
        borderTopRightRadius: 9,
    },
    payment_button_label: {
        color: COLORS.pure_white,
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 18
    }
});
