import { StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { Stack } from 'expo-router';
import { COLORS, cedulaMask, phoneMask } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useForm } from 'react-hook-form';
import { CustomInput, MaskedInput } from '../../components/common';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function Client() {
    
    const { 
        control, 
        handleSubmit, 
        formState: { errors }, 
    } = useForm({
        defaultValues: {
            nombre: "",
            direccion: "",
            cedula: "",
            telefono: ""
        }
    });

    const { clients } = useSelector(state => state.client)
    const dispatch = useDispatch()
    
    // useEffect(() => {
    //   console.log(formState)
    // }, [formState])
    

    const onCreateClient = (data) => {
        console.log(data);
        // alert(JSON.stringify(data))
    };


    return (
        <SafeAreaView style={{ flex: 1, padding: 10 }}>
            <Stack.Screen options={{
                headerTitle: 'Clientes',
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: COLORS.red },
                headerTintColor: COLORS.white
            }}>
            </Stack.Screen>

            <Text style={styles.label}>Crear nuevo cliente</Text>
            
            <CustomInput 
                control={control}
                name='nombre'
                label='Nombre'
                required='El nombre es requerido'
            />
            <CustomInput 
                control={control}
                name='direccion'
                label='Direccion'
                required='La direccion es requerido'
            />
            <MaskedInput 
                control={control}
                name='cedula'
                label='Cedula'
                required='La cedula es requerido'
                minLenght={{value: 13, message: 'La cedula debe tener 11 digitos'}}
                placeholder={'000-0000000-0'}
                mask={cedulaMask}
            />
            <MaskedInput
                control={control}
                name='telefono'
                label='Numero Telefonico'
                required='El telefono es requerido'
                minLenght={{value: 11, message: 'El numero telefonico debe tener 10 digitos'}}
                placeholder={'(000)-000-0000'}
                mask={phoneMask}
            />
            
            <Button
                icon="account-plus"
                mode="contained"
                onPress={handleSubmit(onCreateClient)}
                buttonColor={COLORS.lightRed}
            >
                Crear cliente
            </Button>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 15
    },
    label: {
        fontSize: 20,
        alignSelf: 'center'
    }
})
