import { Stack, useRouter } from 'expo-router';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants';
import styles from './menu.style';

export default function Menu() {

    const router = useRouter();

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center'}}>
            <Stack.Screen options={{
                headerTitle: 'MENU',
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: COLORS.red },
                headerTintColor: COLORS.white
            }}>
            </Stack.Screen>
            
            <TouchableOpacity onPress={() => router.push('/clientes/Clientes')} style={styles.menu}>
                <Text style={styles.btn_label}>Clientes</Text>
            </TouchableOpacity>
            
        </SafeAreaView>
    );
}