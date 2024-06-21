import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { OrderData } from "../../interfaces/OrderData";

const uploadOrder = async (order: OrderData) => {
	try {
		const orderCollection = collection(db, "orders");

		await addDoc(orderCollection, order);
	} catch (error) {
		throw error;
	}
};

export default uploadOrder;
