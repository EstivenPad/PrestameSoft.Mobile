import { useDispatch, useSelector } from "react-redux";
import { supabase } from "../server/supabaseClient";
import { 
    onAddNewClient,
    onGetClients,
    onSetActiveClient,
    onSetLoadingFalse,
    onSetLoadingTrue,
    onDeleteClientById,
    onSetShowDialogFalse,
    onUpdateClientById
} from "../store";

export const useClientStore = () => {
    const dispatch = useDispatch();

    const {
        clients,
        activeClient,
    } = useSelector(state => state.client);

    const getClients = async () => {
        dispatch(onSetLoadingTrue());
        
        const clients = [];
        const { data: Clients, error } = await supabase.from('clients').select('*').order('name', { ascending: true })
        
        if(error) console.log(error);

        Clients.map(({ id, name, identification, address, phone }) => {
            clients.push({
                id,
                name,
                identification,
                address,
                phone
            });
        });

        dispatch(onGetClients(clients));          
        dispatch(onSetLoadingFalse());
    };

    const setActiveClient = (client = null) => {
        dispatch(onSetActiveClient(client));
    };

    const setNewClient = async (client) => {
        dispatch(onSetLoadingTrue());

        const { data:Client, error } = await supabase.from('clients').insert(client).select();

        if(error) console.log(error);

        dispatch(onAddNewClient({ ...Client[0] }));
        dispatch(onSetLoadingFalse());
    };

    const updateClient = async (client = null) => {
        dispatch(onSetLoadingTrue());
        
        const clientToDB = {...client};
        delete clientToDB.id;

        const { data:Client, error } = await supabase.from('clients').update(client).eq('id', activeClient.id).select();
        
        if(error) console.log(error);

        dispatch(onUpdateClientById({ ...Client[0] }));
        dispatch(onSetLoadingFalse());
    };

    const deleteClient = async (clientId) => {
        dispatch(onSetLoadingTrue());
        
        const { error } = await supabase.from('clients').delete().eq('id', clientId);
        
        if(error) console.log(error);

        dispatch(onDeleteClientById(clientId));
        dispatch(onSetShowDialogFalse());
        dispatch(onSetLoadingFalse());
    };

    return {
        //Properties
        clients,
        activeClient,

        //Methods
        setNewClient,
        getClients,
        setActiveClient,
        updateClient,
        deleteClient,
    };
}