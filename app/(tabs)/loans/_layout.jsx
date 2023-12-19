import { Stack } from "expo-router";
import { COLORS } from "../../../constants";

const LoanRoot = () => {
    return (
        <Stack screenOptions={{
            headerStyle: {
                backgroundColor: COLORS.primary,
            },
            headerTintColor: '#fff',
            headerTitleAlign: "center",
        }}>
            <Stack.Screen name="loan-list"/>
            <Stack.Screen name="loan-detail"/>
        </Stack>
    )
}

export default LoanRoot;
