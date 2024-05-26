import { Portal, Dialog, Text, Button } from "react-native-paper";
import { useUiStore } from "../../hooks/useUiStore";
import { COLORS } from "../../assets";

export const DialogMessage = ({ title, message, handleAccept }) => {

    const { showDialog, setShowDialogFalse } = useUiStore();

    return (
        <Portal>
            <Dialog visible={ showDialog } onDismiss={ setShowDialogFalse }>
                <Dialog.Icon icon="alert" />
                
                <Dialog.Title style={{textAlign: "center"}}>{title}</Dialog.Title>
                
                <Dialog.Content>
                    <Text variant="bodyMedium">{message}</Text>
                </Dialog.Content>
                
                <Dialog.Actions>
                    <Button textColor={ COLORS.darkGray } onPress={ setShowDialogFalse }>Cancelar</Button>
                    <Button textColor={ COLORS.danger } onPress={ async() => await handleAccept() }>Aceptar</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
};
