import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-paper";
import { COLORS } from "../../constants/theme";
import { useRouter } from "expo-router";
import { usePaymentStore } from "../../hooks";
import { numericFormatter } from "react-number-format";

export const PaymentCard = ({ paymentItem, index }) => {

    const router = useRouter()
    const { setActivePayment } = usePaymentStore();

    const onDisplayPayment = () => {
        setActivePayment({
            ...paymentItem,
            created_at: new Date(paymentItem.created_at)
        });

        router.push('/(tabs)/payments/payment-detail');
    };

    return (
        <TouchableOpacity onPress={onDisplayPayment}>
            <View style={styles.card_container}>
                <View style={{marginRight: 5}}>
                        <Text style={[styles.label, styles.name_label]}>{index}. </Text>
                </View>
                
                <View style={styles.payment_info}>
                    <View style={styles.label_wrapper}>
                        <Text style={[styles.label, styles.name_label]}>Fecha: </Text>
                        <Text style={styles.label}>{new Date(paymentItem.created_at).toLocaleString('es-ES', {day: '2-digit', month: '2-digit', year: 'numeric'})}</Text>
                    </View>
                    <View style={styles.label_wrapper}>
                        <Text style={[styles.label, styles.name_label]}>Abono Capital: </Text>
                        <Text style={styles.label}>${numericFormatter(paymentItem.capital_deposit.toString(), {thousandSeparator: true, decimalScale: 0})}</Text>
                    </View>
                    <View style={styles.label_wrapper}>
                        <Text style={[styles.label, styles.name_label]}>Abono Interes: </Text>
                        <Text style={styles.label}>${numericFormatter(paymentItem.interest_deposit.toString(), {thousandSeparator: true, decimalScale: 0})}</Text>
                    </View>
                </View>
                
                <View style={styles.iconBtn}>
                    <Icon source="chevron-right" size={30} color={COLORS.primary} />
                </View>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    card_container: {
        display: 'flex',
        flexDirection: 'row',
        borderColor: COLORS.gray,
        borderBottomWidth: 1,
        padding: 10,
        alignItems: 'center',
    },
    iconBtn: {
        position: 'absolute',
        right: 5
    },
    payment_info: {
        width: '90%'
    },
    label_wrapper: {
        display: 'flex', flexDirection: 'row'
    },
    name_label: {
        fontWeight: 'bold',
    },
    label: {
      fontSize: 18,
    },
})