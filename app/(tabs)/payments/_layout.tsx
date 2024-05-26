import { Stack } from "expo-router";
import { COLORS } from "../../../assets/theme";

const PaymentRoot = () => {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: COLORS.primary,
                },
                headerTintColor: '#fff',
                headerTitleAlign: "center",
            }}
        />
    )
};

export default PaymentRoot;