import { Link } from "expo-router";
import { Text, SafeAreaView} from "react-native";

export default function HomeScreen() {
    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 30}}>Home Page</Text>
            <Link style={{color: '#09e', fontSize: 20, fontStyle:"italic"}} href='/(tabs)/clients/loan-list'>
                Prestamo
            </Link>
        </SafeAreaView>
    )
};
