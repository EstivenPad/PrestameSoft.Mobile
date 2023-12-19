import { SafeAreaView, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import { Stack, useRouter } from "expo-router";
import { CustomInput, MaskedInput, DialogMessage } from "../../../components/common";
import { DeleteClientBtn } from "../../../components/clients/DeleteClientBtn";
import { useForm } from "react-hook-form";
import { useClientStore, useUiStore } from "../../../hooks";
import { COLORS, cedulaMask, phoneMask } from "../../../constants";

export default function ClientDetail() {

    const router = useRouter();
    const { activeClient, setNewClient, updateClient, deleteClient } = useClientStore();
    const { isLoading, blockItem, setShowDialogTrue, setShowDialogFalse } = useUiStore();

    const { control, handleSubmit } = useForm({
        defaultValues: activeClient
    });


    const handleSaving = async (data) => {
        if(activeClient?.id)
            await updateClient(data);
        else
            await setNewClient(data);

        router.back();
    };

    const onDeleteClient = async () => {
        setShowDialogTrue();
        await deleteClient(activeClient.id);
        setShowDialogFalse();

        router.back();
    };

    return (
        <SafeAreaView style={{ flex: 1, padding: 10 }}>
            <Stack.Screen
                options={{
                    headerTitle: "Clientes",
                    headerRight: () => ((!!activeClient?.id && blockItem) && <DeleteClientBtn/>)
                }}
            />

            <Text style={styles.label}>Crear nuevo cliente</Text>

            <CustomInput
                control={control}
                name="nombre"
                label="Nombre"
                required="El Nombre es requerido"
                isLoading={isLoading}
                blocked={blockItem}
            />
            <CustomInput
                control={control}
                name="direccion"
                label="Direccion"
                required="La Direccion es requerido"
                isLoading={isLoading}
                blocked={blockItem}
            />
            <MaskedInput
                control={control}
                name="cedula"
                label="Cédula"
                required="La Cédula es requerido"
                minLenght={{
                    value: 13,
                    message: "La Cédula debe tener 11 digitos",
                }}
                placeholder={"000-0000000-0"}
                mask={cedulaMask}
                isLoading={isLoading}
                blocked={blockItem}
            />
            <MaskedInput
                control={control}
                name="telefono"
                label="Teléfono"
                required="El Teléfono es requerido"
                minLenght={{
                    value: 14,
                    message: "El Teléfono debe tener 10 digitos",
                }}
                placeholder={"(000)-000-0000"}
                mask={phoneMask}
                isLoading={isLoading}
                blocked={blockItem}
            />

            <Button
                icon="account-plus"
                mode="contained"
                onPress={handleSubmit(handleSaving)}
                buttonColor={COLORS.primary}
                loading={isLoading}
                disabled={isLoading || blockItem}
            >
                Crear cliente
            </Button>
            {
                !!activeClient?.id && <DialogMessage title="Eliminar" message="¿Esta seguro que desea eliminar este cliente?" handleAccept={onDeleteClient}/>
            }
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
