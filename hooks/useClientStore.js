import { useDispatch, useSelector } from "react-redux"
import { FirebaseDB } from "../server/firebaseConfig";
import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore/lite";
import { 
    onAddNewClient,
    onSetClients,
    onSetActiveClient,
    onSetLoadingFalse,
    onSetLoadingTrue,
    onDeleteClientById,
    onSwitchDialog,
    onUpdateClientById
} from "../store";

export const useClientStore = () => {
    const dispatch = useDispatch();

    const {
        clients,
        activeClient,
    } = useSelector(state => state.client);

    const setNewClient = async (client) => {
        dispatch(onSetLoadingTrue());

        try {
            const clientRef = doc(collection(FirebaseDB, 'Clientes'));
            await setDoc(clientRef, client);
            dispatch(onAddNewClient({ id: clientRef.id, ...client }));
        } catch (error) {
            throw new Error(error);
        } finally {
            dispatch(onSetLoadingFalse());
        }

    };

    const setClients = async () => {
        dispatch(onSetLoadingTrue());
        try {
            const clientsRef = await getDocs(collection(FirebaseDB, 'Clientes'));
            
            const clients = [];
            clientsRef.forEach((doc) => {
                const { nombre, direccion, cedula, telefono } = doc.data();
                clients.push({
                    id: doc.id,
                    nombre,
                    direccion,
                    cedula,
                    telefono
                });
            });

            dispatch(onSetClients(clients));
        } catch (error) {
            throw new Error(error);
        } finally {            
            dispatch(onSetLoadingFalse());
        }

    };

    const setActiveClient = (client = null) => {
        dispatch(onSetActiveClient(client));
    };

    const updateClient = async (client = null) => {
        
    };

    const deleteClient = async (clientId) => {
        dispatch(onSetLoadingTrue());
        try {    
            await deleteDoc(doc(FirebaseDB, `Clientes/${clientId}`));
             
            dispatch(onDeleteClientById(clientId));
        } catch (error) {
            throw new Error(error);
        } finally {
            dispatch(onSetLoadingFalse());
            dispatch(onSwitchDialog());
        }
    };

    return {
        //Properties
        clients,
        activeClient,

        //Methods
        setNewClient,
        setClients,
        setActiveClient,
        updateClient,
        deleteClient
    };
}