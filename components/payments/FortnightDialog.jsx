import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useUiStore } from "../../hooks/useUiStore";
import { Modal, Portal } from "react-native-paper";
import { COLORS } from "../../constants";

export const FortnightDialog = ({handleOption}) => {

    const { showFortnightDialog, setShowFortnightDialogFalse } = useUiStore();

    return (
        <>
            <Portal>
                <Modal visible={ showFortnightDialog } onDismiss={ setShowFortnightDialogFalse } contentContainerStyle={styles.modal}>
                    <Text style={styles.title}>Seleccione la QUINCENA correspondiente:</Text>

                    <View style={styles.button_container}>
                        <TouchableOpacity onPress={async() => await handleOption(false)}>
                            <View style={styles.button_wrapper}>
                                <Text style={styles.label_button}>1ra QUINCENA</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={async() => await handleOption(true)}>
                            <View style={styles.button_wrapper}>
                                <Text style={styles.label_button}>2da QUINCENA</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </Portal>
        </>
    )
};

const styles = StyleSheet.create({
    modal: { 
        backgroundColor:'white',
        borderRadius: 5,
        padding:20,
        marginHorizontal:10
    },
    title: {
        textAlign: 'center',
        marginBottom: 15,
    },
    button_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    button_wrapper: {
        padding: 10,
        backgroundColor: COLORS.primary,
        borderRadius: 20,
    },
    label_button: {
        color: COLORS.pure_white
    }
});
