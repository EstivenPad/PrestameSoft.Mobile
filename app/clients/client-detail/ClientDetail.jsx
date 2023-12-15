import { StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import { Stack, useRouter } from "expo-router";
import { COLORS, cedulaMask, phoneMask } from "../../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomInput, MaskedInput } from "../../../components/common";
import { useForm } from "react-hook-form";
import { useClientStore, useUiStore } from "../../../hooks";
import DeleteClientBtn from "../../../components/clients/DeleteClientBtn";
import { DialogMessage } from "../../../components/common/DialogMessage";

export default function ClientDetail() {

    const router = useRouter();
    const { activeClient, setNewClient, updateClient, deleteClient } = useClientStore();
    const { isLoading, blockItem, switchDialog } = useUiStore();

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
        switchDialog();
        await deleteClient(activeClient.id);
        router.back();
    };

    return (
        <SafeAreaView style={{ flex: 1, padding: 10 }}>
            <Stack.Screen
                options={{
                    headerTitle: "Clientes",
                    headerTitleAlign: "center",
                    headerStyle: { backgroundColor: COLORS.red },
                    headerTintColor: COLORS.white,
                    headerRight: () => ( (!!activeClient?.id && blockItem) && <DeleteClientBtn/>)
                }}
            />

            <Text style={styles.label}>Crear nuevo cliente</Text>

            <CustomInput
                control={control}
                name="nombre"
                label="Nombre"
                required="El nombre es requerido"
                isLoading={isLoading}
                blocked={blockItem}
            />
            <CustomInput
                control={control}
                name="direccion"
                label="Direccion"
                required="La direccion es requerido"
                isLoading={isLoading}
                blocked={blockItem}
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
                isLoading={isLoading}
                blocked={blockItem}
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
                isLoading={isLoading}
                blocked={blockItem}
            />

            <Button
                icon="account-plus"
                mode="contained"
                onPress={handleSubmit(handleSaving)}
                buttonColor={COLORS.lightRed}
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
