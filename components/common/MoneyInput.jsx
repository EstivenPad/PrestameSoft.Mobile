import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';
import { COLORS } from '../../constants';
import CurrencyInput from 'react-native-currency-input';

export const MoneyInput = ({
    control,
    name,
    label,
    required = '',
    max = null,
    placeholder,
    isLoading,
    blocked = false
}) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={{
                required: required, 
                max: max 
            }}
            render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
                <View style={styles.container}>
                    <CurrencyInput
                        value={value}
                        onChangeValue={onChange}
                        prefix="DOP$ "
                        delimiter=","
                        separator="."
                        precision={0}
                        minValue={0}
                        renderTextInput={props => 
                            <TextInput
                                label={label}
                                placeholder={placeholder}
                                onBlur={onBlur}
                                mode='outlined'
                                keyboardType='numeric'
                                disabled={isLoading || blocked}
                                activeOutlineColor={COLORS.darkGray}
                                {...props}
                            />
                        }
                    />                    
                    {error && (<Text style={{alignSelf: 'stretch', color: COLORS.danger}}>{error.message}</Text>)}
                </View>
            )}
        />
        
    )
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10
    },
    label: {
        fontSize: 20,
        alignSelf: 'center'
    }
});