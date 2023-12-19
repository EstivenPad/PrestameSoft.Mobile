import { useDispatch, useSelector } from "react-redux"
import { FirebaseDB } from "../server/firebaseConfig";
import { collection, deleteDoc, doc, getDocs, orderBy, query, setDoc, updateDoc } from "firebase/firestore/lite";
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

        try {
            //Sorted clients by name from firebase
            const clientSorted = query(collection(FirebaseDB, 'Clientes'), orderBy("nombre"));
            const clientsRef = await getDocs(clientSorted);
            
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

            dispatch(onGetClients(clients));
        } catch (error) {
            throw new Error(error);
        } finally {            
            dispatch(onSetLoadingFalse());
        }
    };

    const setActiveClient = (client = null) => {
        dispatch(onSetActiveClient(client));
    };

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

    const updateClient = async (client = null) => {
        dispatch(onSetLoadingTrue());
        
        try {
            const clientToFirestore = {...client};
            delete clientToFirestore.id;

            const clientRef = doc(FirebaseDB, 'Clientes', activeClient.id);            
            await updateDoc(clientRef, clientToFirestore);

            dispatch(onUpdateClientById(client));
        } catch (error) {
            throw new Error(error);
        } finally {
            dispatch(onSetLoadingFalse());
        }
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
            dispatch(onSetShowDialogFalse());
        }
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