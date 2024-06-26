import { useDispatch } from "react-redux";
import {
	addToCart,
	removeFromCart,
	deleteFromCart,
	clearCart,
} from "../../slices/shopSlice";
import { CartItem, Item } from "../../../interfaces/items";

export const useCartHandlers = () => {
	const dispatch = useDispatch();

	const handleAddToCart = (item: Item | CartItem) => {
		dispatch(addToCart(item));
	};

	const handleRemoveFromCart = (itemId: string) => {
		dispatch(removeFromCart(itemId));
	};

	const handleDeleteFromCart = (itemId: string) => {
		dispatch(deleteFromCart(itemId));
	};

	const handleClearCart = () => {
		dispatch(clearCart());
	};

	return {
		handleAddToCart,
		handleRemoveFromCart,
		handleDeleteFromCart,
		handleClearCart,
	};
};
