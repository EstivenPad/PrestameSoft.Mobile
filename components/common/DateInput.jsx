import { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Controller } from "react-hook-form";
import { COLORS } from "../../constants";

export const DateInput = ({
    control,
    watch,
    setValue,
    name,
    label,
    required,
    isLoading,
    blocked = false
}) => {  
    const selectedDate = watch(name);
    const [showDatePicker, setShowDatePicker] = useState(false);

    return (
        <Controller
            control={control}
            name={name}
            rules={{ required: required }}
            render={({field: {value, onChange, onBlur}}) => (
                <View style={styles.container}>
                    <Text style={[styles.date_label, {fontWeight: "bold"}]}>{label}:</Text>
                    <Text style={styles.date_label}>{selectedDate.toLocaleString("es-ES",{weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric'})}</Text>
                    
                    <Button onPress={() => setShowDatePicker(true)} title="Cambiar fecha" color={COLORS.primary} disabled={isLoading || blocked}/>

                    {showDatePicker && (
                        <DateTimePicker testID="dateTimePicker"
                            value={value ? new Date(value) : new Date()}
                            mode="date"
                            is24Hour={false}
                            onChange={(event, selectedDate) => {
                                setShowDatePicker(Platform.OS === 'ios');
                                if(selectedDate){
                                    onChange(selectedDate);
                                    setValue(name, selectedDate);
                                }
                            }}
                        />
                    )}
                </View>
            )}
        />
    )
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10
    },
    date_label: {
        alignSelf: 'center',
        fontSize: 18,
        marginBottom: 5
    }
});