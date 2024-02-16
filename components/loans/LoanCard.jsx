import { useRouter } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useLoanStore, useUiStore } from "../../hooks";
import { Icon } from "react-native-paper";
import { COLORS } from "../../constants";
import { numericFormatter } from 'react-number-format';

export const LoanCard = ({ loan }) => {
    
    const router = useRouter();
    const { setActiveLoan } = useLoanStore();
    const { setShowDialogFalse } = useUiStore();
    
    const onShowLoan = () => {
        setActiveLoan(loan);
        setShowDialogFalse(); //Hide the delete dialog just in case

        router.push('/(tabs)/clients/loan-detail');
    };
    
    return (
        <TouchableOpacity onPress={onShowLoan} style={styles.container}>
            <View>
                <Text style={styles.label}>DOP ${
                    numericFormatter (loan.amount.toString(), {
                        thousandSeparator: true,
                        decimalScale: 0
                    })}
                </Text>
                
                <Text style={{fontSize: 20, color: '#fff'}}>{loan.created_at.toLocaleString('es-ES', {weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric'})}</Text>
            </View>
            <View style={styles.iconBtn}>
                <Icon source="chevron-right" size={30} color={COLORS.primary} />
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '80%',
        alignSelf: 'center',
        height: 100,
        borderRadius: 10,
        elevation: 15,
        backgroundColor: '#2b2d42',
        padding: 10,
        marginBottom: 15,
        justifyContent: 'center'
    },
    label: {
      fontSize: 25,
      color: '#fff',
      fontWeight: "bold",
      marginBottom: 5,
    },
    iconBtn: {
        position: 'absolute',
        right: 10
    }
})