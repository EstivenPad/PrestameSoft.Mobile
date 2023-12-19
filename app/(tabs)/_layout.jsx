import { Tabs } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from "../../constants";

const TabLayout = () => {
  return (
    <Tabs screenOptions={{ 
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarHideOnKeyboard: true
    }}>
        <Tabs.Screen 
            name="index"
            options={{
                tabBarLabel: 'Inicio',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="rocket-sharp" color={color} size={size} />
                ),
            }}
        />
        <Tabs.Screen 
            name="clients"
            options={{
                tabBarLabel: 'Clientes',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="people" color={color} size={size} />
                ),
            }}
        />
        <Tabs.Screen 
            name="loans"
            options={{
                tabBarLabel: 'Prestamos',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="wallet" color={color} size={size} />
                ),
            }}
        />
    </Tabs>
  )
}

export default TabLayout;
