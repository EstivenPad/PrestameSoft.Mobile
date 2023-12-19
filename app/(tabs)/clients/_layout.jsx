import { Stack } from "expo-router";
import { COLORS } from "../../../constants";

const ClientRoot = () => {
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
}

export default ClientRoot;
