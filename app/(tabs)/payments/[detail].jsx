import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { usePaymentStore, useUiStore } from '../../../hooks';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from 'react-native-paper';
import { COLORS } from '../../../constants';
import { DateInput, DialogMessage, MoneyInput, SwitchInput } from '../../../components/common';
import { useForm } from 'react-hook-form';
import { numericFormatter } from 'react-number-format';
import { DeletePaymentBtn } from '../../../components/payments';

export default function PaymentDetail() {

    const router = useRouter();
    const { activePayment, activeListPayments, activeLoanItem, savePayment, updatePayment, deletePayment } = usePaymentStore();
    const { isLoading, blockItem, setShowDialogFalse } = useUiStore();      
    const { control, handleSubmit, watch, setValue } = useForm({
        defaultValues: activePayment
    });
    const { detail } = useLocalSearchParams()

    const handleSaving = async (data) => {
        if(activePayment?.id)
            await updatePayment(data);
        else
            await savePayment(data);

        router.back();
    };

    const onDeletePayment = async () => {
        await deletePayment(activePayment);
        setShowDialogFalse();

        router.back();
    };

    return (
        <SafeAreaView style={{ flex: 1, margin: 10 }}>
            <Stack.Screen
                options={{
                    headerTitle: (!!activePayment?.id ? `Cobro #${detail}` : `Nuevo cobro`),
                    headerRight: () => ((!!activePayment?.id && activeListPayments.length == detail) && <DeletePaymentBtn/>)
                }}
            />

            <DateInput
                control={control}
                watch={watch}
                setValue={setValue}
                name="created_at"
                label="Fecha del cobro"
                isLoading={isLoading}
                blocked={blockItem}
            />
            
            <SwitchInput
                control={control}
                name="fortnight"
                label="Quincena"
                isLoading={isLoading}
                blocked={blockItem}
            />

            <View style={styles.label_container}>
                <Text style={[styles.label, {fontWeight: 'bold'}]}>
                    Capital restante: 
                </Text>
                <Text style={styles.label}> DOP$
                    {
                        numericFormatter(activeLoanItem.capital_remaining.toString(), {
                            thousandSeparator: true,
                            decimalScale: 0
                        })
                    }
                </Text>
            </View>

            <View style={styles.label_container}>
                <Text style={[styles.label, {fontWeight: 'bold'}]}>
                    Interes a pagar: 
                </Text>
                <Text style={styles.label}> DOP$
                    {
                        numericFormatter((activeLoanItem.capital_remaining * 0.1).toString(), {
                            thousandSeparator: true,
                            decimalScale: 0
                        })
                    }
                </Text>
            </View>

            {
                !!activePayment?.id
                    &&
                <DialogMessage title="Eliminar" message="¿Esta seguro que desea eliminar este cobro?" handleAccept={onDeletePayment}/>
            }

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
                max={5}
                placeholder="DOP$ 0"
                isLoading={isLoading}
                blocked={blockItem}
            />

            <View>
                <Button
                    icon="currency-usd"
                    mode="contained"
                    onPress={handleSubmit(handleSaving)}
                    buttonColor={COLORS.primary}
                    loading={isLoading}
                    disabled={isLoading || blockItem}
                    style={{marginTop: 10, flexGrow: 1}}
                >
                    Guardar
                </Button>

                <Button
                    icon="printer"
                    mode="contained"
                    onPress={() => {}}
                    buttonColor={COLORS.warning}
                    loading={isLoading}
                    disabled={isLoading || blockItem}
                    style={{marginTop: 10, flexGrow: 1}}
                >
                    Imprimir
                </Button>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    label: {
        fontSize: 18
    },
    label_container: {
        flexDirection: 'row',
        marginBottom: 10
    }
});