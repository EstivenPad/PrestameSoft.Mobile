import { useDispatch, useSelector } from "react-redux"
import { onGetClients, onSetActiveClient, onSetSavingFalse, onSetSavingTrue } from "../store";
import { FirebaseDB } from "../server/firebaseConfig";
import { addDoc, collection, doc, getDocs } from "firebase/firestore/lite";

export const useClientStore = () => {
    const dispatch = useDispatch();

    const {
        clients,
        activeClient,
        messageSaved,
    } = useSelector(state => state.client);

    const setNewClient = async (client) => {

        dispatch(onSetSavingTrue());

        try {

            const clientRef = await addDoc(collection(FirebaseDB, 'Clientes'), client);
            console.log("Cliente guardado => ", clientRef.id);

        } catch (error) {
            throw new Error(error);
        } finally {
            dispatch(onSetSavingFalse());
        }

    };

    const getClients = async () => {

        const clientsArr = [];

        try {

            const clientsDB = await getDocs(collection(FirebaseDB, 'Clientes'));

            clientsDB.forEach((doc) => {
                clientsArr.push({id: doc.id, ...doc.data()});
            });
            
            dispatch(onGetClients(clientsArr));

        } catch (error) {
            throw new Error(error);
        }

    };

    const setActiveClient = (client = null) => {
        dispatch(onSetActiveClient(client));
    }

    return {
        //Properties
        clients,
        activeClient,
        messageSaved,

        //Methods
        setNewClient,
        getClients,
        setActiveClient
    };
}