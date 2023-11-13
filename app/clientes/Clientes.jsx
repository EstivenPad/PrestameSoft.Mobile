import { useState } from 'react';
import { Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Stack } from 'expo-router';
import { COLORS } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaskInput from 'react-native-mask-input';

import styles from './cliente.style';

export default function Clientes() {
    
    const [text, setText] = useState("");
    const [phone, setPhone] = useState("");
    

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

            <TextInput
                label="Nombre"
                value={text}
                onChangeText={text => setText(text)}
                mode='outlined'
                activeOutlineColor={COLORS.lightRed}
                style={styles.input}
            />
            <TextInput
                label="Direccion"
                value={text}
                onChangeText={text => setText(text)}
                mode='outlined'
                activeOutlineColor={COLORS.lightRed}
                style={styles.input}
            />
            <TextInput
                label="Cedula"
                value={text}
                onChangeText={text => setText(text)}
                mode='outlined'
                activeOutlineColor={COLORS.lightRed}
                style={styles.input}
            />
            <TextInput
                label="Telefono"
                placeholder='(999)-999-9999'
                value={phone}
                mode='outlined'
                keyboardType='numeric'
                activeOutlineColor={COLORS.lightRed}
                //OnChangeText: (masked, unmasked) => {}
                onChangeText={text => setPhone(text)}
                render={props =>
                    <MaskInput
                        {...props}
                        mask={['(', /\d/, /\d/, /\d/, ')', '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                    />
                }
                style={styles.input}
            />

            <Button
                icon="account-plus"
                mode="contained"
                onPress={() => {}}
                buttonColor={COLORS.lightRed}
            >
                Crear cliente
            </Button>
        </SafeAreaView>
    )
}
