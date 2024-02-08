import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-paper";
import { COLORS } from "../../constants/theme";
import { useRouter } from "expo-router";
import { usePaymentStore, useUiStore } from "../../hooks";

export const PendingLoanCard = ({ loanItem }) => {
    
    const router = useRouter();
    const { setActiveLoanWithPendingPayments } = usePaymentStore();
    const { setBlockItemFalse } = useUiStore();
    
    const onDisplayPayment = () => {
        setActiveLoanWithPendingPayments(loanItem);
        setBlockItemFalse();
        
        router.push('/(tabs)/payments/payment-list');
    }

    return (
        <TouchableOpacity onPress={onDisplayPayment}>
            <View style={styles.container}>
                <View style={styles.client_info}>
                    <Text style={[styles.label, styles.name_label]}>{loanItem.loan.clients.name}</Text>
                    <Text style={styles.label}>{loanItem.loan.clients.address}</Text>
                    <Text style={[styles.label, styles.money_label]}>DOP$ {loanItem.loan.amount}</Text>
                </View>
                <View style={styles.iconBtn}>
                    <Icon source="chevron-right" size={30} color={COLORS.primary} />
                </View>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        backgroundColor: COLORS.darkGray,
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        alignItems: 'center',
    },
    iconBtn: {
        position: 'absolute',
        right: 10
    },
    client_info: {
        width: '90%'
    },
    name_label: {
        color: '#fff',
        fontWeight: "bold",
        marginBottom: 5,
    },
    money_label: {
        color: COLORS.primary
    },
    label: {
      fontSize: 20,
      color: '#fff',
      marginBottom: 5,
    },
})