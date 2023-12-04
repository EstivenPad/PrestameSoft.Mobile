import { StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import { Stack, useLocalSearchParams } from "expo-router";
import { COLORS, cedulaMask, phoneMask } from "../../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomInput, MaskedInput } from "../../../components/common";

import { useForm } from "react-hook-form";
import { useClientStore, useUiStore } from "../../../hooks";

export default function ClientDetail() {

    const { activeClient, setNewClient } = useClientStore();
    const { isSaving } = useUiStore();

    const { control, handleSubmit } = useForm({
        defaultValues: activeClient
    });

    const onCreateClient = (data) => {
        setNewClient(data);
    };

    return (
        <SafeAreaView style={{ flex: 1, padding: 10 }}>
            <Stack.Screen
                options={{
                    headerTitle: "Clientes",
                    headerTitleAlign: "center",
                    headerStyle: { backgroundColor: COLORS.red },
                    headerTintColor: COLORS.white,
                }}
            ></Stack.Screen>

            <Text style={styles.label}>Crear nuevo cliente</Text>

            <CustomInput
                control={control}
                name="nombre"
                label="Nombre"
                required="El nombre es requerido"
                isSaving={isSaving}
            />
            <CustomInput
                control={control}
                name="direccion"
                label="Direccion"
                required="La direccion es requerido"
                isSaving={isSaving}
            />
            <MaskedInput
                control={control}
                name="cedula"
                label="Cedula"
                required="La cedula es requerido"
                minLenght={{
                    value: 13,
                    message: "La cedula debe tener 11 digitos",
                }}
                placeholder={"000-0000000-0"}
                mask={cedulaMask}
                isSaving={isSaving}
            />
            <MaskedInput
                control={control}
                name="telefono"
                label="Numero Telefonico"
                required="El telefono es requerido"
                minLenght={{
                    value: 11,
                    message: "El numero telefonico debe tener 10 digitos",
                }}
                placeholder={"(000)-000-0000"}
                mask={phoneMask}
                isSaving={isSaving}
            />

            <Button
                icon="account-plus"
                mode="contained"
                onPress={handleSubmit(onCreateClient)}
                buttonColor={COLORS.lightRed}
                loading={isSaving}
                isSaving={isSaving}
            >
                Crear cliente
            </Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 15,
    },
    label: {
        fontSize: 20,
        alignSelf: "center",
    },
});
