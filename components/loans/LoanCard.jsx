import { useRouter } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useLoanStore, useMenu, useUiStore } from "../../hooks";
import { Icon, Menu } from "react-native-paper";

export const LoanCard = ({ loan, client }) => {
    
    const router = useRouter();
    const { setActiveLoan } = useLoanStore();
    const { setBlockItemTrue, setBlockItemFalse, setShowDialogFalse } = useUiStore();
    const { showMenu, menuAnchor, closeMenu, onDisplayMenu } = useMenu();
    
    const onShowLoan = () => {
        setActiveLoan(loan);  

        setBlockItemTrue(); //Disable the inputs and buttons to type in them
        setShowDialogFalse(); //Hide the delete dialog just in case
        closeMenu(); //Close de floating menu

        router.push('/(tabs)/clients/loan-detail');
    };

    const onEditLoan = () => {
        setActiveLoan(loan);  

        setBlockItemFalse(); //Disable the inputs and buttons to type in them
        setShowDialogFalse(); //Hide the delete dialog just in case
        closeMenu(); //Close de floating menu

        router.push('/(tabs)/clients/loan-detail');
    };
    
    return (
        <TouchableOpacity onPress={onShowLoan} style={styles.container}>
            <View>
                <Text style={styles.label}>DOP ${loan.cantidadPrestada}</Text>
                <Text style={{fontSize: 20, color: '#fff'}}>{loan.fechaPrestamo.toLocaleString('es-ES',{day: 'numeric', month: 'numeric', year: 'numeric'})}</Text>
            </View>
            <TouchableOpacity onPress={onDisplayMenu} style={styles.iconBtn}>
                <Icon source="dots-vertical" size={30} color="#999" />
            </TouchableOpacity>
            
            <Menu
                visible={showMenu}
                onDismiss={closeMenu}
                anchor={menuAnchor}
            >
                <Menu.Item onPress={onShowLoan} title="Ver" />
                <Menu.Item onPress={onEditLoan} title="Editar" />
            </Menu>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '80%',
        alignSelf: 'center',
        height: 100,
        borderRadius: 10,
        elevation: 15,
        backgroundColor: '#2b2d42',
        padding: 10,
        marginBottom: 15,
        justifyContent: 'center'
    },
    label: {
      fontSize: 25,
      color: '#fff',
      fontWeight: "bold",
      marginBottom: 5,
    },
    iconBtn: {
        position: 'absolute',
        right: 10
    }
})