import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { COLORS } from '../../constants'
import { Controller } from 'react-hook-form';
import MaskInput from 'react-native-mask-input';

export function MaskedInput({control, name, label, required, minLenght, placeholder, mask}) {
    return (
        <Controller
            control={control}
            name={name}
            rules={{ required: required, minLength: minLenght }}
            render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
                <View style={styles.container}>
                    <TextInput
                        label={label}
                        placeholder={placeholder}
                        value={value}
                        onBlur={onBlur}
                        mode='outlined'
                        keyboardType='numeric'
                        activeOutlineColor={COLORS.darkGray}
                        //OnChangeText: (masked, unmasked) => {}
                        onChangeText={onChange}
                        render={props =>
                            <MaskInput
                                {...props}
                                mask={mask}
                            />
                        }
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
    },
    label: {
        fontSize: 20,
        alignSelf: 'center'
    }
})
