import { useDispatch } from "react-redux";
import {
	addToCart,
	removeFromCart,
	deleteFromCart,
} from "../../slices/shopSlice";
import { CartItem, Item } from "../../../interfaces/items";

export const useCartHandlers = () => {
	const dispatch = useDispatch();

	const handleAddToCart = (item: Item | CartItem) => {
		dispatch(addToCart(item));
	};

	const handleRemoveFromCart = (itemId: number) => {
		dispatch(removeFromCart(itemId));
	};

	const handleDeleteFromCart = (itemId: number) => {
		dispatch(deleteFromCart(itemId));
	};

	return {
		handleAddToCart,
		handleRemoveFromCart,
		handleDeleteFromCart,
	};
};