import { Stack, useRouter } from "expo-router";
import { SafeAreaView, View } from "react-native";
import { useForm } from "react-hook-form";
import { useLoanStore, useUiStore } from "../../../../hooks";
import { DateInput, DialogMessage, MoneyInput } from "../../../../components/common";
import { COLORS } from "../../../../constants";
import { Button } from "react-native-paper";
import { DeleteLoanBtn } from "../../../../components/loans";

export default function LoanDetail() {
    
    const router = useRouter();
    const { isLoading, setShowDialogTrue, setShowDialogFalse } = useUiStore();
    const { activeLoan, createNewLoan, updateLoan, deleteLoan } = useLoanStore();        
    const { control, handleSubmit, setValue, watch } = useForm({
        defaultValues: activeLoan
    });

    const handleSaving = async (data) => {
        if(activeLoan?.id)
            await updateLoan(data);
        else
            await createNewLoan(data);

        router.back();
    };

    const onDeleteLoan = async () => {
        setShowDialogTrue();
        await deleteLoan(activeLoan.id);
        setShowDialogFalse();

        router.back();
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <Stack.Screen
                options={{
                    headerTitle: (!!activeLoan?.id ? 'Editar prestamo' : 'Nuevo prestamo'),
                    headerRight: () => (!!activeLoan?.id) && <DeleteLoanBtn/>
                }}
            />

            <View style={{flex: 1, padding: 10}}>
                {
                    !!activeLoan?.id
                        &&
                    <DateInput
                        control={control}
                        watch={watch}
                        setValue={setValue}
                        name="created_at"
                        label="Fecha del prestamo"
                        isLoading={isLoading}
                    />
                }

                <MoneyInput
                    control={control}
                    name="amount"
                    label="Monto Prestado"
                    required="El Monto del prestamo es requerido"
                    placeholder="DOP$ 0"
                    isLoading={isLoading}
                />

                {
                    !!activeLoan?.id
                        &&
                    <MoneyInput
                        control={control}
                        name="capital_remaining"
                        label="Capital restante"
                        required="..."
                        placeholder="DOP$ 0"
                        isLoading={isLoading}
                        blocked={true}
                    />
                }
                
                <Button
                    icon="wallet-plus"
                    mode="contained"
                    onPress={handleSubmit(handleSaving)}
                    buttonColor={COLORS.primary}
                    loading={isLoading}
                    disabled={isLoading}
                >
                    Guardar Prestamo
                </Button>
                {
                    !!activeLoan?.id 
                        && 
                    <DialogMessage title="Eliminar" message="¿Esta seguro que desea eliminar este prestamo?" handleAccept={onDeleteLoan}/>
                }
            </View>
        </SafeAreaView>
    )
};
