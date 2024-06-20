import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { items } from '../../constants/items';



const uploadItems = async () => {
  try {
    const itemsCollection = collection(db, 'items');
    for (const item of items) {
      await addDoc(itemsCollection, item);
    }
    console.log("Items uploaded successfully");
  } catch (error) {
    console.error("Error uploading items: ", error);
  }
};

export default uploadItems;