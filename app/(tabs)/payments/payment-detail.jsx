import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { usePaymentStore, useUiStore } from '../../../hooks';
import { Stack, useRouter } from 'expo-router';
import { Button } from 'react-native-paper';
import { COLORS } from '../../../constants';
import { DateInput, MoneyInput, SwitchInput } from '../../../components/common';
import { useForm } from 'react-hook-form';

export default function PaymentDetail() {
    const router = useRouter();
    const { activePayment, savePayment, getLoansWithPendingPayments } = usePaymentStore();
    const { isLoading, blockItem } = useUiStore();      
    const { control, handleSubmit, watch, setValue } = useForm({
        defaultValues: activePayment
    });

    const handleSaving = (data) => {
        // savePayment(data);
        console.log(data)
        // router.back();
    }

    const calculateCapitalInterestPending = () => {
        // const capitalDeposit = watch('capital_deposit');
        // const interestDeposit = watch('interest_deposit');

        // setValue('capital_to_pay', capitalDeposit);
        // setValue('interest_to_pay', interestDeposit);
    }

    return (
        <SafeAreaView style={{ flex: 1, padding: 10 }}>
            <Stack.Screen
                options={{
                    headerTitle: (!!activePayment?.id ? 'Editar pago' : 'Nuevo pago')
                }}
            />

            <DateInput
                control={control}
                watch={watch}
                setValue={setValue}
                name="payment_date"
                label="Fecha del pago"
                isLoading={isLoading}
                blocked={blockItem}
            />
            
            <SwitchInput
                control={control}
                name="fortnight"
                label="Pago Correspondiente a"
                isLoading={isLoading}
                blocked={blockItem}
            />

            <MoneyInput
                control={control}
                name="capital_deposit"
                label="Abono Capital"
                placeholder="DOP$ 0"
                isLoading={isLoading}
                blocked={blockItem}
            />

            <MoneyInput
                control={control}
                name="interest_deposit"
                label="Abono Interes"
                placeholder="DOP$ 0"
                isLoading={isLoading}
                blocked={blockItem}
            />

            <Button
                icon="currency-usd"
                mode="contained"
                onPress={handleSubmit(handleSaving)}
                buttonColor={COLORS.primary}
                loading={isLoading}
                disabled={isLoading || blockItem}
                style={{marginTop: 10}}
            >
                Guardar pago
            </Button>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    label_container: {
        marginBottom: 10
    },
    label_title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    label_description: {
        fontSize: 18
    },


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

});