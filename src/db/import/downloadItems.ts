import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Item } from "../../interfaces/items";

const downloadItems = async () => {
	try {
		const itemsCollection = collection(db, "items");
		const itemsSnapshot = await getDocs(itemsCollection);
		const itemsList = itemsSnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		return itemsList as Item[];
	} catch (error) {
		throw new Error("Error fetching items: ");
	}
};

export default downloadItems;
