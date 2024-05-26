import { IClient } from "../utils/interfaces/IClient";
import { 
    onAddNewClient,
    onDeleteClientById,
    onSetActiveClient,
    onSetClients,
    onSetLoadingFalse,
    onSetLoadingTrue,
    onSetShowDialogFalse,
    onUpdateClientById
} from "../store";
import { supabase } from "../server/supabaseClient";
import { useAppDispatch, useAppSelector } from "./hook";

export const useClientStore = () => {
    const dispatch = useAppDispatch();

    const { clients, activeClient } = useAppSelector(state => state.client);

    const getClients = async () => {
        dispatch(onSetLoadingTrue());
        
        const clients:IClient[] = [];
        const { data, error } = await supabase.from('clients').select('*').order('name', { ascending: true })
        
        if(error){
            console.log(error);
            dispatch(onSetLoadingFalse());
            return;
        };

        data?.map(({ id, name, identification, address, phone }) => {
            clients.push({
                id,
                name,
                identification,
                address,
                phone
            });
        });

        dispatch(onSetClients(clients));          
        dispatch(onSetLoadingFalse());
    };

    const setActiveClient = (client:IClient) => {
        dispatch(onSetActiveClient(client));
    };

    const setNewClient = async (client:IClient) => {
        dispatch(onSetLoadingTrue());

        const { data:Client, error } = await supabase.from('clients').insert(client).select();

        if(error){
            console.log(error);
            dispatch(onSetLoadingFalse());
            return;
        };

        if(!Client || Client.length == 0){
            dispatch(onSetLoadingFalse());
            return;
        };

        dispatch(onAddNewClient({ ...Client[0] }));
        dispatch(onSetLoadingFalse());
    };

    const updateClient = async (client:IClient) => {
        dispatch(onSetLoadingTrue());
        
        const clientToDB = { ...client };
        
        delete clientToDB.id;

        const { data:Client, error } = await supabase.from('clients').update(client).eq('id', activeClient?.id).select();
        
        if(error){
            console.log(error);
            dispatch(onSetLoadingFalse());
            return;
        };

        if(!Client || Client.length == 0){
            dispatch(onSetLoadingFalse());
            return;
        };

        dispatch(onUpdateClientById({ ...Client[0] }));
        dispatch(onSetLoadingFalse());
    };

    const deleteClient = async (clientId:number | undefined) => {
        dispatch(onSetLoadingTrue());
        
        const { error } = await supabase.from('clients').delete().eq('id', clientId);
        
        if(error){
            console.log(error);
            dispatch(onSetLoadingFalse());
            return;
        };

        if(!clientId){
            dispatch(onSetLoadingFalse());
            return;
        };

        dispatch(onDeleteClientById(clientId));
        dispatch(onSetShowDialogFalse());
        dispatch(onSetLoadingFalse());
    };

    return {
        //Properties
        clients,
        activeClient,

        //Methods
        getClients,
        setNewClient,
        setActiveClient,
        updateClient,
        deleteClient,
    };
}