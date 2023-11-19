import { Slot, Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { store } from '../store/store';


export default function Layout() {
    return (
        <Provider store={store}>
            <PaperProvider>
                <Stack/>
            </PaperProvider>
        </Provider>
    )
}
