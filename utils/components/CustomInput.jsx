import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';
import { COLORS } from '../../constants';

export function CustomInput({control, name, label, required}) {
    return (
        <Controller
            control={control}
            name={name}
            rules={{ required: required }}
            render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
                <View style={styles.container}>
                    <TextInput
                        label={label}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        mode='outlined'
                        activeOutlineColor={COLORS.darkGray}
                    />
                    {error && (<Text style={{alignSelf: 'stretch', color: error && COLORS.lightRed}}>{error.message}</Text>)}
                </View>
            )}
        />
    )
}


const styles = StyleSheet.create({
    container: {
        marginBottom: 15
    }
})
