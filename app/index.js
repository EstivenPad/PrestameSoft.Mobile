import { Stack } from 'expo-router';
import { SafeAreaView, View, Text } from 'react-native';
import { COLORS, icons } from '../constants';
import ProfileCard from '../components/home/ProfileCard';

export default function Main() {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center'}}>
            <Stack.Screen options={{
                headerTitle: 'PRESTAMOS',
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: COLORS.red },
                headerTintColor: COLORS.white
            }}>
            </Stack.Screen>
            <View style={{flex: 1, paddingVertical: 20}}>
                <Text style={{fontSize: 20}}>Seleccione su usuario:</Text>
                <ProfileCard iconUrl={icons.avatar} name={'Braylin'}/>
                <ProfileCard iconUrl={icons.avatar2} name={'Waldy'}/>
            </View>
        </SafeAreaView>
    );
}
