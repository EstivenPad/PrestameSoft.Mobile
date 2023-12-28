import { StyleSheet, Text, View, Switch } from 'react-native';
import { Controller } from 'react-hook-form';

export const SwitchInput = ({
    control,
    name,
    label,
    isLoading,
    blocked
}) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({field: {value, onChange, onBlur}}) => (
                <View>
                    <Text style={{fontSize: 15}}>{label}:</Text>
                    <View style={styles.switch_container}>
                        <Text style={styles.switch_label}>1ra QUINCENA</Text>
                            <Switch 
                                trackColor={{false: '#00a6fb', true: '#e63946'}}
                                thumbColor={value ? '#f4f3f4' : '#f4f3f4'}
                                onValueChange={onChange}
                                value={value}
                                disabled={isLoading || blocked}
                            />
                        <Text style={styles.switch_label}>2da QUINCENA</Text>
                    </View>
                </View>
            )}
        />
    )
};


const styles = StyleSheet.create({
    switch_container: {
        padding: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    switch_label: {
        fontSize: 15,
        fontWeight: 'bold'
    }
});
