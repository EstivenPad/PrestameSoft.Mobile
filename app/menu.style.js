import { StyleSheet } from 'react-native';
import { COLORS } from '../constants';

const styles = StyleSheet.create({
    menu: {
        backgroundColor: COLORS.lightRed,
        width: '80%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    btn_label: {
        fontSize: 25,
        color: COLORS.white
    }
})

export default styles