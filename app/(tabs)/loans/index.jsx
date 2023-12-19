import { Stack } from 'expo-router';
import { SafeAreaView, Text } from 'react-native'

const LoanList = () => {
    return (
        <SafeAreaView>
            <Stack.Screen 
                options={{
                    headerTitle: 'Prestamos'
                }}
            />
            <Text>Loan List</Text>
        </SafeAreaView>
    )
}

export default LoanList;