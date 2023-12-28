import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';
import { COLORS } from '../../constants';

export const CustomInput = ({
    control,
    name,
    label,
    inputMode = 'text',
    required,
    isLoading,
    blocked
}) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={!!required && { required: required }}
            render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
                <View style={styles.container}>
                    <TextInput
                        label={label}
                        value={value}
                        inputMode={inputMode}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        mode='outlined'
                        activeOutlineColor={COLORS.darkGray}
                        disabled={isLoading || blocked}
                    />
                    {error && (<Text style={{alignSelf: 'stretch', color: COLORS.danger}}>{error.message}</Text>)}
                </View>
            )}
        />
    )
};


const styles = StyleSheet.create({
    container: {
        marginBottom: 15
    }
});
