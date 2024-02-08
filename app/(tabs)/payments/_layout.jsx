import { Stack } from "expo-router";
import { COLORS } from "../../../constants";

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