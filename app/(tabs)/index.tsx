import { Redirect } from "expo-router";
// import { Text, SafeAreaView } from "react-native";

export default function HomeScreen() {
    return (
        // <SafeAreaView style={{flex: 1, margin: 5, justifyContent: 'center', alignItems: 'center'}}>
        //     <Text style={{fontSize: 30}}>Home Screen</Text>
        // </SafeAreaView>
        <Redirect href='/(tabs)/clients'/>
    )
};
