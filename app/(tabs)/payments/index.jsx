import { ActivityIndicator, FlatList, SafeAreaView, View } from 'react-native';
import { usePaymentStore, useUiStore } from '../../../hooks';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { PendingLoanCard } from '../../../components/payments';

export default function PaymentScreen() {
    
    const { isLoading } = useUiStore();
    const { pendingPayments, getLoansWithPendingPayments } = usePaymentStore();

    useEffect(() => {
        getLoansWithPendingPayments(true);
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, padding: 10 }}>
            <Stack.Screen 
                options={{
                    headerTitle: 'Prestamos Pendientes',
                }}
            />
            
            { isLoading ? (
                <ActivityIndicator size="large"/>
            ) : (
                <View>
                    <FlatList
                        data={ pendingPayments }
                        renderItem={({ item }) => (
                            <PendingLoanCard loanItem={ item }/>
                        )}
                        keyExtractor={ item => item.loan.id }
                        refreshing={isLoading}
                        onRefresh={() => getLoansWithPendingPayments(true)}
                    />
                </View>
            )}
        </SafeAreaView>
    )
};