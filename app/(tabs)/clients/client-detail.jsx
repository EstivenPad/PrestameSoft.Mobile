import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Button, Icon } from "react-native-paper";
import { Link, Stack, useRouter } from "expo-router";
import { CustomInput, MaskedInput, DialogMessage } from "../../../components/common";
import { DeleteClientBtn } from "../../../components/clients/DeleteClientBtn";
import { useForm } from "react-hook-form";
import { useClientStore, useUiStore } from "../../../hooks";
import { COLORS, cedulaMask, phoneMask } from "../../../constants";

export default function ClientDetail() {

    const router = useRouter();
    const { activeClient, setNewClient, updateClient, deleteClient } = useClientStore();
    const { isLoading, setShowDialogFalse } = useUiStore();
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
        await deleteClient(activeClient.id);
        setShowDialogFalse();

        router.back();
    };

    return (
        <SafeAreaView style={{ flex: 1, padding: 10 }}>
            <Stack.Screen
                options={{
                    headerTitle: (!!activeClient?.id ? 'Editar cliente' : 'Nuevo cliente'),
                    headerRight: () => (!!activeClient?.id) && <DeleteClientBtn/>
                }}
            />
            
            {
                activeClient?.id 
                    && 
                (<Link href="/(tabs)/clients/loan-list" push asChild>
                    <TouchableOpacity style={styles.btn_container}>
                        <Icon source="piggy-bank-outline" size={30} color={COLORS.white}/>
                        <Text style={styles.btn_label}>
                            Prestamos
                        </Text>
                    </TouchableOpacity>
                </Link>)
            }
            
            <CustomInput
                control={control}
                name="name"
                label="Nombre"
                required="El Nombre es requerido"
                isLoading={isLoading}
            />
            
            <CustomInput
                control={control}
                name="address"
                label="Direccion"
                required="La Direccion es requerida"
                isLoading={isLoading}
            />

            <MaskedInput
                control={control}
                name="identification"
                label="Cédula"
                required="La Cédula es requerida"
                minLenght={{
                    value: 13,
                    message: "La Cédula debe tener 11 digitos",
                }}
                placeholder="000-0000000-0"
                mask={cedulaMask}
                isLoading={isLoading}
            />

            <MaskedInput
                control={control}
                name="phone"
                label="Teléfono"
                required="El Teléfono es requerido"
                minLenght={{
                    value: 14,
                    message: "El Teléfono debe tener 10 digitos",
                }}
                placeholder="(000)-000-0000"
                mask={phoneMask}
                isLoading={isLoading}
            />

            <Button
                icon="account-plus"
                mode="contained"
                onPress={handleSubmit(handleSaving)}
                buttonColor={COLORS.primary}
                loading={isLoading}
                disabled={isLoading}
            >
                Guardar cliente
            </Button>
            {
                !!activeClient?.id 
                    &&
                <DialogMessage title="Eliminar" message="¿Esta seguro que desea eliminar este cliente?" handleAccept={onDeleteClient}/>
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    btn_container: {
        display: 'flex', 
        flexDirection: 'row', 
        alignSelf: 'center', 
        alignItems: 'center',
        backgroundColor: COLORS.primary, 
        borderRadius: 30, 
        padding: 10,
        marginBottom: 15
    },
    btn_label: {
        fontSize: 18, 
        marginLeft: 5, 
        color: COLORS.white,
    },
    profile_icon: {
        width: 90,
        height: 90,
        alignSelf: 'center',
        marginBottom: 5,
        tintColor: COLORS.darkGray
    }
});
