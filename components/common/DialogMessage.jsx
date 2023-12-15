import { Portal, Dialog, Text, Button } from "react-native-paper";
import { useUiStore } from "../../hooks/useUiStore";
import { COLORS } from "../../constants";

export const DialogMessage = ({ title, message, handleAccept}) => {

    const { showDialog, switchDialog } = useUiStore();

    return (
        <Portal>
            <Dialog visible={showDialog} onDismiss={switchDialog}>
                <Dialog.Icon icon="account-remove" />
                <Dialog.Title style={{textAlign: "center"}}>{title}</Dialog.Title>
                <Dialog.Content>
                    <Text variant="bodyMedium">{message}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button textColor={COLORS.red} onPress={switchDialog}>Cancelar</Button>
                    <Button  textColor="#c00" onPress={async() => await handleAccept()}>Aceptar</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}
