import { Button } from "react-native-paper";
import { cedulaMask, phoneMask } from "../../../utils/contants";
import { COLORS } from '../../../assets'
import { CustomInput, MaskedInput, DialogMessage } from "../../../components/common";
import { DeleteClientBtn } from "../../../components/clients/DeleteClientBtn";
import { IClient } from "../../../utils/interfaces/IClient";
import { Link, Stack, useRouter } from "expo-router";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useClientStore, useUiStore } from "../../../hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ClientDetail() {

    const router = useRouter();
    const { activeClient, setNewClient, updateClient, deleteClient } = useClientStore();
    const { isLoading, setShowDialogFalse } = useUiStore();
    const { 
        control,
        handleSubmit
    } = useForm<IClient>({
        defaultValues: { ...activeClient }
    });

    const handleSaving:SubmitHandler<IClient> = async (data) => {
        if(activeClient?.id)
            await updateClient(data);
        else
            await setNewClient(data);

        router.back();
    };

    const onDeleteClient = async () => {
        await deleteClient(activeClient?.id);
        setShowDialogFalse();
        router.back();
    };

    return (
        <SafeAreaView style={{ flex: 1, margin: 10 }}>
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
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                            <Ionicons name="wallet" size={28} color={COLORS.primary}/>
                            <Text style={styles.btn_label}>
                                Prestamos
                            </Text>
                        </View>
                        <Ionicons name="arrow-forward" size={28} color={COLORS.primary}/>
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
                required="La Dirección es requerida"
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.darkGray, 
        borderRadius: 10, 
        padding: 20,
        marginBottom: 15,
    },
    btn_label: {
        fontSize: 18,
        fontWeight: 'bold',
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
