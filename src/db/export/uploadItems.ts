import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { items } from "../../constants/items";
import { toast } from "react-toastify";

const uploadItems = async () => {
	try {
		const itemsCollection = collection(db, "items");
		for (const item of items) {
			await addDoc(itemsCollection, item);
		}
	} catch (error: any) {
		toast.error("Error uploading items: ", error.message);
	}
};

export default uploadItems;
