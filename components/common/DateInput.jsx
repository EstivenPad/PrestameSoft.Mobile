import { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Controller } from "react-hook-form";
import { COLORS } from "../../constants";
import { useLoanStore } from "../../hooks/useLoanStore";

export const DateInput = ({
    control,
    name,
    label,
    required,
    isLoading,
    blocked
}) => {  

    const { setLoanDate } = useLoanStore();
    
    const [date, setDate] = useState(new Date());

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
        setLoanDate(selectedDate);
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };

    const showDatepicker = () => { showMode('date') }; 

    return (
        <Controller
            control={control}
            name={name}
            rules={{ required: required }}
            render={({fieldState: {error} }) => (
                <View style={styles.container}>
                    <Text style={[styles.date_label, {fontWeight: "bold"}]}>{label}:</Text>
                    <Text style={styles.date_label}>{date.toLocaleDateString("es-ES", { weekday: "long" })}</Text>
                    
                    <Button onPress={showDatepicker} title="Cambiar fecha" color={COLORS.primary} disabled={isLoading || blocked}/>
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
    date_label: {
        alignSelf: 'center',
        fontSize: 18,
        marginBottom: 5
    }
});