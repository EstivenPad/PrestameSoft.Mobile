import { Stack, useRouter } from 'expo-router';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { usePaymentStore } from '../../../hooks';
import { COLORS } from '../../../constants/theme';
import { PaymentCard } from '../../../components/payments';
import { Icon } from 'react-native-paper';

export default function PaymentList() {

    const router = useRouter();
    const { activeLoanWithPendingPayments, setActivePayment } = usePaymentStore();

    const createNewPayment = () => {
        setActivePayment({
            payment_date: new Date(),
            capital_deposit: 0,
            interest_deposit: 0,
            capital_to_pay: 0,
            interest_to_pay: 0,
            fortnight: false
        });
        
        router.push('/(tabs)/payments/payment-detail');
    }

    return (
        <SafeAreaView style={{flex: 1, padding: 10}}>
            <Stack.Screen
                options={{
                    headerTitle: 'Pagos'
                }}
            />
            
            <View style={styles.card_information}>
                <Text style={[styles.label_client_information, {alignSelf: 'center', fontWeight: 'bold'}]}>DATOS DEL CLIENTE:</Text>
                <Text style={styles.label_client_information}>Nombre: {activeLoanWithPendingPayments.loan.clients.name}</Text>
                <Text style={styles.label_client_information}>Direccion: {activeLoanWithPendingPayments.loan.clients.address}</Text>
                <Text style={styles.label_client_information}>Telefono: {activeLoanWithPendingPayments.loan.clients.phone}</Text>
            </View>

            <View style={styles.card_information}>
                <Text style={[styles.label_client_information, {alignSelf: 'center', fontWeight: 'bold'}]}>DATOS DEL PRESTAMO:</Text>
                <Text style={styles.label_client_information}>Monto Prestado: DOP$ {activeLoanWithPendingPayments.loan.amount}</Text>
                <Text style={styles.label_client_information}>Capital restante a pagar: DOP$ {activeLoanWithPendingPayments.loan.capital_remaining}</Text>
            </View>

            <TouchableOpacity onPress={createNewPayment}>
                <View style={styles.payment_button_wrapper}>
                    <Icon source="plus" size={30} color={COLORS.white} />
                    <Text style={styles.payment_button_label}>Nuevo Pago</Text>
                </View>
            </TouchableOpacity>

            <FlatList
                style={styles.payment_container}
                data={ activeLoanWithPendingPayments.payments }
                renderItem={({ item, index }) => (
                    <PaymentCard paymentItem={ item } index={ index + 1 } />
                )}
                keyExtractor={ item => item.id }
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    card_information: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.gray,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    label_client_information: {
        fontSize: 18,
    },
    payment_container: {
        borderColor: COLORS.gray,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: '#fff',
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
        color: COLORS.white,
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 18
    }
});
