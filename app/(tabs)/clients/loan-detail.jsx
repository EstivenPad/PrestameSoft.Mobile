import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native";
import { useForm } from "react-hook-form";
import { useLoanStore, useUiStore } from "../../../hooks";
import { CustomInput, DateInput, MoneyInput, SwitchInput } from "../../../components/common";
import { COLORS } from "../../../constants";
import { Button } from "react-native-paper";

export default function LoanDetail() {
    
    const router = useRouter();
    const { isLoading, blockItem } = useUiStore();
    const { activeLoan, setNewLoan, updateLoan } = useLoanStore();        
    const { control, handleSubmit, setValue, watch } = useForm({
        defaultValues: activeLoan
    });

    const handleSaving = async (data) => {
        if(activeLoan?.id)
            await updateLoan(data);
        else
            await setNewLoan(data);

        router.back();
    }

    return (
        <SafeAreaView style={{ flex: 1, padding: 10 }}>
            <Stack.Screen
                options={{
                    headerTitle: 'Crear nuevo prestamo'
                }}
            />

            <DateInput
                control={control}
                watch={watch}
                setValue={setValue}
                name="fechaPrestamo"
                label="Fecha del prestamo"
                isLoading={isLoading}
                blocked={blockItem}
            />

            <MoneyInput
                control={control}
                name="cantidadPrestada"
                label="Cantidad Prestada"
                required="La Cantidad Prestada es requerida"
                placeholder="DOP$ 0"
                isLoading={isLoading}
                blocked={blockItem}
            />

            <CustomInput
                control={control}
                name="descripcionGarantia"
                label="Descripción de Garantia"
                isLoading={isLoading}
                blocked={blockItem}
            />

            <CustomInput
                control={control}
                name="cantidadQuincenas"
                label="Cantidad de Quincenas"
                inputMode="numeric"
                required="La Cantidad de Quincenas es requerida"
                isLoading={isLoading}
                blocked={blockItem}
            />

            <SwitchInput
                control={control}
                name="quincenaInicio"
                label="Quincena de Inicio de Pago"
                isLoading={isLoading}
                blocked={blockItem}
            />
            
            <Button
                icon="wallet-plus"
                mode="contained"
                onPress={handleSubmit(handleSaving)}
                buttonColor={COLORS.primary}
                loading={isLoading}
                disabled={isLoading || blockItem}
            >
                Crear Prestamo
            </Button>
        </SafeAreaView>
    )
};
