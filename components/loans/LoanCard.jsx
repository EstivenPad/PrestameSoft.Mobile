import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export const LoanCard = () => {
    return (
        <TouchableOpacity style={styles.container}>
            <View>
                <Text style={styles.label}>$12,000.00</Text>
                <Text style={{fontSize: 20, color: '#fff'}}>24/12/2023</Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '80%',
        height: 100,
        borderRadius: 10,
        elevation: 15,
        backgroundColor: '#2b2d42',
        padding: 10,
        marginBottom: 15,
    },
    label: {
      fontSize: 25,
      color: '#fff',
      fontWeight: "bold",
      marginBottom: 5,
    }
})