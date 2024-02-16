import { ActivityIndicator, FlatList, SafeAreaView, View } from 'react-native';
import { usePaymentStore, useUiStore } from '../../../hooks';
import { Stack, usePathname } from 'expo-router';
import { useEffect } from 'react';
import { FortnightDialog, PendingLoanCard, RefreshPaymentBtn } from '../../../components/payments';

export default function PaymentScreen() {
    const { isLoading, showFortnightDialog, setShowFortnightDialogTrue, setShowFortnightDialogFalse } = useUiStore();
    const { loansWithPendingPayments, getLoansWithPendingPayments } = usePaymentStore();
    const pathname = usePathname();
    
    useEffect(() => {
        setShowFortnightDialogTrue();
    }, []);

    const handleFortnight = async (fortnight) => {
        await getLoansWithPendingPayments(fortnight);

        setShowFortnightDialogFalse();
    }

    return (
        <SafeAreaView style={{ flex: 1, padding: 10 }}>
            <Stack.Screen 
                options={{
                    headerTitle: 'Prestamos por cobrar',
                    headerRight: () => (<RefreshPaymentBtn/>)
                }}
            />
            
            { isLoading ? (
                <ActivityIndicator size="large"/>
            ) : (
                <>
                    {
                        (showFortnightDialog) && (pathname === '/payments')
                            ?
                        (<FortnightDialog handleOption={ handleFortnight }/>)
                            :
                        (<View>
                            <FlatList
                                data={ loansWithPendingPayments }
                                renderItem={({ item }) => (
                                    <PendingLoanCard loanItem={ item }/>
                                )}
                                keyExtractor={ item => item.loan.id }
                                refreshing={ isLoading }
                                onRefresh={() => setShowFortnightDialogTrue()}
                            />
                        </View>)
                    }
                </>
            )}
        </SafeAreaView>
    )
};