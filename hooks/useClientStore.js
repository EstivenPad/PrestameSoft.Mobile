import { useDispatch, useSelector } from "react-redux"
import { setSavingTrue } from "../store";
import { FirebaseDB } from "../server/firebaseConfig";
import { addDoc, collection, doc, getDocs } from "firebase/firestore/lite";

export const useClientStore = () => {

    const dispatch = useDispatch()

    const { isSaving } = useSelector(state => state.ui);
    const {
        clients,
        activeClient,
        messageSaved,
    } = useSelector(state => state.client);


    const setNewClient = async (client) => {

        dispatch(setSavingTrue());

        try {

            const clientRef = await addDoc(collection(FirebaseDB, 'Clientes'), client);
            
            
            console.log("Cliente guardado => ", clientRef.id);

        } catch (error) {
            throw new Error(error);
        }

    }

    const getClients = async () => {

        try {

            const docs = await getDocs(collection(FirebaseDB, 'Clientes'));
            // docs.forEach((doc) => {
            //     // doc.data() is never undefined for query doc snapshots
            //     console.log(doc.id, " => ", doc.data());
            // });

            if (docs.exists()) {
                console.log("Document data:", docs.data());
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }

        } catch (error) {
            throw new Error(error);
        }

    }

    return {
        //Properties
        clients,
        isSaving,
        activeClient,
        messageSaved,

        //Methods
        setNewClient,
        getClients
    }
}