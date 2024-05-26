import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';
import { COLORS } from '../../assets';

export const NumericInput = ({
    control,
    name,
    label,
    required,
    isLoading,
    blocked = false
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
                        inputMode='numeric'
                        onChangeText={(text) => {
                            const numericValue = text.replace(/[^0-9]/g,'');
                            onChange(numericValue);
                        }}
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
