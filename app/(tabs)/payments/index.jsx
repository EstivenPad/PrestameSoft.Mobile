import { ActivityIndicator, FlatList, SafeAreaView, View } from 'react-native';
import { usePaymentStore, useUiStore } from '../../../hooks';
import { Stack, usePathname } from 'expo-router';
import { useEffect, useState } from 'react';
import { FortnightDialog, PendingLoanCard, RefreshPaymentBtn } from '../../../components/payments';
import { Searchbar } from 'react-native-paper';

export default function PaymentScreen() {
    const pathname = usePathname();
    
    const { isLoading, showFortnightDialog, setShowFortnightDialogTrue, setShowFortnightDialogFalse } = useUiStore();
    const { loansWithPendingPayments, getLoansWithPendingPayments } = usePaymentStore();

    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setShowFortnightDialogTrue();
    }, []);

    //TODO: FINISH THIS PART AFTER IMPLEMENTING AXIOS WITH THE API
    const handleFortnight = async (fortnight) => {
        await getLoansWithPendingPayments(fortnight);
        setFilteredData(loansWithPendingPayments)
        setShowFortnightDialogFalse();
    }

    const searchFunction = (text) => {
        if(text){
            const updatedData = loansWithPendingPayments.filter((item) => { 
                const item_data = item.loan.clients.name ? item.loan.clients.name.toUpperCase() : ''.toUpperCase(); 
                const text_data = text.toUpperCase(); 
                return item_data.indexOf(text_data) > -1; 
            });
            
            setFilteredData(updatedData);
        }else{
            setFilteredData(loansWithPendingPayments);
        }

        setSearch(text);
    };

    return (
        <SafeAreaView style={{ flex: 1, margin: 5 }}>
            <Stack.Screen 
                options={{
                    headerTitle: 'Cobros',
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
                            <View style={{ marginTop: 5, marginBottom: 10 }}>
                                <Searchbar
                                    placeholder="Search"
                                    onChangeText={(text) => searchFunction(text)}
                                    value={search}
                                    theme={{ colors: { elevation: { level3: '#fff' } } }}
                                />
                            </View>

                            <FlatList
                                data={ filteredData }
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