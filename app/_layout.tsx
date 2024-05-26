import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { Stack } from 'expo-router';
import { store } from '../store/store';

const RootLayout = () => {
    return (
        <Provider store={ store }>
            <PaperProvider>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
                </Stack>
            </PaperProvider>
        </Provider>
    )
}

export default RootLayout;